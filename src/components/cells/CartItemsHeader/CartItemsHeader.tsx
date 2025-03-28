import Image from "next/image"
import { Divider } from "@/components/atoms"
import { SingleProductSeller } from "@/types/product"

export const CartItemsHeader = ({
  seller,
}: {
  seller: SingleProductSeller
}) => {
  return (
    <div className="border rounded-sm p-4 flex gap-4 items-center">
      <Image src={seller.photo} alt={seller.name} width={32} height={32} />
      <div className="lg:flex gap-2">
        <p className="uppercase heading-xs">{seller.name}</p>
        <div className="flex items-center gap-2">
          <Divider square className="hidden lg:block" />
          <p className="label-md text-secondary">{seller.parcel}</p>
          <Divider square />
          <p className="label-md text-secondary">{seller.date}</p>
        </div>
      </div>
    </div>
  )
}
