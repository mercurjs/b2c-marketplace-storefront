import { CartAddressSection } from "@/components/sections/CartAddressSection/CartAddressSection"
import { CartPaymentSection } from "@/components/sections/CartPaymentSection/CartPaymentSection"
import { CartShippingMethodsSection } from "@/components/sections/CartShippingMethodsSection/CartShippingMethodsSection"
import { retrieveCart } from "@/lib/data/cart"
import { retrieveCustomer } from "@/lib/data/customer"
import { listCartShippingMethods } from "@/lib/data/fulfillment"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Checkout",
  description: "My cart page - Checkout",
}

export default async function ShippingPage({}) {
  const cart = await retrieveCart()

  if (!cart) {
    return notFound()
  }

  const shippingMethods = await listCartShippingMethods(cart.id)
  const customer = await retrieveCustomer()

  return (
    <main className="container">
      <Suspense fallback={<>Loading...</>}>
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <CartAddressSection cart={cart} customer={customer} />
            {/* <CartShippingMethodsSection
              cart={cart}
              availableShippingMethods={shippingMethods}
            /> */}
          </div>
          <CartPaymentSection />
        </div>
      </Suspense>
    </main>
  )
}
