import { z } from "zod"

export const reviewSchema = z.object({
  sellerId: z.string(),
  rating: z.number().min(1, "Please rate this product").max(5),
  opinion: z
    .string()
    .max(1000, "Opinion must be less than 1000 characters")
    .optional(),
})

export type ReviewFormData = z.infer<typeof reviewSchema>
