"use server"
import { sdk } from "../config"
import { getAuthHeaders } from "./cookies"

export type Review = {
  id: string
  seller: {
    id: string
    name: string
    photo: string
  }
  customer_note: string
  rating: number
  updated_at: string
}

const getReviews = async () => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const reviews = await sdk.client.fetch("/store/reviews", {
    headers,
    method: "GET",
  })

  return reviews as { reviews: Review[] }
}

const createReview = async (review: any) => {
  const headers = {
    ...(await getAuthHeaders()),
    "Content-Type": "application/json",
    "x-publishable-api-key": process.env
      .NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY as string,
  }

  const response = await fetch(
    `${process.env.MEDUSA_BACKEND_URL}/store/reviews`,
    {
      headers,
      method: "POST",
      body: JSON.stringify(review),
    }
  )

  return response.json()
}

export { getReviews, createReview }
