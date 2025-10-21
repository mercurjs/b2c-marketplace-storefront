import { Button } from "@/components/atoms"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { format } from "date-fns"
import { convertToLocale } from "@/lib/helpers/money"
import { ParcelAccordionItems } from "./ParcelAccordionItems"

export const ParcelAccordion = ({
  orderId,
  orderDisplayId,
  createdAt,
  total,
  currency_code = "eur",
  orders,
}: {
  orderId: string
  orderDisplayId: string
  createdAt: string | Date
  total: number
  currency_code?: string
  orders: any[]
  defaultOpen?: boolean
}) => {
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-5 text-secondary border bg-component-secondary py-6 px-4 rounded-sm w-full">
        <div className="sm:col-span-4 flex flex-col lg:flex-row lg:items-center justify-between lg:gap-4 sm:pr-10">
          <h2 className="heading-sm truncate">ORDER SET {orderDisplayId}</h2>
          <h2 className="label-md">
            Order date:{" "}
            <span className="text-primary lg:block xl:inline-block">
              {format(createdAt || "", "yyyy-MM-dd")}
            </span>
          </h2>
          <h2 className="label-md">
            Total:{" "}
            <span className="text-primary lg:block xl:inline-block">
              {convertToLocale({ amount: total, currency_code })}
            </span>
          </h2>
        </div>
        <div className="col-span-1 flex justify-end items-center gap-4">
          <LocalizedClientLink href={`/user/orders/${orderId}`}>
            <Button variant="tonal">
              <span className="label-md text-primary">VIEW ORDER</span>
            </Button>
          </LocalizedClientLink>
        </div>
      </div>
      <div className="mb-4">
        <ul className="w-full">
          {orders.map((order, index) => (
            <ParcelAccordionItems
              key={order.id}
              order={order}
              index={index + 1}
              currency_code={currency_code}
            />
          ))}
        </ul>
      </div>
    </>
  )
}
