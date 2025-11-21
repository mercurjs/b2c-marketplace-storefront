import { HttpTypes } from "@medusajs/types"

export interface Cart extends HttpTypes.StoreCart {
  promotions?: HttpTypes.StorePromotion[]
}

export interface StoreCartLineItemOptimisticUpdate
  extends Partial<HttpTypes.StoreCartLineItem> {
  tax_total: number
}
