import { SellerProps } from "@/types/seller"
import { sdk } from "../config"

export const getSellerByHandle = async (handle: string) => {
  return sdk.client
    .fetch<{ seller: SellerProps }>(`/store/seller/${handle}`, {
      query: {
        fields: "+created_at,+rating,+email,*reviews,*reviews.customer",
      },
      cache: "force-cache",
    })
    .then(({ seller }) => {
      const response = {
        ...seller,
        reviews: seller.reviews?.filter((item) => item !== null) ?? [],
      }

      return response as SellerProps
    })
    .catch(() => [])
}
