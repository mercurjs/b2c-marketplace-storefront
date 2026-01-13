'use server';

import { revalidatePath } from 'next/cache';

import { Wishlist } from '@/types/wishlist';

import { fetchQuery, sdk } from '../config';
import { getAuthHeaders } from './cookies';

export const getUserWishlists = async () => {
  const headers = {
    ...(await getAuthHeaders()),
    'Content-Type': 'application/json',
    'x-publishable-api-key': process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY as string
  };

  return sdk.client
    .fetch<{ wishlists: Wishlist[]; count: number }>(`/store/wishlist`, {
      cache: 'no-cache',
      headers,
      method: 'GET'
    })
    .then(res => {
      return res;
    })
    .catch(() => {
      return { wishlists: [], count: 0 };
    });
};

export const addWishlistItem = async ({
  reference_id,
  reference
}: {
  reference_id: string;
  reference: 'product';
}) => {
  const headers = {
    ...(await getAuthHeaders())
  };

  const response = await fetchQuery('/store/wishlist', {
    headers,
    method: 'POST',
    body: {
      reference,
      reference_id
    }
  })

  revalidatePath('/wishlist');

  if (!response.ok) {
    throw new Error(response.error?.message || 'An error occured');
  }

  return response;
};

export const removeWishlistItem = async ({
  wishlist_id,
  product_id
}: {
  wishlist_id: string;
  product_id: string;
}) => {
  const headers = {
    ...(await getAuthHeaders())
  };

  const response = await fetchQuery(`/store/wishlist/${wishlist_id}/product/${product_id}`, {
    headers,
    method: 'DELETE'
  })

  revalidatePath('/wishlist');

  if (!response.ok) {
    throw new Error(response.error?.message || 'An error occured');
  }

  return response;
};
