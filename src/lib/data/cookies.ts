import 'server-only';
import { cookies as nextCookies } from 'next/headers';
import { parseCartCookie } from '../helpers/cart-cookies';

export const getAuthHeaders = async (): Promise<
  { authorization: string } | {}
> => {
  const cookies = await nextCookies();
  const token = cookies.get('_medusa_jwt')?.value;

  if (!token) {
    return {};
  }

  return { authorization: `Bearer ${token}` };
};

export const getCacheTag = async (
  tag: string
): Promise<string> => {
  try {
    const cookies = await nextCookies();
    const cacheIdCookie = cookies.get('_medusa_cache_id');
    const cacheId = cacheIdCookie?.value || crypto.randomUUID();

    if (!cacheIdCookie) {
      cookies.set("_medusa_cache_id", cacheId, {
        maxAge: 60 * 60 * 24,
      })
    }

    return `${tag}-${cacheId}`;
  } catch (error) {
    return '';
  }
};

export const getCacheOptions = async (
  tag: string
): Promise<{ tags: string[] } | {}> => {
  if (typeof window !== 'undefined') {
    return {};
  }

  const cacheTag = await getCacheTag(tag);

  if (!cacheTag) {
    return {};
  }

  return { tags: [`${cacheTag}`] };
};

export const setAuthToken = async (token: string) => {
  const cookies = await nextCookies();
  cookies.set('_medusa_jwt', token, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
};

export const removeAuthToken = async () => {
  const cookies = await nextCookies();
  cookies.set('_medusa_jwt', '', {
    maxAge: -1,
  });
};

// This cookie should hold the cart id of the current cart in checkout process and be unset when this process
// finishes, be it via abandoning it or completing order
export const getActiveCartId = async () => {
  const cookies = await nextCookies();
  return cookies.get('_medusa_cart_id')?.value;
};

// This cookie will return a map, of sellerHandle: cartId pairs, for all the current incomplete carts in the bag
export const getSellerCartsMap = async () => {
  const cookies = await nextCookies()
  return parseCartCookie(cookies.get('_medusa_cart_ids')?.value)
}

export const getCartIdBySellerHandle = async (sellerHandle: string) => {
  const sellerCartsMap = await getSellerCartsMap()
  return sellerCartsMap[sellerHandle]
}

export const getCartIds = async () => {
  const sellerCartsMap = await getSellerCartsMap()
  return Object.values(sellerCartsMap)
}

export const setCartId = async (cartId: string, sellerHandle: string) => {
  const cookies = await nextCookies();
  const currentSellerCartMap = await getSellerCartsMap()

  const update = JSON.stringify({
    ...currentSellerCartMap,
    [sellerHandle]: cartId
  })

  cookies.set('_medusa_cart_ids', update, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
};

export const removeCartId = async () => {
  const cookies = await nextCookies();
  cookies.set('_medusa_cart_id', '', {
    maxAge: -1,
  });
};

export const removeSellerCartId = async (cartId?: string) => {
  const id = cartId || await getActiveCartId()

  if (!id) {
    return
  }

  const activeCartId = await getActiveCartId()
  if (activeCartId) {
    await removeCartId()
  }

  const sellerCartMap = await getSellerCartsMap()
  const sellerHandle = Object.keys(sellerCartMap).find(sellerHandle => sellerCartMap[sellerHandle] === id)
  delete sellerCartMap[sellerHandle || '']

  const isEmpty = !Object.keys(sellerCartMap).length
  let value = !isEmpty ? JSON.stringify(sellerCartMap) : "";
  let maxAge = !isEmpty ? 60 * 60 * 24 * 7 : -1;

  const cookies = await nextCookies()
  cookies.set("_medusa_cart_ids", value, { maxAge });
}
