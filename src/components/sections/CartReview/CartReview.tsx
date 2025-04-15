"use client"

import { Heading, Text } from "@medusajs/ui"

import PaymentButton from "./PaymentButton"

const Review = ({ cart }: { cart: any }) => {
  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const previousStepsCompleted =
    cart.shipping_address &&
    cart.shipping_methods.length > 0 &&
    (cart.payment_collection || paidByGiftcard)

  return (
    <div className="border p-4 rounded-sm bg-ui-bg-interactive">
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className="flex flex-row text-3xl-regular gap-x-2 items-baseline items-center"
        >
          Review
        </Heading>
      </div>
      <div className="flex items-start gap-x-1 w-full mb-6">
        <div className="w-full">
          <Text className="txt-medium-plus text-ui-fg-base mb-1">
            By clicking the Place Order button, you confirm that you have read,
            understand and accept our Terms of Use, Terms of Sale and Returns
            Policy and acknowledge that you have read Medusa Store&apos;s
            Privacy Policy.
          </Text>
        </div>
      </div>

      {previousStepsCompleted && (
        <PaymentButton cart={cart} data-testid="submit-order-button" />
      )}
    </div>
  )
}

export default Review
