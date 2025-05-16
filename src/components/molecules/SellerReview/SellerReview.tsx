import { StarRating } from "@/components/atoms"
import { SingleProductReview } from "@/types/product"
import { formatDistanceToNow } from "date-fns"

export const SellerReview = ({ review }: { review: SingleProductReview }) => {
  return (
    <div className="mb-4 border-b pb-4">
      <div className="mb-4 flex gap-4 items-center">
        <StarRating starSize={16} rate={Number(review.rating.toFixed(1))} />
        <p className="label-md text-secondary">
          {review.customer.first_name} {review.customer.last_name} |{" "}
          {formatDistanceToNow(new Date(review.created_at), {
            addSuffix: true,
          })}
        </p>
      </div>
      <div className="flex gap-4">
        <p className="text-md">{review.customer_note}</p>
      </div>
    </div>
  )
}
