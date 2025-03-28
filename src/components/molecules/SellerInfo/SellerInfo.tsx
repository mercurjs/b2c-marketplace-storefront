import { StarRating } from "@/components/atoms"
import { SingleProductSeller } from "@/types/product"
import Image from "next/image"

export const SellerInfo = ({ seller }: { seller: SingleProductSeller }) => {
  const { photo, name, rating, reviewCount } = seller

  return (
    <div className="flex gap-4">
      <div className="relative h-12 w-12 overflow-hidden rounded-sm">
        <Image
          src={photo}
          alt={name}
          width={56}
          height={56}
          className="object-cover"
        />
      </div>
      <div>
        <h3 className="heading-sm text-primary">{name}</h3>
        <div className="flex items-center gap-2">
          <StarRating starSize={16} rate={rating} />
          <span className="text-md text-secondary">{reviewCount} reviews</span>
        </div>
      </div>
    </div>
  )
}
