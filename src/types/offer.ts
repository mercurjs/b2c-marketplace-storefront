import type { HttpTypes } from '@medusajs/types';

import type { SellerProps } from './seller';

export type StoreOffer = {
  id: string;
  seller_id: string;
  variant_id: string;
  product_id: string;
  sku?: string | null;
  inventory_quantity?: number;
  in_stock?: boolean;
  calculated_price?: any;
  seller?: SellerProps;
  product_variant?: {
    id: string;
    title?: string;
    sku?: string | null;
  };
};

export type StorefrontProductVariant = HttpTypes.StoreProductVariant & {
  offer_id?: string;
  inventory_quantity?: number;
  in_stock?: boolean;
  seller?: SellerProps;
};

export type StorefrontProduct = HttpTypes.StoreProduct & {
  variants?: StorefrontProductVariant[];
  seller?: SellerProps;
  offers?: StoreOffer[];
};
