"use client"

import { convertToLocale } from "@/lib/helpers/money"

export const CartSummary = ({
  item_total,
  shipping_total,
  total,
  currency_code,
  tax,
}: {
  item_total: number
  shipping_total: number
  total: number
  currency_code: string
  tax: number
}) => {
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
          <span>Tax:</span>
          <span className="text-primary">
            {convertToLocale({
              amount: tax,
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
    </div>
  )
}
