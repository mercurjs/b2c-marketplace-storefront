'use client';

import { useEffect, useState, useTransition, type FC } from 'react';

import { CheckCircleSolid, Loader } from '@medusajs/icons';
import type { HttpTypes } from '@medusajs/types';
import { Heading, Text } from '@medusajs/ui';
import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/atoms';
import ErrorMessage from '@/components/molecules/ErrorMessage/ErrorMessage';
import { removeShippingMethod, setShippingMethod } from '@/lib/data/cart';
import { calculatePriceForShippingOption } from '@/lib/data/fulfillment';
import { convertToLocale } from '@/lib/helpers/money';

import { CartShippingMethodRow } from './CartShippingMethodRow';

// Extended cart item product type to include seller
type ExtendedStoreProduct = HttpTypes.StoreProduct & {
  seller?: {
    id: string;
    name: string;
  };
};

// Cart item type definition
type CartItem = {
  product?: ExtendedStoreProduct;
  // Include other cart item properties as needed
};

export type StoreCardShippingMethod = HttpTypes.StoreCartShippingOption & {
  seller_id?: string;
  service_zone?: {
    fulfillment_set: {
      type: string;
    };
  };
};

type ShippingProps = {
  cart: Omit<HttpTypes.StoreCart, 'items'> & {
    items?: CartItem[];
  };
  availableShippingMethods:
    | (StoreCardShippingMethod &
        {
          rules: any;
          seller_id: string;
          price_type: string;
          id: string;
          amount?: number;
        }[])
    | null;
};

type EasyPostRate = {
  id: string;
  service: string;
  rate: string;
  currency: string;
  delivery_days?: number;
  est_delivery_days?: number;
  delivery_date_guaranteed?: boolean;
};

type ShippingOptionWithRates = {
  id: string;
  shipment_id?: string;
  rates?: EasyPostRate[];
};

