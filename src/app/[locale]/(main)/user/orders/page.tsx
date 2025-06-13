import { LoginForm, ParcelAccordion } from "@/components/molecules"
import { UserNavigation } from "@/components/molecules"
import { retrieveCustomer } from "@/lib/data/customer"
import { OrdersPagination } from "@/components/sections"
import { isEmpty } from "lodash"
import { listOrders } from "@/lib/data/orders"

const LIMIT = 10

export default async function UserPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>
}) {
  const user = await retrieveCustomer()

  if (!user) return <LoginForm />

  const orders = await listOrders()

  const { page } = await searchParams

  const pages = Math.ceil(orders.length / LIMIT)
  const currentPage = +page || 1
  const offset = (+currentPage - 1) * LIMIT

  const orderSetsGrouped = orders.reduce((acc, order) => {
    const orderSetId = (order as any).order_set.id
    if (!acc[orderSetId]) {
      acc[orderSetId] = []
    }
    acc[orderSetId].push(order)
    return acc
  }, {} as Record<string, typeof orders>)

  const orderSets = Object.entries(orderSetsGrouped).map(
    ([orderSetId, orders]) => {
      const firstOrder = orders[0]
      const orderSet = (firstOrder as any).order_set

      return {
        id: orderSetId,
        orders: orders,
        created_at: orderSet.created_at,
        display_id: orderSet.display_id,
        total: orders.reduce((sum, order) => sum + order.total, 0),
        currency_code: firstOrder.currency_code,
      }
    }
  )

  const processedOrders = orderSets.slice(offset, offset + LIMIT)

  return (
    <main className="container">
      <div className="grid grid-cols-1 md:grid-cols-4 mt-6 gap-5 md:gap-8">
        <UserNavigation />
        <div className="md:col-span-3 space-y-8">
          <h1 className="heading-md uppercase">Orders</h1>
          {isEmpty(orders) ? (
            <div className="text-center">
              <h3 className="heading-lg text-primary uppercase">No orders</h3>
              <p className="text-lg text-secondary mt-2">
                You haven&apos;t placed any order yet. Once you place an order,
                it will appear here.
              </p>
            </div>
          ) : (
            <>
              <div className="w-full max-w-full">
                {processedOrders.map((orderSet) => (
                  <ParcelAccordion
                    key={orderSet.id}
                    orderId={orderSet.id}
                    orderDisplayId={`#${orderSet.display_id}`}
                    createdAt={orderSet.created_at}
                    total={orderSet.total}
                    orders={orderSet.orders || []}
                    currency_code={orderSet.currency_code}
                  />
                ))}
              </div>
              {/* TODO - pagination */}
              <OrdersPagination pages={pages} />
            </>
          )}
        </div>
      </div>
    </main>
  )
}
