// import { Customer } from "@medusajs/medusa";
// import SignInPrompt from "@modules/cart/components/sign-in-prompt";
import { CartItems, CartSummary } from "@/components/organisms"
import { EmptyCartMessage } from "@/components/molecules"
import { retrieveCarts } from "@/lib/data/cart"

export const Bag = async () => {
  const carts = await retrieveCarts()

  return (
    <div className="py-12">
      {carts.length > 0 ? (
        <div className="flex flex-col gap-y-12">
          {carts.map((cart) => (
            <div key={cart.id} className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-6">
                <CartItems cart={cart} />
              </div>
              <div className="lg:col-span-2"></div>
              <div className="col-span-12 lg:col-span-4 border rounded-sm p-4 h-fit">
                <CartSummary
                  region_id={cart?.region?.id}
                  cart_items={cart?.items}
                  item_total={cart?.item_total || 0}
                  shipping_total={cart?.shipping_total || 0}
                  total={cart?.total || 0}
                  currency_code={cart?.currency_code || ""}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyCartMessage />
      )}
    </div>
  )
}
