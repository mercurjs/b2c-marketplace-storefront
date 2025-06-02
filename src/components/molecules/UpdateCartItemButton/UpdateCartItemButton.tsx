"use client"

import { Button } from "@/components/atoms"
import { updateLineItem } from "@/lib/data/cart"
import { useState } from "react"

export const UpdateCartItemButton = ({
  quantity,
  lineItemId,
}: {
  quantity: number
  lineItemId: string
}) => {
  const [isChanging, setIsChanging] = useState(false)

  const handleChange = async ({
    lineId,
    quantity,
  }: {
    lineId: string
    quantity: number
  }) => {
    setIsChanging(true)
    await updateLineItem({ lineId, quantity }).finally(() => {
      setIsChanging(false)
    })
  }
  return (
    <div className="flex items-center gap-4 mt-2">
      <Button
        variant="tonal"
        className="w-8 h-8 flex items-center justify-center"
        disabled={quantity === 1}
        onClick={() =>
          !isChanging &&
          handleChange({ lineId: lineItemId, quantity: quantity - 1 })
        }
      >
        -
      </Button>
      <span className="text-primary font-medium">{quantity}</span>
      <Button
        variant="tonal"
        className="w-8 h-8 flex items-center justify-center"
        onClick={() =>
          !isChanging &&
          handleChange({ lineId: lineItemId, quantity: quantity + 1 })
        }
      >
        +
      </Button>
    </div>
  )
}
