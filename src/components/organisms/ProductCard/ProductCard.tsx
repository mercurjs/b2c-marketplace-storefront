"use client"
import Image from "next/image"

import { Button } from "@/components/atoms"
import { HttpTypes } from "@medusajs/types"

import { BaseHit, Hit } from "instantsearch.js"
import clsx from "clsx"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { convertToLocale } from "@/lib/helpers/money"
import { getImageUrl } from "@/lib/helpers/get-image-url"

const getRegionPrice = (product: any, currency_code: string) => {
  const variant = product.variants?.find((variant: any) => {
    return variant.prices
      ? variant.prices?.some(
          (price: any) => price.currency_code === currency_code
        )
      : variant.calculated_price
  })

  const price = variant?.calculated_price
    ? {
        calculated_price: convertToLocale({
          amount: variant.calculated_price.calculated_amount,
          currency_code: variant.calculated_price.currency_code,
        }),
        original_price: convertToLocale({
          amount: variant.calculated_price.original_amount,
          currency_code: variant.calculated_price.currency_code,
        }),
      }
    : {
        calculated_price: variant?.prices?.find(
          (price: any) => price.currency_code === currency_code
        ).amount
          ? convertToLocale({
              amount: variant?.prices?.find(
                (price: any) => price.currency_code === currency_code
              ).amount,
              currency_code,
            })
          : null,
        original_price: variant?.prices?.find(
          (price: any) => price.currency_code === currency_code
        ).original_amount
          ? convertToLocale({
              amount: variant.prices.find(
                (price: any) => price.currency_code === currency_code
              ).original_amount,
              currency_code,
            })
          : null,
      }

  return price
}

export const ProductCard = ({
  product,
  currency_code,
}: {
  product: Hit<HttpTypes.StoreProduct> | Partial<Hit<BaseHit>>
  currency_code?: string
}) => {
  const price = getRegionPrice(product, currency_code || "usd")

  if (!price.calculated_price) {
    return null
  }

  return (
    <div
      className={clsx(
        "relative group border rounded-sm flex flex-col justify-between p-1 w-full lg:w-[calc(25%-1rem)] min-w-[250px]"
      )}
    >
      <div className="relative w-full h-full bg-primary aspect-square">
        <LocalizedClientLink href={`/products/${product.handle}`}>
          <div className="overflow-hidden rounded-sm w-full h-full flex justify-center align-center ">
            {product.thumbnail ? (
              <Image
                src={decodeURIComponent(getImageUrl(product.thumbnail))}
                alt={product.title}
                width={360}
                height={360}
                className="object-cover aspect-square w-full object-center h-full lg:group-hover:-mt-14 transition-all duration-300 rounded-xs"
                priority
              />
            ) : (
              <Image
                src="/images/placeholder.svg"
                alt="Product placeholder"
                width={100}
                height={100}
              />
            )}
          </div>
        </LocalizedClientLink>
        <LocalizedClientLink href={`/products/${product.handle}`}>
          <Button className="absolute rounded-sm bg-action text-action-on-primary h-auto lg:h-[48px] lg:group-hover:block hidden w-full uppercase bottom-1 z-10">
            See More
          </Button>
        </LocalizedClientLink>
      </div>
      <LocalizedClientLink href={`/products/${product.handle}`}>
        <div className="flex justify-between p-4">
          <div className="w-full">
            <h3 className="heading-sm truncate">{product.title}</h3>
            <div className="flex items-center gap-2 mt-2">
              <p className="font-medium">{price.calculated_price}</p>
              {price.original_price &&
                price.calculated_price !== price.original_price && (
                  <p className="text-sm text-gray-500 line-through">
                    {price.original_price}
                  </p>
                )}
            </div>
            {/* <div className="flex items-center gap-2 mt-2">
              <p className="font-medium">
                {sellerVariantPrice?.calculated_price ||
                  variantPrice?.calculated_price}
              </p>
              {sellerVariantPrice?.calculated_price
                ? sellerVariantPrice?.calculated_price !==
                    sellerVariantPrice?.original_price && (
                    <p className="text-sm text-gray-500 line-through">
                      {sellerVariantPrice?.original_price}
                    </p>
                  )
                : variantPrice?.calculated_price !==
                    variantPrice?.original_price && (
                    <p className="text-sm text-gray-500 line-through">
                      {variantPrice?.original_price}
                    </p>
                  )}
            </div> */}
          </div>
        </div>
      </LocalizedClientLink>
    </div>
  )
}