const CartShippingMethodsSection: FC<ShippingProps> = ({ cart, availableShippingMethods }) => {
  const [isLoadingPrices, setIsLoadingPrices] = useState(false);
  const [calculatedPricesMap, setCalculatedPricesMap] = useState<Record<string, number>>({});
  const [shippingOptionsWithRates, setShippingOptionsWithRates] = useState<
    Record<string, ShippingOptionWithRates>
  >({});
  const [selectedRates, setSelectedRates] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [isPendingDeleteRow, startTransitionDeleteRow] = useTransition();

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isOpen = searchParams.get('step') === 'delivery';

  const _shippingMethods = availableShippingMethods?.filter(
    sm => sm.rules?.find((rule: any) => rule.attribute === 'is_return')?.value !== 'true'
  );

  useEffect(() => {
    const set = new Set<string>();
    cart.items?.forEach(item => {
      if (item?.product?.seller?.id) {
        set.add(item.product.seller.id);
      }
    });
  }, [cart]);

  useEffect(() => {
    if (_shippingMethods?.length) {
      setIsLoadingPrices(true);
      const promises = _shippingMethods
        .filter(sm => sm.price_type === 'calculated')
        .map(sm => calculatePriceForShippingOption(sm.id, cart.id));

      if (promises.length) {
        Promise.allSettled(promises).then(res => {
          const pricesMap: Record<string, number> = {};
          const ratesMap: Record<string, ShippingOptionWithRates> = {};

          res
            .filter((r): r is PromiseFulfilledResult<any> => r.status === 'fulfilled' && !!r.value)
            .forEach(p => {
              const option = p.value;
              if (!option?.id) return;
              
              pricesMap[option.id] = option.amount!;

              // Check if this is an EasyPost option with rates
              if (option.calculated_price?.rates && option.calculated_price.rates.length > 0) {
                ratesMap[option.id] = {
                  id: option.id,
                  shipment_id: option.calculated_price.shipment_id,
                  rates: option.calculated_price.rates as EasyPostRate[]
                };

                // Auto-select the cheapest rate if none selected
                setSelectedRates((prev: Record<string, string>) => {
                  if (prev[option.id]) return prev; // Don't override if already selected
                  
                  const cheapestRate = option.calculated_price.rates.sort(
                    (a: EasyPostRate, b: EasyPostRate) => parseFloat(a.rate) - parseFloat(b.rate)
                  )[0];
                  return {
                    ...prev,
                    [option.id]: cheapestRate.id
                  };
                });
              }
            });

          setCalculatedPricesMap(pricesMap);
          setShippingOptionsWithRates(ratesMap);
          setIsLoadingPrices(false);
        });
      } else {
        setIsLoadingPrices(false);
      }
    }
  }, [availableShippingMethods, _shippingMethods, cart.id]);

  const handleSubmit = () => {
    router.push(pathname + '?step=payment', { scroll: false });
  };

  const handleSetShippingMethod = async (id: string | null, rateId?: string) => {
    if (!id) {
      return;
    }

    try {
      setError(null);
      setIsLoadingPrices(true);

      // Get shipment_id and rate_id if this is an EasyPost option
      const optionWithRates = shippingOptionsWithRates[id];
      const data =
        optionWithRates && optionWithRates.shipment_id
          ? {
              shipment_id: optionWithRates.shipment_id,
              rate_id: rateId || selectedRates[id] || optionWithRates.rates?.[0]?.id
            }
          : undefined;

      const res = await setShippingMethod({
        cartId: cart.id,
        shippingMethodId: id,
        data
      });
      if (!res.ok) {
        return setError(res.error?.message);
      }
    } catch (error: any) {
      setError(
        error?.message?.replace('Error setting up the request: ', '') || 'An error occurred'
      );
    } finally {
      setIsLoadingPrices(false);
      router.refresh();
    }
  };

  const handleRemoveShippingMethod = (methodId: string) => {
    startTransitionDeleteRow(async () => {
      await removeShippingMethod(methodId);
    });
    router.refresh();
  };

  useEffect(() => {
    setError(null);
  }, [isOpen]);

  const groupedBySellerId = _shippingMethods?.reduce((acc: any, method) => {
    const sellerId = method.seller_id!;

    if (!acc[sellerId]) {
      acc[sellerId] = [];
    }

    const amount = Number(
      method.price_type === 'flat' ? method.amount : calculatedPricesMap[method.id]
    );

    if (!isNaN(amount)) {
      acc[sellerId]?.push(method);
    }

    return acc;
  }, {});

  const handleEdit = () => {
    router.replace(pathname + '?step=delivery');
  };
  const isEditEnabled = !isOpen && !!cart?.shipping_methods?.length;

  const filteredGroupedBySellerId = Object.keys(groupedBySellerId || {}).filter(
    key => groupedBySellerId?.[key]?.[0]?.seller_name
  );

  return (
    <div className="bg-ui-bg-interactive rounded-sm border p-4">
      <div className="mb-6 flex flex-row items-center justify-between">
        <Heading
          level="h2"
          className="text-3xl-regular flex flex-row items-baseline gap-x-2"
        >
          {!isOpen && (cart.shipping_methods?.length ?? 0) > 0 && <CheckCircleSolid />}
          Delivery
        </Heading>
        {isEditEnabled && (
          <Text>
            <Button
              onClick={handleEdit}
              variant="tonal"
            >
              Edit
            </Button>
          </Text>
        )}
      </div>
      {isOpen ? (
        <>
          <div className="grid">
            <div data-testid="delivery-options-container">
              <div className="pb-8 pt-2 md:pt-0">
                {filteredGroupedBySellerId.length === 0
                  ? 'No shipping options available'
                  : filteredGroupedBySellerId.map(key => (
                      <div
                        key={key}
                        className="mb-4"
                      >
                        <Heading
                          level="h3"
                          className="mb-2"
                        >
                          {groupedBySellerId[key][0].seller_name}
                        </Heading>
                        <div className="space-y-2">
                          {groupedBySellerId[key].map((option: any) => {
                            const optionWithRates = shippingOptionsWithRates[option.id];
                            const hasRates = optionWithRates?.rates && optionWithRates.rates.length > 0;
                            const isSelected = cart.shipping_methods?.some((sm: any) => sm.shipping_option_id === option.id);
                            return (
                              <div
                                key={option.id}
                                className={clsx(
                                  'rounded-lg border p-4',
                                  isSelected ? 'border-ui-border-interactive bg-ui-bg-interactive' : 'bg-component-secondary'
                                )}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="radio"
                                      name={`shipping-${key}`}
                                      id={`option-${option.id}`}
                                      checked={isSelected}
                                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        e.preventDefault();
                                        void handleSetShippingMethod(option.id);
                                      }}
                                      className="cursor-pointer"
                                    />
                                    <label
                                      htmlFor={`option-${option.id}`}
                                      className="cursor-pointer font-medium"
                                    >
                                      {option.name}
                                    </label>
                                  </div>
                                  <div className="text-right">
                                    {option.price_type === 'flat' ? (
                                      <Text className="txt-medium">
                                        {convertToLocale({
                                          amount: option.amount!,
                                          currency_code: cart?.currency_code
                                        })}
                                      </Text>
                                    ) : calculatedPricesMap[option.id] ? (
                                      <Text className="txt-medium">
                                        {convertToLocale({
                                          amount: calculatedPricesMap[option.id],
                                          currency_code: cart?.currency_code
                                        })}
                                      </Text>
                                    ) : isLoadingPrices ? (
                                      <Loader />
                                    ) : (
                                      <Text className="txt-medium">-</Text>
                                    )}
                                  </div>
                                </div>

                                {hasRates && isSelected && (
                                  <div className="mt-4 pt-4 border-t">
                                    <Text className="txt-small text-ui-fg-subtle mb-3 block">
                                      Select delivery service:
                                    </Text>
                                    <div className="space-y-2">
                                      {optionWithRates.rates!.map((rate: EasyPostRate) => (
                                        <label
                                          key={rate.id}
                                          className={clsx(
                                            'flex items-center justify-between p-3 rounded border cursor-pointer hover:bg-ui-bg-subtle-hover',
                                            selectedRates[option.id] === rate.id
                                              ? 'border-ui-border-interactive bg-ui-bg-interactive'
                                              : 'border-ui-border-base'
                                          )}
                                        >
                                          <div className="flex items-center gap-3">
                                            <input
                                              type="radio"
                                              name={`rate-${option.id}`}
                                              value={rate.id}
                                              checked={selectedRates[option.id] === rate.id}
                                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                setSelectedRates((prev: Record<string, string>) => ({
                                                  ...prev,
                                                  [option.id]: e.target.value
                                                }));
                                                void handleSetShippingMethod(option.id, e.target.value);
                                              }}
                                              className="cursor-pointer"
                                            />
                                            <div>
                                              <Text className="txt-medium font-medium">
                                                {rate.service}
                                              </Text>
                                              {rate.est_delivery_days && (
                                                <Text className="txt-small text-ui-fg-subtle">
                                                  {rate.est_delivery_days} day
                                                  {rate.est_delivery_days !== 1 ? 's' : ''} delivery
                                                  {rate.delivery_date_guaranteed && ' (guaranteed)'}
                                                </Text>
                                              )}
                                            </div>
                                          </div>
                                          <Text className="txt-medium font-medium">
                                            {convertToLocale({
                                              amount: parseFloat(rate.rate),
                                              currency_code: rate.currency || cart?.currency_code
                                            })}
                                          </Text>
                                        </label>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                {!!cart?.shipping_methods?.length && (
                  <div className="flex flex-col">
                    {cart.shipping_methods?.map(method => (
                      <CartShippingMethodRow
                        key={method.id}
                        method={method}
                        currency_code={cart.currency_code}
                        onRemoveShippingMethod={handleRemoveShippingMethod}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <ErrorMessage
              error={error}
              data-testid="delivery-option-error-message"
            />
            <Button
              onClick={handleSubmit}
              variant="tonal"
              disabled={!cart.shipping_methods?.[0] || isPendingDeleteRow}
              loading={isLoadingPrices}
            >
              Continue to payment
            </Button>
          </div>
        </>
      ) : (
        <div>
          <div className="text-small-regular">
            {cart && (cart.shipping_methods?.length ?? 0) > 0 && (
              <div className="flex flex-col">
                {cart.shipping_methods?.map(method => (
                  <div
                    key={method.id}
                    className="mb-4 rounded-md border p-4"
                  >
                    <Text className="txt-medium-plus text-ui-fg-base mb-1">Method</Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {method.name}{' '}
                      {convertToLocale({
                        amount: method.amount!,
                        currency_code: cart?.currency_code
                      })}
                    </Text>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartShippingMethodsSection;
