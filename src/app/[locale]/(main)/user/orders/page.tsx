import { LoginForm, ParcelAccordion } from "@/components/molecules"
import { UserNavigation } from "@/components/molecules"
import { retrieveCustomer } from "@/lib/data/customer"
import { OrdersPagination } from "@/components/sections"
import { isEmpty } from "lodash"
import { listOrders } from "@/lib/data/orders"

export default async function UserPage() {
  const user = await retrieveCustomer()

  if (!user) return <LoginForm />

  const orders = await listOrders()

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
                {orders.map((order) => (
                  <ParcelAccordion
                    key={order.id}
                    orderId={order.id}
                    orderDisplayId={`#${order.display_id}`}
                    createdAt={order.created_at}
                    total={order.total}
                    items={order.items || []}
                    currency_code={order.currency_code}
                  />
                ))}
              </div>
              {/* TODO - pagination */}
              <OrdersPagination pages={1} />
            </>
          )}
        </div>
      </div>
    </main>
  )
}
