import { SellerReview } from "../SellerReview/SellerReview"

export const SellerReviewList = ({ reviews }: { reviews?: any[] }) => {
  if (!reviews) return null

  return (
    <div className="mt-4 max-h-[654px] overflow-y-scroll no-scrollbar">
      {reviews
        ?.filter((rev) => rev !== null)
        .map((review) => (
          <SellerReview key={review.id} review={review} />
        ))}
    </div>
  )
}
