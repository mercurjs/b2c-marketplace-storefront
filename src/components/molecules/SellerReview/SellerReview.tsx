import { StarRating } from "@/components/atoms"
import { SingleProductReview } from "@/types/product"
import Image from "next/image"

export const SellerReview = ({ review }: { review: SingleProductReview }) => {
  return (
    <div className="mb-4">
      <div className="mb-4 flex gap-4 items-center">
        <StarRating starSize={16} rate={review.rating} />
        <p className="label-md text-secondary">
          {review.username} | {review.date}
        </p>
      </div>
      <div className="flex gap-4">
        <p className="text-md">{review.text}</p>
        <Image
          src={decodeURIComponent(review.image)}
          alt="Reviewed product image"
          width={56}
          height={56}
          className="w-[56px] h-[56px]"
        />
      </div>
    </div>
  )
}
