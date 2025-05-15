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

  const sellerReviews = reviews.filter(
    (review) => review.reference === "seller"
  )

  const sellerOrderCounts = orders.reduce((acc, order) => {
    const sellerId = order.seller.id
    acc[sellerId] = (acc[sellerId] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const needReview = Object.keys(sellerOrderCounts).reduce(
    (acc: any[], key: string) => {
      if (
        sellerReviews.filter((item) => item.seller.id === key).length <
        sellerOrderCounts[key]
      ) {
        acc.push(orders.find((item) => item.seller.id === key))
      }

      return acc
    },
    []
  )

  return (
    <main className="container">
      <div className="grid grid-cols-1 md:grid-cols-4 mt-6 gap-5 md:gap-8">
        <UserNavigation />
        <ReviewsToWrite reviews={needReview} />
      </div>
    </main>
  )
}
