"use client"

import Image from "next/image"
import { Button } from "@/components/atoms"
import { SellerProps } from "@/types/seller"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"

export const SellerCard = ({ seller }: { seller: SellerProps }) => {
  const sellerName = seller.name || "Seller"

  return (
    <div className="relative group border rounded-sm flex flex-col justify-between p-1 w-full">
      <div className="relative w-full h-full bg-primary aspect-square">
        <LocalizedClientLink
          href={`/sellers/${seller.handle}`}
          aria-label={`View ${sellerName}`}
          title={`View ${sellerName}`}
        >
          <div className="overflow-hidden rounded-sm w-full h-full flex justify-center align-center">
            {seller.photo ? (
              <Image
                priority
                fetchPriority="high"
                src={decodeURIComponent(seller.photo)}
                alt={`${sellerName} image`}
                width={100}
                height={100}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover aspect-square w-full object-center h-full lg:group-hover:-mt-14 transition-all duration-300 rounded-xs"
              />
            ) : (
              <Image
                priority
                fetchPriority="high"
                src="/images/placeholder.svg"
                alt={`${sellerName} image placeholder`}
                width={100}
                height={100}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              />
            )}
          </div>
        </LocalizedClientLink>
        <LocalizedClientLink
          href={`/sellers/${seller.handle}`}
          aria-label={`See more about ${sellerName}`}
          title={`See more about ${sellerName}`}
        >
          <Button className="absolute rounded-sm bg-action text-action-on-primary h-auto lg:h-[48px] lg:group-hover:block hidden w-full uppercase bottom-1 z-10">
            See More
          </Button>
        </LocalizedClientLink>
      </div>
      <LocalizedClientLink
        href={`/sellers/${seller.handle}`}
        aria-label={`Go to ${sellerName} page`}
        title={`Go to ${sellerName} page`}
      >
        <div className="flex justify-between p-4">
          <div className="w-full">
            <h3 className="heading-sm truncate">{seller.name}</h3>
          </div>
        </div>
      </LocalizedClientLink>
    </div>
  )
}
