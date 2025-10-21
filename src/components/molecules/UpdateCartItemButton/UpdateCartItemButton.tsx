"use client"

import { Button } from "@/components/atoms"
import { updateLineItem } from "@/lib/data/cart"
import { toast } from "@/lib/helpers/toast"
import { useState, useRef, useEffect } from "react"

export const UpdateCartItemButton = ({
  quantity,
  lineItemId,
}: {
  quantity: number
  lineItemId: string
}) => {
  const [pendingQuantity, setPendingQuantity] = useState(quantity)
  const [isUpdating, setIsUpdating] = useState(false)
  const debounceTimerRef = useRef<NodeJS.Timeout>(null)

  useEffect(() => {
    setPendingQuantity(quantity)
    setIsUpdating(false)
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
    setIsUpdating(true)

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    debounceTimerRef.current = setTimeout(async () => {
      try {
        const res = await updateLineItem({ lineId: lineItemId, quantity: newQuantity })
        if (!res.ok) {
          setPendingQuantity(quantity)
          return handleError(res.error?.message)
        }
      } catch (error: any) {
        setPendingQuantity(quantity)
        handleError(error.message.replace("Error setting up the request: ", ""))
      } finally {
        setIsUpdating(false)
      }
    }, 500)
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
        disabled={pendingQuantity === 1}
        onClick={() => handleQuantityChange(pendingQuantity - 1)}
      >
        -
      </Button>
      <span
        className={`font-medium transition-all duration-300 ${
          isUpdating
            ? "text-secondary opacity-70 scale-95"
            : "text-primary opacity-100 scale-100"
        }`}
      >
        {pendingQuantity}
      </span>
      <Button
        variant="tonal"
        className="w-8 h-8 flex items-center justify-center"
        onClick={() => handleQuantityChange(pendingQuantity + 1)}
      >
        +
      </Button>
    </div>
  )
}
