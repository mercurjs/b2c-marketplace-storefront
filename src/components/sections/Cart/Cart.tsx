import { Button } from "@/components/atoms"
import { CartItems, CartSummary } from "@/components/organisms"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { retrieveCart } from "@/lib/data/cart"
import CartPromotionCode from "../CartReview/CartPromotionCode"

export const Cart = async () => {
  const cart = await retrieveCart()

  return (
    <>
      <div className="col-span-12 lg:col-span-6">
        <CartItems cart={cart} />
      </div>
      <div className="lg:col-span-2"></div>
      <div className="col-span-12 lg:col-span-4">
        <div className="w-full mb-6 border rounded-sm p-4">
          <CartPromotionCode cart={cart} />
        </div>
        <div className="border rounded-sm p-4 h-fit">
          <CartSummary
            item_total={cart?.item_total || 0}
            shipping_total={cart?.shipping_total || 0}
            total={cart?.total || 0}
            currency_code={cart?.currency_code || ""}
            tax={cart?.tax_total || 0}
          />
          <LocalizedClientLink href="/checkout?step=address">
            <Button className="w-full py-3 flex justify-center items-center">
              Go to checkout
            </Button>
          </LocalizedClientLink>
        </div>
      </div>
    </>
  )
}
