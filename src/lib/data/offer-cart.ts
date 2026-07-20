'use server';

import { revalidateTag } from 'next/cache';

import { sdk } from '../config';
import { getOrSetCart } from './cart';
import { getAuthHeaders, getCacheTag } from './cookies';

export async function addOfferToCart({
  variantId,
  offerId,
  quantity,
  countryCode
}: {
  variantId: string;
  offerId: string;
  quantity: number;
  countryCode: string;
}) {
  if (!variantId) {
    throw new Error('Missing variant ID when adding to cart');
  }

  if (!offerId) {
    throw new Error('Missing offer ID when adding to cart');
  }

  const cart = await getOrSetCart(countryCode);

  if (!cart) {
    throw new Error('Error retrieving or creating cart');
  }

  const headers = {
    ...(await getAuthHeaders())
  };

  const currentItem = cart.items?.find(item => item.variant_id === variantId);

  if (currentItem) {
    await sdk.store.cart.updateLineItem(
      cart.id,
      currentItem.id,
      { quantity: currentItem.quantity + quantity },
      {},
      headers
    );
  } else {
    await sdk.store.cart.createLineItem(
      cart.id,
      {
        offer_id: offerId,
        quantity
      } as any,
      {},
      headers
    );
  }

  const cartCacheTag = await getCacheTag('carts');
  revalidateTag(cartCacheTag);
}
