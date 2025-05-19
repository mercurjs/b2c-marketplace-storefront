import { StarRating } from "@/components/atoms"
import { SellerAvatar } from "@/components/cells/SellerAvatar/SellerAvatar"
import { SellerProps } from "@/types/seller"
import { SellerReview } from "../SellerReview/SellerReview"

export const SellerInfo = ({
  seller,
  header = false,
}: {
  seller: SellerProps
  header?: boolean
}) => {
  const { photo, name, reviews } = seller

  const reviewCount = reviews
    ? reviews?.filter((rev) => rev !== null).length
    : 0

  const rating =
    reviews && reviews.length > 0
      ? reviews
          .filter((rev) => rev !== null)
          .reduce((sum, r) => sum + r?.rating || 0, 0) / reviewCount
      : 0

  return (
    <div className="flex gap-4 w-full">
      <div className="relative h-12 w-12 overflow-hidden rounded-sm">
        <SellerAvatar photo={photo} size={56} alt={name} />
      </div>
      <div className="w-[90%]">
        <h3 className="heading-sm text-primary">{name}</h3>
        <div className="flex items-center gap-2 border-b pb-4">
          <StarRating starSize={16} rate={rating || 0} />
          <span className="text-md text-secondary">{reviewCount} reviews</span>
        </div>
        <div className="mt-4">
          {!header &&
            reviews
              ?.filter((rev) => rev !== null)
              .slice(-3)
              .map((review) => (
                <SellerReview key={review.id} review={review} />
              ))}
        </div>
      </div>
    </div>
  )
}
