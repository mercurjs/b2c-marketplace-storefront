"use client"

import { Button } from "@/components/atoms"
import { useCartContext } from "@/components/providers"
import { toast } from "@/lib/helpers/toast"
import { useState, useRef, useEffect } from "react"

export const UpdateCartItemButton = ({
  quantity,
  lineItemId,
}: {
  quantity: number
  lineItemId: string
}) => {
  const { updateCartItem, isUpdatingItem } = useCartContext()
  const [pendingQuantity, setPendingQuantity] = useState(quantity)
  const debounceTimerRef = useRef<NodeJS.Timeout>(null)

  useEffect(() => {
    setPendingQuantity(quantity)
  }, [quantity])

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return

    // Update UI immediately (optimistic update)
    setPendingQuantity(newQuantity)

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    debounceTimerRef.current = setTimeout(async () => {
      try {
        await updateCartItem(lineItemId, newQuantity)
      } catch (error: unknown) {
        setPendingQuantity(quantity)
        const errorMessage = error instanceof Error 
          ? error.message.replace("Error setting up the request: ", "")
          : "Failed to update quantity"
        toast.error({
          title: "Error updating cart",
          description: errorMessage,
        })
      }
    }, 500)
  }

  const isDecreaseDisabled = pendingQuantity === 1 || isUpdatingItem || !lineItemId
  const isIncreaseDisabled = isUpdatingItem || !lineItemId

  return (
    <div className="flex items-center gap-4 mt-2">
      <Button
        variant="tonal"
        className="w-8 h-8 flex items-center justify-center"
        disabled={isDecreaseDisabled}
        onClick={() => handleQuantityChange(pendingQuantity - 1)}
      >
        -
      </Button>
      <span
        className={`font-medium transition-all duration-300 ${
           isDecreaseDisabled || isIncreaseDisabled
            ? "text-secondary opacity-70 scale-95"
            : "text-primary opacity-100 scale-100"
        }`}
      >
        {pendingQuantity}
      </span>
      <Button
        variant="tonal"
        className="w-8 h-8 flex items-center justify-center"
        disabled={isIncreaseDisabled}
        onClick={() => handleQuantityChange(pendingQuantity + 1)}
      >
        +
      </Button>
    </div>
  )
}
