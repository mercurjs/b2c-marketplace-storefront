import { SellerProps } from "@/types/seller"
import { sdk } from "../config"

export const getSellerByHandle = async (handle: string) => {
  return sdk.client
    .fetch<{ seller: SellerProps }>(`/store/seller/${handle}`, {
      query: {
        fields: "+created_at,+rating,+email",
      },
      cache: "no-cache",
    })
    .then(({ seller }) => seller)
}
