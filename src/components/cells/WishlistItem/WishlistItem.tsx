import Link from "next/link"
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
        "relative group border rounded-sm flex flex-col justify-between p-1 ",
        {
          "w-[250px] lg:w-[370px]": true,
          "w-full h-full": false,
        }
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
        <Link href={`/products/${product.handle}`}>
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
        </Link>
        <Link href={`/products/${product.handle}`}>
          <Button className="absolute rounded-sm bg-action text-action-on-primary h-auto lg:h-[48px] lg:group-hover:block hidden w-full uppercase bottom-1 z-10">
            See More
          </Button>
        </Link>
      </div>
      <Link href={`/products/${product.handle}`}>
        <div className="flex justify-between p-4">
          <div className="w-full">
            <h3 className="heading-sm truncate">{product.title}</h3>
            <div className="flex items-center gap-2 mt-2">{price}</div>
          </div>
        </div>
      </Link>
    </div>
  )
  // return (
  //   <div className="relative">
  //     <div className="absolute right-3 top-3 z-10 cursor-pointer">
  //       <WishlistButton
  //         productId={product.id}
  //         wishlist={wishlist}
  //         user={user}
  //       />
  //     </div>
  //     <Link
  //       href={`/products/${product.handle}`}
  //       className="p-1 rounded-sm overflow-hidden max-w-[350px] flex flex-col items-center justify-between h-auto border border-action-primary max-md:w-1/2"
  //     >
  //       <div>
  //         <Image
  //           src={product.thumbnail || ""}
  //           alt={product.title}
  //           width={342}
  //           height={424}
  //         />
  //       </div>
  //       <div className="flex flex-col gap-1 md:gap-2 p-4 w-full max-w-full h-full justify-between">
  //         <div className="flex justify-between w-full items-center">
  //           <div className="flex flex-col w-full">
  //             <h3 className="heading-sm text-primary">{product.title}</h3>
  //           </div>
  //           <p className="px-4 py-2.5 label-sm text-secondary border border-action-primary flex items-center rounded-sm h-fit max-md:hidden">
  //             3.5
  //           </p>
  //         </div>
  //         <p className="label-lg text-primary">{price}</p>
  //       </div>
  //     </Link>
  //   </div>
  // )
}
