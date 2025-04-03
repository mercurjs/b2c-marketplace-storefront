// import { Customer } from "@medusajs/medusa";
// import SignInPrompt from "@modules/cart/components/sign-in-prompt";
import { CartItems, CartSummary } from "@/components/organisms"
import { EmptyCartMessage } from "@/components/molecules"
import { retrieveCarts } from "@/lib/data/cart"
import { Cart } from "../Cart/Cart"

export const Bag = async () => {
  const carts = await retrieveCarts()

  return (
    <div className="py-12">
      {carts.length > 0 ? (
        <div className="flex flex-col gap-y-12">
          {carts.map((cart) => (
            <div key={cart.id} className="grid grid-cols-12 gap-6">
              <Cart cart={cart} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyCartMessage />
      )}
    </div>
  )
}
