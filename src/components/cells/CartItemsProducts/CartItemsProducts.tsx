import Image from "next/image"
import { Button } from "@/components/atoms"
import { HeartIcon } from "@/icons"
import { HttpTypes } from "@medusajs/types"
import { convertToLocale } from "@/lib/helpers/money"
import { DeleteCartItemButton } from "@/components/molecules"
import { Link } from "@/i18n/routing"

export const CartItemsProducts = ({
  products,
  currency_code,
  delete_item = true,
}: {
  products: HttpTypes.StoreCartLineItem[]
  currency_code: string
  delete_item?: boolean
}) => {
  return (
    <div>
      {products.map((product) => {
        const { options } = product.variant ?? {}
        const original_total = convertToLocale({
          amount: product.original_total,
          currency_code,
        })

        const total = convertToLocale({
          amount: product.total,
          currency_code,
        })
        return (
          <div key={product.id} className="border rounded-sm p-1 flex gap-2">
            <Link href={`/products/${product.product_handle}`}>
              <div className="w-[100px] h-[132px] flex items-center justify-center">
                {product.thumbnail ? (
                  <Image
                    src={decodeURIComponent(product.thumbnail)}
                    alt="Product thumbnail"
                    width={100}
                    height={132}
                    className="rounded-xs w-[100px] h-[132px] object-contain"
                  />
                ) : (
                  <Image
                    src={"/images/placeholder.svg"}
                    alt="Product thumbnail"
                    width={50}
                    height={66}
                    className="rounded-xs w-[50px] h-[66px] object-contain opacity-30"
                  />
                )}
              </div>
            </Link>

            <div className="w-full p-2">
              <div className="flex justify-between lg:mb-4">
                <Link href={`/products/${product.product_handle}`}>
                  <div className="w-[100px] md:w-[200px] lg:w-[280px] mb-4 lg:mb-0">
                    <h3 className="heading-xs uppercase truncate">
                      {product.subtitle} {product.title}
                    </h3>
                  </div>
                </Link>
                {delete_item && (
                  <div className="lg:flex">
                    <DeleteCartItemButton id={product.id} />
                  </div>
                )}
              </div>
              <Link href={`/products/${product.product_handle}`}>
                <div className="lg:flex justify-between -mt-4 lg:mt-0">
                  <div className="label-md text-secondary">
                    {options?.map(({ option, id, value }) => (
                      <p key={id}>
                        {option?.title}:{" "}
                        <span className="text-primary">{value}</span>
                      </p>
                    ))}
                    <p>
                      Quantity:{" "}
                      <span className="text-primary">{product.quantity}</span>
                    </p>
                  </div>
                  <div className="lg:text-right flex lg:block items-center gap-2 mt-4 lg:mt-0">
                    {total !== original_total && (
                      <p className="line-through text-secondary label-md">
                        {original_total}
                      </p>
                    )}
                    <p className="label-lg">{total}</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}
