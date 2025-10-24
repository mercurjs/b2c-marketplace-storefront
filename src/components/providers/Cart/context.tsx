import { createContext, useContext } from "react"

import { Cart, StoreCartLineItemOptimisticUpdate } from "@/types/cart"

interface CartContextInterface {
  cart: Cart | null
  onAddToCart: (
    item: StoreCartLineItemOptimisticUpdate,
    currency_code: string
  ) => void
}

export const CartContext = createContext<CartContextInterface | null>(null)

export function useCartContext() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider")
  }
  return context
}
