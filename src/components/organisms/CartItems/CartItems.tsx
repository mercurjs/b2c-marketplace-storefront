import {
  CartItemsFooter,
  CartItemsHeader,
  CartItemsProducts,
} from "@/components/cells"
import { HttpTypes } from "@medusajs/types"
import { seller } from "@/data/sellerMock"

export const CartItems = ({ cart }: { cart: HttpTypes.StoreCart | null }) => {
  if (!cart) return

  return (
    <div>
      <CartItemsHeader seller={seller} />
      <CartItemsProducts
        products={cart.items || []}
        currency_code={cart.currency_code}
      />
      <CartItemsFooter
        currency_code={cart.currency_code}
        price={cart.shipping_total}
      />
    </div>
  )
}
