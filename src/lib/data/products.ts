'use server';

import { sdk } from '../config';
import { sortProducts } from '@/lib/helpers/sort-products';
import { HttpTypes } from '@medusajs/types';
import { SortOptions } from '@/types/product';
import { getAuthHeaders, getCacheOptions } from './cookies';
import { getRegion, retrieveRegion } from './regions';
import { getImageUrl } from '../helpers/get-image-url';

export const listProducts = async ({
  pageParam = 1,
  queryParams,
  countryCode,
  regionId,
  category_id,
}: {
  pageParam?: number;
  queryParams?: HttpTypes.FindParams &
    HttpTypes.StoreProductParams & {
      handle?: string;
    };
  category_id?: string;
  countryCode?: string;
  regionId?: string;
}): Promise<{
  response: {
    products: HttpTypes.StoreProduct[];
    count: number;
  };
  nextPage: number | null;
  queryParams?: HttpTypes.FindParams &
    HttpTypes.StoreProductParams;
}> => {
  if (!countryCode && !regionId) {
    throw new Error(
      'Country code or region ID is required'
    );
  }

  const limit = queryParams?.limit || 12;
  const _pageParam = Math.max(pageParam, 1);
  const offset = (_pageParam - 1) * limit;

  let region: HttpTypes.StoreRegion | undefined | null;

  if (countryCode) {
    region = await getRegion(countryCode);
  } else {
    region = await retrieveRegion(regionId!);
  }

  if (!region) {
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    };
  }

  const headers = {
    ...(await getAuthHeaders()),
  };

  const next = {
    ...(await getCacheOptions('products')),
  };

  return sdk.client
    .fetch<{
      products: HttpTypes.StoreProduct[];
      count: number;
    }>(`/store/products`, {
      method: 'GET',
      query: {
        category_id,
        limit,
        offset,
        region_id: region?.id,
        fields:
          '*variants.calculated_price,+variants.inventory_quantity',
        ...queryParams,
      },
      headers,
      next,
      cache: 'force-cache',
    })
    .then(({ products, count }) => {
      const nextPage =
        count > offset + limit ? pageParam + 1 : null;

      const formattedProducts =
        products?.map((product) => ({
          ...product,
          images:
            product.images?.map((image) => ({
              ...image,
              url: getImageUrl(image.url),
            })) || [],
          thumbnail: getImageUrl(product.thumbnail || ''),
        })) || null;

      return {
        response: {
          products: formattedProducts,
          count,
        },
        nextPage: nextPage,
        queryParams,
      };
    });
};

/**
 * This will fetch 100 products to the Next.js cache and sort them based on the sortBy parameter.
 * It will then return the paginated products based on the page and limit parameters.
 */
export const listProductsWithSort = async ({
  page = 1,
  queryParams,
  sortBy = 'created_at',
  countryCode,
  category_id,
}: {
  page?: number;
  queryParams?: HttpTypes.FindParams &
    HttpTypes.StoreProductParams;
  sortBy?: SortOptions;
  countryCode: string;
  category_id?: string;
}): Promise<{
  response: {
    products: HttpTypes.StoreProduct[];
    count: number;
  };
  nextPage: number | null;
  queryParams?: HttpTypes.FindParams &
    HttpTypes.StoreProductParams;
}> => {
  const limit = queryParams?.limit || 12;

  const {
    response: { products, count },
  } = await listProducts({
    pageParam: 0,
    queryParams: {
      ...queryParams,
      limit: 100,
    },
    category_id,
    countryCode,
  });

  const sortedProducts = sortProducts(products, sortBy);

  const pageParam = (page - 1) * limit;

  const nextPage =
    count > pageParam + limit ? pageParam + limit : null;

  const paginatedProducts = sortedProducts.slice(
    pageParam,
    pageParam + limit
  );

  return {
    response: {
      products: paginatedProducts,
      count,
    },
    nextPage,
    queryParams,
  };
};
