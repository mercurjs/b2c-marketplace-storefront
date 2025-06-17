import { OrderReturnSection } from "@/components/sections/OrderReturnSection/OrderReturnSection"
import { listCartShippingMethods } from "@/lib/data/fulfillment"
import { retrieveOrder, retrieveReturnReasons } from "@/lib/data/orders"

export default async function ReturnOrderPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const order = (await retrieveOrder(id)) as any
  const returnReasons = await retrieveReturnReasons()
  const shippingMethods = await listCartShippingMethods(
    order.order_set.cart_id!,
    true
  )

  return (
    <main className="container">
      <OrderReturnSection
        order={order}
        returnReasons={returnReasons}
        shippingMethods={shippingMethods as any}
      />
    </main>
  )
}
