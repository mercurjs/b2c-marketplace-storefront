'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

import { fetchQuery } from '../config';
import {
  getAuthHeaders,
  getCacheTag,
  getCartId,
  removeCartId
} from './cookies';

type CompletedOrderGroup = {
  id: string;
  orders?: Array<{ id: string }>;
};

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error && error.message) {
    return error.message.replace('Error setting up the request: ', '');
  }

  return 'Unable to complete the order';
};

export async function placeOrder(cartId?: string) {
  try {
    const id = cartId || (await getCartId());

    if (!id) {
      return {
        ok: false as const,
        error: { message: 'No existing cart found when placing an order' }
      };
    }

    const headers = {
      ...(await getAuthHeaders())
    };

    const res = await fetchQuery(`/store/carts/${id}/complete`, {
      method: 'POST',
      query: {
        fields: 'id,*orders'
      },
      headers
    });

    const cartCacheTag = await getCacheTag('carts');
    revalidateTag(cartCacheTag);

    if (!res.ok) {
      return {
        ok: false as const,
        error: {
          message:
            res.error?.message ||
            `Mercur failed to complete the cart with HTTP ${res.status}`
        }
      };
    }

    if (res.data?.error?.message) {
      return {
        ok: false as const,
        error: { message: res.data.error.message as string }
      };
    }

    const completedGroup = (res.data?.order_group ||
      res.data?.order_set) as CompletedOrderGroup | undefined;

    const orderId = completedGroup?.orders?.[0]?.id;

    if (!completedGroup?.id || !orderId) {
      return {
        ok: false as const,
        error: {
          message: `Mercur returned an unexpected completion response: ${JSON.stringify(
            res.data
          )}`
        }
      };
    }

    revalidatePath('/user/reviews');
    revalidatePath('/user/orders');
    await removeCartId();

    return {
      ok: true as const,
      orderId
    };
  } catch (error) {
    return {
      ok: false as const,
      error: { message: getErrorMessage(error) }
    };
  }
}
