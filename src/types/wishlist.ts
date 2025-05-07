import { HttpTypes } from "@medusajs/types"

export type Wishlist = {
  id: string
  products: HttpTypes.StoreProduct[]
}
