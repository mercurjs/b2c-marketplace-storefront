import { UserNavigation } from "@/components/molecules"
import { retrieveCustomer } from "@/lib/data/customer"
import mock from "../mock.json"
import { Button, Card, Divider } from "@/components/atoms"
import Link from "next/link"
import { ArrowLeftIcon } from "@/icons"
import { OrderProductListItem } from "@/components/cells"
import { redirect } from "next/navigation"
import { format } from "date-fns"
import { OrderAddresses } from "@/components/cells"

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const user = await retrieveCustomer()

  const { id } = await params

  // TODO - get order from API
  const orders = mock

  const singleOrder = orders.order

  if (!user) return redirect("/user")

  return (
    <main className="container">
      <div className="grid grid-cols-1 md:grid-cols-4 mt-6 gap-5 md:gap-8">
        <UserNavigation />
        <div className="md:col-span-3 space-y-8">
          <Link href="/user/orders" className="block w-fit">
            <Button
              variant="tonal"
              className="label-md text-action-on-secondary uppercase flex items-center gap-2"
            >
              <ArrowLeftIcon className="size-4" />
              All orders
            </Button>
          </Link>
          <h1 className="heading-md uppercase">Order {id}</h1>
          <div className="w-full max-w-full">
            <div className="flex items-center justify-between text-secondary border border-primary bg-component-secondary py-6 px-4 rounded-sm w-full ">
              <div className="flex items-center">
                <h2 className="heading-sm uppercase text-secondary">
                  Status:{" "}
                  <span className="text-primary">{singleOrder.status}</span>
                </h2>
              </div>
              <div className="flex justify-end">
                <h2 className="label-md text-secondary">
                  Order date:{" "}
                  <span className="text-primary">
                    {format(singleOrder.created_at || "", "yyyy-MM-dd")}
                  </span>
                </h2>
              </div>
            </div>
            <Card className="px-4 pt-6 space-y-4">
              <Divider />
              {singleOrder.items.map((item) => (
                <OrderProductListItem
                  key={item.id + item.variant_id}
                  item={item}
                  currency_code={singleOrder.currency_code}
                />
              ))}
            </Card>
          </div>
          <OrderAddresses singleOrder={singleOrder} />
        </div>
      </div>
    </main>
  )
}
