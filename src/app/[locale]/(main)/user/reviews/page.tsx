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

  if (!orders || !reviews) return null

  const reviewsToWrite = orders.reduce((acc: any[], order) => {
    if (!order.seller) return acc

    const hasReview = reviews.some(
      (review: any) => review.seller?.id === order.seller.id
    )

    if (
      !hasReview &&
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
