import { LoginForm, UserNavigation } from "@/components/molecules"
import { ReviewsWritten } from "@/components/organisms"
import { retrieveCustomer } from "@/lib/data/customer"
import { getReviews } from "@/lib/data/reviews"

export default async function Page() {
  const user = await retrieveCustomer()

  const { reviews } = await getReviews()

  if (!user) return <LoginForm />

  return (
    <main className="container">
      <div className="grid grid-cols-1 md:grid-cols-4 mt-6 gap-5 md:gap-8">
        <UserNavigation />
        <ReviewsWritten reviews={reviews.filter(Boolean)} />
      </div>
    </main>
  )
}
