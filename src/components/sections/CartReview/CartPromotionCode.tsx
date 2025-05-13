"use client"
import { HttpTypes } from "@medusajs/types"
import { Button, Input } from "@/components/atoms"
import { Heading, Label } from "@medusajs/ui"
import { useState } from "react"
import { applyPromotions } from "@/lib/data/cart"

export default function CartPromotionCode({
  cart,
}: {
  cart:
    | (HttpTypes.StoreCart & { promotions?: HttpTypes.StorePromotion[] })
    | null
}) {
  const [promotionCode, setPromotionCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleApplyPromotionCode = async () => {
    setIsLoading(true)
    try {
      await applyPromotions([promotionCode])
      setPromotionCode("")
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Heading
        level="h2"
        className="flex flex-row text-3xl-regular gap-x-2 items-baseline items-center"
      >
        Promotion codes
      </Heading>
      <div>
        {cart?.promotions?.map((promo) => (
          <div
            key={promo.id}
            className="mb-4 flex flex-row gap-x-2 items-center"
          >
            <Label className="text-md">{promo.code}</Label>
          </div>
        ))}
      </div>
      <Input
        placeholder="Enter your promotion code"
        value={promotionCode}
        onChange={(e) => setPromotionCode(e.target.value)}
      />
      <div className="flex justify-end">
        <Button
          className="mt-4 px-6"
          onClick={handleApplyPromotionCode}
          disabled={isLoading || !promotionCode}
          loading={isLoading}
          variant="tonal"
        >
          Use promotion code
        </Button>
      </div>
    </div>
  )
}
