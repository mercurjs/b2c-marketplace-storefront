'use server';

import { HttpTypes } from '@medusajs/types';

import { StoreCardShippingMethod } from '@/components/sections/CartShippingMethodsSection/CartShippingMethodsSection';
import { sdk } from '@/lib/config';

import { getAuthHeaders, getCacheOptions } from './cookies';

type GroupedShippingOptions = Record<string, StoreCardShippingMethod[]>;

const normalizeShippingOptions = (
  shippingOptions: StoreCardShippingMethod[] | GroupedShippingOptions | null
): StoreCardShippingMethod[] | null => {
  if (!shippingOptions) {
    return null;
  }

  if (Array.isArray(shippingOptions)) {
    return shippingOptions;
  }

  return Object.entries(shippingOptions).flatMap(([sellerId, options]) =>
    (Array.isArray(options) ? options : []).map(option => ({
      ...option,
      seller_id: option.seller_id || sellerId,
      seller_name:
        (option as any).seller_name ||
        (option as any).seller?.name ||
        sellerId
    }))
  );
};

export const listCartShippingMethods = async (cartId: string, is_return: boolean = false) => {
  const headers = {
    ...(await getAuthHeaders())
  };

  const next = {
    ...(await getCacheOptions('fulfillment'))
  };

  return sdk.client
    .fetch<{
      shipping_options: StoreCardShippingMethod[] | GroupedShippingOptions | null;
    }>(`/store/shipping-options`, {
      method: 'GET',
      query: {
        cart_id: cartId,
        fields:
          '+service_zone.fulfllment_set.type,*service_zone.fulfillment_set.location.address,*seller'
      },
      headers,
      next,
      cache: 'no-cache'
    })
    .then(({ shipping_options }) => normalizeShippingOptions(shipping_options))
    .catch(() => {
      return null;
    });
};

export const calculatePriceForShippingOption = async (
  optionId: string,
  cartId: string,
  data?: Record<string, unknown>
) => {
  const headers = {
    ...(await getAuthHeaders())
  };

  const next = {
    ...(await getCacheOptions('fulfillment'))
  };

  const body = { cart_id: cartId, data };

  if (data) {
    body.data = data;
  }

  return sdk.client
    .fetch<{ shipping_option: HttpTypes.StoreCartShippingOption }>(
      `/store/shipping-options/${optionId}/calculate`,
      {
        method: 'POST',
        body,
        headers,
        next
      }
    )
    .then(({ shipping_option }) => shipping_option)
    .catch(() => {
      return null;
    });
};
