"use client"

import ErrorMessage from "@/components/molecules/ErrorMessage/ErrorMessage"
import { isManual, isStripe } from "../../../lib/constants"
import { placeOrder } from "@/lib/data/place-order"
import { HttpTypes } from "@medusajs/types"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import { useParams, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { Button } from "@/components/atoms"

type PaymentButtonProps = {
  cart: HttpTypes.StoreCart
  "data-testid": string
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  cart,
  "data-testid": dataTestId,
}) => {
  const notReady =
    !cart ||
    !cart.shipping_address ||
    !cart.billing_address ||
    !cart.email ||
    (cart.shipping_methods?.length ?? 0) < 1

  const paymentSession = cart.payment_collection?.payment_sessions?.[0]

  switch (true) {
    case isStripe(paymentSession?.provider_id):
      return (
        <StripePaymentButton
          notReady={notReady}
          cart={cart}
          data-testid={dataTestId}
        />
      )
    case isManual(paymentSession?.provider_id):
      return (
        <ManualTestPaymentButton notReady={notReady} data-testid={dataTestId} />
      )
    default:
      return (
        <Button disabled className="w-full">
          Select a payment method
        </Button>
      )
  }
}

const useOrderNavigation = () => {
  const router = useRouter()
  const params = useParams<{ locale?: string }>()

  return (orderId: string) => {
    const locale = params?.locale ? `/${params.locale}` : ""
    router.replace(`${locale}/order/${orderId}/confirmed`)
  }
}

const StripePaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
  "data-testid"?: string
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [disabled, setDisabled] = useState(true)
  const navigateToOrder = useOrderNavigation()

  const onPaymentCompleted = async () => {
    try {
      const res = await placeOrder()
      if (!res.ok) {
        setErrorMessage(res.error.message)
        return
      }

      navigateToOrder(res.orderId)
    } catch (error: any) {
      setErrorMessage(
        error?.message?.replace("Error setting up the request: ", "") ||
          "Unable to complete the order"
      )
    } finally {
      setSubmitting(false)
    }
  }

  const stripe = useStripe()
  const elements = useElements()
  const card = elements?.getElement("card")

  const session = cart.payment_collection?.payment_sessions?.find(
    (s) => s.status === "pending"
  )

  useEffect(() => {
    // @ts-ignore
    setDisabled(!card?._complete)
  }, [card, stripe, elements, cart])

  const handlePayment = async () => {
    if (submitting) {
      return
    }

    setSubmitting(true)
    setErrorMessage(null)

    if (!stripe || !elements || !card || !cart) {
      setSubmitting(false)
      return
    }

    await stripe
      .confirmCardPayment(session?.data.client_secret as string, {
        payment_method: {
          card,
          billing_details: {
            name:
              cart.billing_address?.first_name +
              " " +
              cart.billing_address?.last_name,
            address: {
              city: cart.billing_address?.city ?? undefined,
              country: cart.billing_address?.country_code ?? undefined,
              line1: cart.billing_address?.address_1 ?? undefined,
              line2: cart.billing_address?.address_2 ?? undefined,
              postal_code: cart.billing_address?.postal_code ?? undefined,
              state: cart.billing_address?.province ?? undefined,
            },
            email: cart.email,
            phone: cart.billing_address?.phone ?? undefined,
          },
        },
      })
      .then(({ error, paymentIntent }) => {
        if (error) {
          const pi = error.payment_intent

          if (
            (pi && pi.status === "requires_capture") ||
            (pi && pi.status === "succeeded")
          ) {
            void onPaymentCompleted()
          }

          setErrorMessage(error.message || null)
          return
        }

        if (
          (paymentIntent && paymentIntent.status === "requires_capture") ||
          paymentIntent?.status === "succeeded"
        ) {
          return onPaymentCompleted()
        }
      })
  }

  return (
    <>
      <Button
        disabled={disabled || notReady || submitting}
        onClick={handlePayment}
        loading={submitting}
        className="w-full"
      >
        Place order
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="stripe-payment-error-message"
      />
    </>
  )
}

const ManualTestPaymentButton = ({ notReady }: { notReady: boolean }) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const navigateToOrder = useOrderNavigation()

  const handlePayment = async () => {
    if (submitting) {
      return
    }

    setSubmitting(true)
    setErrorMessage(null)

    try {
      const res = await placeOrder()
      if (!res.ok) {
        setErrorMessage(res.error.message)
        return
      }

      navigateToOrder(res.orderId)
    } catch (error: any) {
      setErrorMessage(
        error?.message?.replace("Error setting up the request: ", "") ||
          "Unable to complete the order"
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Button
        disabled={notReady || submitting}
        onClick={handlePayment}
        className="w-full"
        loading={submitting}
      >
        Place order
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="manual-payment-error-message"
      />
    </>
  )
}

export default PaymentButton
