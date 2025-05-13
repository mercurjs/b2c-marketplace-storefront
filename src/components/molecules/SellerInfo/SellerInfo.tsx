import { StarRating } from "@/components/atoms"
import { SellerAvatar } from "@/components/cells/SellerAvatar/SellerAvatar"
import { SellerProps } from "@/types/seller"

export const SellerInfo = ({ seller }: { seller: SellerProps }) => {
  const { photo, name, reviews } = seller

  const reviewCount = reviews ? reviews?.length : 0

  const rating =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0

  return (
    <div className="flex gap-4">
      <div className="relative h-12 w-12 overflow-hidden rounded-sm">
        <SellerAvatar photo={photo} size={56} alt={name} />
      </div>
      <div>
        <h3 className="heading-sm text-primary">{name}</h3>
        <div className="flex items-center gap-2">
          <StarRating starSize={16} rate={rating || 0} />
          <span className="text-md text-secondary">{reviewCount} reviews</span>
        </div>
      </div>
    </div>
  )
}
