"use client"

import { Button } from "@/components/atoms"
import { updateLineItem } from "@/lib/data/cart"
import { toast } from "@/lib/helpers/toast"
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

    try {
      const res = await updateLineItem({ lineId, quantity })
      if (!res.ok) {
        return handleError(res.error?.message)
      }
    } catch (error: any) {
      handleError(error.message.replace("Error setting up the request: ", ""))
    } finally {
      setIsChanging(false)
    }
  }

  function handleError(message: string) {
    toast.error({
      title: "Error updating cart",
      description: message,
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
