import { SellerReviewList, SellerScore } from "@/components/molecules"
import { getSellerByHandle } from "@/lib/data/seller"

export const SellerReviewTab = async ({
  seller_handle,
}: {
  seller_handle: string
}) => {
  const seller = await getSellerByHandle(seller_handle)

  const reviewCount = seller.reviews ? seller.reviews?.length : 0

  const rating =
    seller.reviews && seller.reviews.length > 0
      ? seller.reviews.reduce((sum, r) => sum + r.rating, 0) /
        seller.reviews.length
      : 0
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 mt-8">
      <div className="border rounded-sm p-4">
        <SellerScore rate={rating} reviewCount={reviewCount} />
      </div>
      <div className="col-span-3 border rounded-sm p-4">
        <h3 className="heading-sm uppercase border-b pb-4">Seller reviews</h3>
        <SellerReviewList reviews={seller.reviews} />
      </div>
    </div>
  )
}
