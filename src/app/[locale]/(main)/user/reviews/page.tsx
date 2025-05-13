import { LoginForm, UserNavigation } from "@/components/molecules"
import { ReviewsToWrite } from "@/components/organisms"
import { retrieveCustomer } from "@/lib/data/customer"
import { listOrders } from "@/lib/data/orders"
import { getReviews } from "@/lib/data/reviews"

export default async function Page() {
  const user = await retrieveCustomer()

  if (!user) return <LoginForm />

  const orders = await listOrders()
  const { reviews } = await getReviews()

  const sellerReviews = reviews.filter(
    (review) => review.reference === "seller"
  )

  const sellerOrderCounts = orders.reduce((acc, order) => {
    const sellerId = order.seller.id
    acc[sellerId] = (acc[sellerId] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  if (!orders || !reviews) return null

  const reviewsToWrite = orders.reduce((acc: any[], order) => {
    if (!order.seller) return acc

    const needReview = Object.entries(sellerOrderCounts).map(
      ([sellerId, count]) => {
        const reviewsCount = sellerReviews.filter(
          (review) => review.seller.id === sellerId
        ).length

        let needReview = false

        if (count > reviewsCount) {
          needReview = true
        }

        return needReview
      }
    )[0]

    if (
      needReview &&
      !acc.some((item) => item.seller?.id === order.seller.id)
    ) {
      acc.push({
        ...order,
      })
    }

    return acc
  }, [])

  return (
    <main className="container">
      <div className="grid grid-cols-1 md:grid-cols-4 mt-6 gap-5 md:gap-8">
        <UserNavigation />
        <ReviewsToWrite reviews={reviewsToWrite} />
      </div>
    </main>
  )
}
