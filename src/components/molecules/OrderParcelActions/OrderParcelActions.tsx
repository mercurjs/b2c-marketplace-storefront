import { OrderCancel } from "@/components/cells/OrderCancel/OrderCancel"
import { OrderReturn } from "@/components/cells/OrderReturn/OrderReturn"

export const OrderParcelActions = ({ order }: { order: any }) => {
  // if (order.status === "pending") return <OrderCancel order={order} />
  if (order.status === "completed") return <OrderReturn order={order} />
  return null
}
