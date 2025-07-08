import { UserNavigation } from "@/components/molecules/UserNavigation/UserNavigation"
import { OrderReturnRequests } from "@/components/sections/OrderReturnRequests/OrderReturnRequests"
import { retrieveCustomer } from "@/lib/data/customer"
import { getReturns } from "@/lib/data/orders"

export default async function ReturnsPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string; return: string }>
}) {
  const { order_return_requests } = await getReturns()

  const user = await retrieveCustomer()

  const { page, return: returnId } = await searchParams

  return (
    <main className="container">
      <div className="grid grid-cols-1 md:grid-cols-6 mt-6 gap-5 md:gap-8">
        <UserNavigation />
        <div className="md:col-span-5">
          <h1 className="heading-md uppercase">Returns</h1>
          <OrderReturnRequests
            returns={order_return_requests.sort((a, b) => {
              return (
                new Date(b.line_items[0].created_at).getTime() -
                new Date(a.line_items[0].created_at).getTime()
              )
            })}
            user={user}
            page={page}
            currentReturn={returnId || ""}
          />
        </div>
      </div>
    </main>
  )
}
