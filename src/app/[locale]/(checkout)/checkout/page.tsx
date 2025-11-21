import PaymentWrapper from "@/components/organisms/PaymentContainer/PaymentWrapper"
import { CartAddressSection } from "@/components/sections/CartAddressSection/CartAddressSection"
import CartPaymentSection from "@/components/sections/CartPaymentSection/CartPaymentSection"
import CartReview from "@/components/sections/CartReview/CartReview"

import CartShippingMethodsSection from "@/components/sections/CartShippingMethodsSection/CartShippingMethodsSection"
import { retrieveCart } from "@/lib/data/cart"
import { retrieveCustomer } from "@/lib/data/customer"
import { listCartShippingMethods } from "@/lib/data/fulfillment"
import { listCartPaymentMethods } from "@/lib/data/payment"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Checkout",
  description: "My cart page - Checkout",
}

export default async function CheckoutPage({}) {
  return (
    <Suspense
      fallback={
        <div className="container flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <CheckoutPageContent />
    </Suspense>
  )
}

async function CheckoutPageContent({}) {
  const cart = await retrieveCart()

  if (!cart) {
    return notFound()
  }

  const shippingMethods = await listCartShippingMethods(cart.id, false)
  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? "")
  const customer = await retrieveCustomer()

  return (
    <PaymentWrapper cart={cart}>
      <main className="container">
        <div className="grid lg:grid-cols-11 gap-8">
          <div className="flex flex-col gap-4 lg:col-span-6">
            <CartAddressSection cart={cart} customer={customer} />
            <CartShippingMethodsSection
              cart={cart}
              availableShippingMethods={shippingMethods as any}
            />
            <CartPaymentSection
              cart={cart}
              availablePaymentMethods={paymentMethods}
            />
          </div>

          <div className="lg:col-span-5">
            <CartReview cart={cart} />
          </div>
        </div>
      </main>
    </PaymentWrapper>
  )
}
