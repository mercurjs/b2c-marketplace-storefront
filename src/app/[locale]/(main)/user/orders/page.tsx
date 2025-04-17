import { LoginForm, ParcelAccordion } from "@/components/molecules"
import { UserNavigation } from "@/components/molecules"
import { retrieveCustomer } from "@/lib/data/customer"
import mock from "./mock.json"
import { OrdersPagination } from "@/components/sections"
import { isEmpty } from "lodash"

export default async function UserPage() {
  const user = await retrieveCustomer()

  // TODO - get orders from API
  const orders = mock

  const singleOrder = orders.order

  if (!user) return <LoginForm />

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
                <ParcelAccordion
                  orderId={singleOrder.id}
                  createdAt={singleOrder.created_at}
                  total={singleOrder.total}
                  items={singleOrder.items}
                  currency_code={singleOrder.currency_code}
                />
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
