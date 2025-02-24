"use client"

import { Button } from "@/components/atoms"
import { HeartIcon } from "@/icons"
import { HttpTypes } from "@medusajs/types"
import { ProductVariants } from "@/components/molecules"
import useGetAllSearchParams from "@/hooks/useGetAllSearchParams"
import { getProductPrice } from "@/lib/helpers/get-product-price"
import { useState } from "react"
import { addToCart } from "@/lib/data/cart"
import { BaseHit, Hit } from "instantsearch.js"

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce(
    (
      acc: Record<string, string>,
      varopt: HttpTypes.StoreProductOptionValue
    ) => {
      acc[varopt.option?.title.toLowerCase() || ""] = varopt.value

      return acc
    },
    {}
  )
}

export const ProductDetailsHeader = ({
  product,
  locale,
}: {
  product: Hit<HttpTypes.StoreProduct> | Hit<BaseHit>
  locale: string
}) => {
  const [isAdding, setIsAdding] = useState(false)
  const { allSearchParams } = useGetAllSearchParams()

  // set default variant
  const selectedVariant = {
    ...optionsAsKeymap(product?.variants?.[0].options ?? null),
    ...allSearchParams,
  }

  // get selected variant id
  const variantId =
    product.variants?.find(({ options }: { options: any }) =>
      options?.every((option: any) =>
        selectedVariant[option.option?.title.toLowerCase() || ""]?.includes(
          option.value
        )
      )
    )?.id || ""

  // get variant price
  const { variantPrice } = getProductPrice({
    product,
    variantId,
  })

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!variantId) return null

    setIsAdding(true)

    await addToCart({
      variantId: variantId,
      quantity: 1,
      countryCode: locale,
    })

    setIsAdding(false)
  }

  return (
    <div className="border rounded-sm p-5">
      <div className="flex justify-between">
        <div>
          <h2 className="label-md text-secondary">
            {/* {product?.brand || "No brand"} */}
          </h2>
          <h1 className="heading-lg text-primary">{product.title}</h1>
          <div className="mt-2 flex gap-2 items-center">
            <span className="heading-md text-primary">
              {variantPrice?.calculated_price}
            </span>
            {variantPrice?.calculated_price_number !==
              variantPrice?.original_price_number && (
              <span className="label-md text-secondary line-through">
                {variantPrice?.original_price}
              </span>
            )}
          </div>
        </div>
        <div>
          {/* Add to Wishlist */}
          <Button
            variant="tonal"
            className="w-10 h-10 p-0 flex items-center justify-center"
          >
            <HeartIcon size={20} />
          </Button>
        </div>
      </div>
      {/* Product Variants */}
      <ProductVariants product={product} selectedVariant={selectedVariant} />
      {/* Add to Cart */}
      <Button
        onClick={handleAddToCart}
        disabled={isAdding}
        loading={isAdding}
        className="w-full uppercase mb-4 py-3 flex justify-center"
        size="large"
      >
        ADD TO CART
      </Button>
      {/* Seller message */}
      <Button className="w-full uppercase py-3 " size="large" variant="tonal">
        Write to seller
      </Button>
    </div>
  )
}
