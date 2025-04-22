import { z } from "zod"

export const reviewSchema = z.object({
  sellerId: z.string(),
  rating: z.number().min(1, "Please rate this product").max(5),
  opinion: z.string().min(10, "Please write your opinion").max(1000),
})

export type ReviewFormData = z.infer<typeof reviewSchema>
