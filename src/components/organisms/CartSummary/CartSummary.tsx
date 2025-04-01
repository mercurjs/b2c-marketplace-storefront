"use client"

import { Button } from "@/components/atoms"
import { quickOrder } from "@/lib/data/cart"
import { convertToLocale } from "@/lib/helpers/money"
import { useRouter } from "next/navigation"
import { useState } from "react"

export const CartSummary = ({
  item_total,
  shipping_total,
  total,
  currency_code,
  cart_items,
  region_id,
}: {
  item_total: number
  shipping_total: number
  total: number
  currency_code: string
  cart_items: any
  region_id?: string
}) => {
  const router = useRouter()

  const [pending, setPending] = useState(false)
  const handleProceed = async () => {
    setPending(true)

    try {
      const items = cart_items.map((item: any) => ({
        variant_id: item.variant_id,
        quantity: item.quantity,
      }))

      await quickOrder({ region_id, items })

      router.push("/order-success")
    } catch (error: any) {
      console.log({ error })
    }

    setPending(false)
  }

  return (
    <div>
      <div className="space-y-4 label-md text-secondary mb-4">
        <div className="flex justify-between">
          <span>Items:</span>
          <span className="text-primary">
            {convertToLocale({
              amount: item_total,
              currency_code,
            })}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Delivery:</span>
          <span className="text-primary">
            {convertToLocale({
              amount: shipping_total,
              currency_code,
            })}
          </span>
        </div>
        <div className="flex justify-between border-t pt-4 items-center">
          <span>Total:</span>
          <span className="label-xl text-primary">
            {convertToLocale({
              amount: total,
              currency_code,
            })}
          </span>
        </div>
      </div>
      <Button
        className="w-full py-3 flex justify-center items-center"
        onClick={() => handleProceed()}
        loading={pending}
      >
        Proceed to checkout
      </Button>
    </div>
  )
}
