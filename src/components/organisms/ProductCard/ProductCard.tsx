"use client"
import Image from "next/image"

import { Button } from "@/components/atoms"
import { HeartIcon } from "@/icons"
import tailwindConfig from "../../../../tailwind.config"
import { HttpTypes } from "@medusajs/types"
import { Link } from "@/i18n/routing"
import { getSellerProductPrice } from "@/lib/helpers/get-seller-product-price"
import { getProductPrice } from "@/lib/helpers/get-product-price"
import { BaseHit, Hit } from "instantsearch.js"

export const ProductCard = ({
  product,
}: {
  product: Hit<HttpTypes.StoreProduct> | Partial<Hit<BaseHit>>
}) => {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  const { cheapestPrice: sellerCheapestPrice } = getSellerProductPrice({
    product,
  })

  return (
    <div className="relative group border rounded-sm flex flex-col justify-between w-[360px]">
      <div className="relative p-1 w-full bg-primary aspect-square">
        <div className="absolute right-3 top-3 lg:hidden z-10 cursor-pointer">
          <HeartIcon color={tailwindConfig.theme.extend.colors.tertiary} />
        </div>
        <Link href={`/products/${product.handle}`}>
          <div className="overflow-hidden rounded-sm w-full h-full flex justify-center align-center ">
            {product.thumbnail ? (
              <Image
                src={decodeURIComponent(product.thumbnail)}
                alt={product.title}
                width={512}
                height={512}
                className="object-cover aspect-square w-full object-center h-full lg:group-hover:-mt-14 transition-all duration-300 rounded-xs"
                priority
              />
            ) : (
              <Image
                src="/images/placeholder.svg"
                alt="Product placeholder"
                width={100}
                height={100}
                className="flex margin-auto w-[100px] h-auto"
              />
            )}
          </div>
        </Link>
        <Link href={`/products/${product.handle}`}>
          <Button className="absolute rounded-sm bg-action text-action-on-primary h-auto lg:h-[48px] lg:group-hover:block hidden w-[calc(100%-8px)] uppercase bottom-1 z-10">
            See More
          </Button>
        </Link>
      </div>
      <Link href={`/products/${product.handle}`}>
        <div className="flex justify-between p-4">
          <div className="w-full">
            <h3 className="heading-sm truncate">{product.title}</h3>
            <div className="flex items-center gap-2 mt-2">
              <p className="font-medium">
                {sellerCheapestPrice?.calculated_price ||
                  cheapestPrice?.calculated_price}
              </p>
              {sellerCheapestPrice?.calculated_price
                ? sellerCheapestPrice?.calculated_price !==
                    sellerCheapestPrice?.original_price && (
                    <p className="text-sm text-gray-500 line-through">
                      {sellerCheapestPrice?.original_price}
                    </p>
                  )
                : cheapestPrice?.calculated_price !==
                    cheapestPrice?.original_price && (
                    <p className="text-sm text-gray-500 line-through">
                      {cheapestPrice?.original_price}
                    </p>
                  )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
