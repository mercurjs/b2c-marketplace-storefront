export const parseCartCookie = (cookie?: string) => {
  return JSON.parse(cookie || "{}") as Record<string, string>
}

export const getCartIdsFromCookie = (cookie?: string) => {
  return Object.values(parseCartCookie(cookie))
}

export const getSellerCartFromCookie = (
  sellerHandle: string,
  cookie?: string
): string | undefined => {
  const cartIdsMap = parseCartCookie(cookie)
  return cartIdsMap[sellerHandle]
}
