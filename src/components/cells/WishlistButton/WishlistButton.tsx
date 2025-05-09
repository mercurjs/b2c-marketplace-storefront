"use client"

import { Button } from "@/components/atoms"
import { HeartFilledIcon, HeartIcon } from "@/icons"
import { addWishlistItem, removeWishlistItem } from "@/lib/data/wishlist"
import { Wishlist } from "@/types/wishlist"
import { useEffect, useState } from "react"
import { HttpTypes } from "@medusajs/types"

export const WishlistButton = ({
  productId,
  wishlist,
  user,
}: {
  productId: string
  wishlist?: Wishlist[]
  user?: HttpTypes.StoreCustomer | null
}) => {
  const [isWishlistAdding, setIsWishlistAdding] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(
    wishlist?.[0]?.products?.some((item) => item.id === productId)
  )

  useEffect(() => {
    setIsWishlisted(
      wishlist?.[0]?.products?.some((item) => item.id === productId)
    )
  }, [wishlist, productId])

  if (!user) {
    return null
  }

  const handleAddToWishlist = async () => {
    try {
      setIsWishlistAdding(true)
      await addWishlistItem({
        reference_id: productId,
        reference: "product",
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsWishlistAdding(false)
    }
  }

  const handleRemoveFromWishlist = async () => {
    try {
      setIsWishlistAdding(true)

      await removeWishlistItem({
        wishlist_id: wishlist?.[0].id!,
        product_id: productId,
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsWishlistAdding(false)
    }
  }
  return (
    <Button
      onClick={
        isWishlisted
          ? () => handleRemoveFromWishlist()
          : () => handleAddToWishlist()
      }
      variant="tonal"
      className="w-10 h-10 p-0 flex items-center justify-center"
      loading={isWishlistAdding}
      disabled={isWishlistAdding}
    >
      {isWishlisted ? <HeartFilledIcon size={20} /> : <HeartIcon size={20} />}
    </Button>
  )
}
