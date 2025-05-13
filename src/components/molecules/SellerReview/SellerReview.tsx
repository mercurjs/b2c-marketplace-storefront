import { StarRating } from "@/components/atoms"
import { SingleProductReview } from "@/types/product"

export const SellerReview = ({ review }: { review: SingleProductReview }) => {
  return (
    <div className="mb-4 border-b pb-4">
      <div className="mb-4 flex gap-4 items-center">
        <StarRating starSize={16} rate={review.rating} />
        <p className="label-md text-secondary">
          {review.customer.first_name} {review.customer.last_name} |{" "}
          {review.created_at}
        </p>
      </div>
      <div className="flex gap-4">
        <p className="text-md">{review.customer_note}</p>
      </div>
    </div>
  )
}
