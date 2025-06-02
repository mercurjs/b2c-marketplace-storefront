import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import Image from "next/image"
import { HttpTypes } from "@medusajs/types"
import { WishlistButton } from "../WishlistButton/WishlistButton"
import { Wishlist } from "@/types/wishlist"
import { convertToLocale } from "@/lib/helpers/money"
import { Button } from "@/components/atoms"
import clsx from "clsx"

export const WishlistItem = ({
  product,
  wishlist,
  user,
}: {
  product: HttpTypes.StoreProduct & {
    calculated_amount: number
    currency_code: string
  }
  wishlist: Wishlist[]
  user?: HttpTypes.StoreCustomer | null
}) => {
  const price = convertToLocale({
    amount: product.calculated_amount,
    currency_code: product.currency_code,
  })

  return (
    <div
      className={clsx(
        "relative group border rounded-sm flex flex-col justify-between p-1 w-[250px] lg:w-[370px]"
      )}
    >
      <div className="relative w-full h-full bg-primary aspect-square">
        <div className="absolute right-3 top-3 z-10 cursor-pointer">
          <WishlistButton
            productId={product.id}
            wishlist={wishlist}
            user={user}
          />
        </div>
        <LocalizedClientLink href={`/products/${product.handle}`}>
          <div className="overflow-hidden rounded-sm w-full h-full flex justify-center align-center ">
            {product.thumbnail ? (
              <Image
                src={decodeURIComponent(product.thumbnail)}
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
                className="flex margin-auto w-[100px] h-auto"
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
            <div className="flex items-center gap-2 mt-2">{price}</div>
          </div>
        </div>
      </LocalizedClientLink>
    </div>
  )
}
