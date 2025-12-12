import { HttpTypes } from '@medusajs/types';
import { Text } from '@medusajs/ui';

import { Button } from '@/components/atoms';
import { BinIcon } from '@/icons';
import { convertToLocale } from '@/lib/helpers/money';

export const CartShippingMethodRow = ({
  method,
  currency_code,
  onRemoveShippingMethod
}: {
  method: HttpTypes.StoreCartShippingMethod;
  currency_code: string;
  onRemoveShippingMethod: (methodId: string) => void;
}) => (
  <div className="mb-4 flex items-center justify-between rounded-md border p-4">
    <div>
      <Text className="txt-medium-plus text-ui-fg-base mb-1">Method</Text>
      <Text className="txt-medium text-ui-fg-subtle">
        {method?.name}
        {convertToLocale({
          amount: method?.amount!,
          currency_code: currency_code
        })}
      </Text>
    </div>

    <Button
      variant="tonal"
      size="small"
      className="p-2"
      onClick={() => onRemoveShippingMethod(method.id)}
    >
      <BinIcon size={16} />
    </Button>
  </div>
);
