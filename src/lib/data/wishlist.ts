import { sdk } from "../config"
import { getAuthHeaders } from "./cookies"

const MEDUSA_BACKEND_URL =
  process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"

export const getUserWishlists = async () => {
  const headers = {
    ...(await getAuthHeaders()),
  }
  return fetch(`${MEDUSA_BACKEND_URL}/store/wishlists`, {
    cache: "no-cache",
    headers,
    method: "GET",
  }).then((res) => {
    console.log(res)
    return []
  })
  //   return sdk.client
  //     .fetch(`/store/wishlists`, {
  //       cache: "no-cache",
  //       headers,
  //       method: "GET",
  //     })
  //     .then((res) => {
  //       console.log(res)
  //       return res
  //     })
}

export const addWishlistItem = async (
  reference_id: string,
  reference: string
) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const response = await fetch(
    `${process.env.MEDUSA_BACKEND_URL}/store/reviews`,
    {
      headers,
      method: "POST",
      body: JSON.stringify({
        reference,
        reference_id,
      }),
    }
  )

  return response.json()
}
