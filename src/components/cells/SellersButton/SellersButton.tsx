"use client"
import { Button } from "@/components/atoms"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"

export const SellersButton = () => {
  return (
    <LocalizedClientLink href="/sellers">
      <Button className="label-md">Sellers</Button>
    </LocalizedClientLink>
  )
}
