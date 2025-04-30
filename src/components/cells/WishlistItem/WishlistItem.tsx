import Link from "next/link"
import Image from "next/image"
import { HttpTypes } from "@medusajs/types"

export const WishlistItem = ({
  product,
}: {
  product: HttpTypes.StoreProduct
}) => (
  <Link
    href={`/products/${product.handle}`}
    key={product.id}
    className="p-1 rounded-sm overflow-hidden max-w-[350px] flex flex-col items-center justify-between h-auto border border-action-primary max-md:w-1/2"
  >
    <div className="relative">
      <Image
        src={product.thumbnail || ""}
        alt={product.title}
        width={342}
        height={424}
      />
      <p className="px-4 py-2.5 label-sm text-secondary border border-action-primary flex items-center rounded-sm h-fit absolute bottom-2 right-2 md:hidden bg-primary">
        3.5
      </p>
    </div>
    <div className="flex flex-col gap-1 md:gap-2 p-4 w-full max-w-full h-full justify-between">
      <div className="flex justify-between w-full items-center">
        <div className="flex flex-col w-full">
          <p className="label-md text-secondary">Nike</p>
          <h3 className="heading-sm text-primary">{product.title}</h3>
        </div>
        <p className="px-4 py-2.5 label-sm text-secondary border border-action-primary flex items-center rounded-sm h-fit max-md:hidden">
          3.5
        </p>
      </div>
      <p className="label-lg text-primary">$599</p>
    </div>
  </Link>
)
