'use server';

import type { StoreOffer } from '@/types/offer';

import { sdk } from '../config';
import { getAuthHeaders } from './cookies';

export const listOffers = async ({
  productIds,
  regionId
}: {
  productIds: string[];
  regionId: string;
}): Promise<StoreOffer[]> => {
  if (!productIds.length) {
    return [];
  }

  const headers = {
    ...(await getAuthHeaders())
  };

  const offers: StoreOffer[] = [];
  const limit = 100;
  let offset = 0;
  let total = 0;

  try {
    do {
      const response = await sdk.client.fetch<{
        offers: StoreOffer[];
        count: number;
      }>(`/store/offers`, {
        method: 'GET',
        query: {
          product_id: productIds.length === 1 ? productIds[0] : productIds,
          region_id: regionId,
          limit,
          offset,
          fields:
            '+calculated_price,+inventory_quantity,+in_stock,*seller,*product_variant'
        },
        headers,
        cache: 'no-cache'
      });

      offers.push(...(response.offers || []));
      total = response.count || 0;
      offset += limit;
    } while (offers.length < total);
  } catch (error) {
    console.error('Failed to retrieve Mercur offers:', error);
    return [];
  }

  return offers;
};
