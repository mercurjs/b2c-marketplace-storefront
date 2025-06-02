import { UserNavigation } from "@/components/molecules"
import { retrieveCustomer } from "@/lib/data/customer"
import { Avatar, Button, Card } from "@/components/atoms"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { ArrowLeftIcon } from "@/icons"
import { OrderProductListItem } from "@/components/cells"
import { redirect } from "next/navigation"
import { format } from "date-fns"
import { OrderAddresses } from "@/components/cells"
import { retrieveOrder } from "@/lib/data/orders"
import { Chat } from "@/components/organisms/Chat/Chat"
import { SellerProps } from "@/types/seller"
import { HttpTypes } from "@medusajs/types"

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const user = await retrieveCustomer()
  const order = (await retrieveOrder(id)) as HttpTypes.StoreOrder & {
    seller: SellerProps
  }

  if (!user || !order) return redirect("/user")

  const { seller } = order

  return (
    <main className="container">
      <div className="grid grid-cols-1 md:grid-cols-4 mt-6 gap-5 md:gap-8">
        <UserNavigation />
        <div className="md:col-span-3 space-y-8">
          <LocalizedClientLink href="/user/orders" className="block w-fit">
            <Button
              variant="tonal"
              className="label-md text-action-on-secondary uppercase flex items-center gap-2"
            >
              <ArrowLeftIcon className="size-4" />
              All orders
            </Button>
          </LocalizedClientLink>
          <h1 className="heading-md uppercase">Order #{order.display_id}</h1>
          <div className="w-full max-w-full">
            <div className="flex items-center justify-between text-secondary border border-primary py-4 px-4 rounded-sm w-full">
              <div className="flex items-center gap-2">
                <Avatar src={seller.photo} size="large" />
                <h2 className="heading-sm uppercase  text-primary">
                  {seller.name}
                </h2>
              </div>
              <div className="flex justify-end">
                <Chat
                  user={user}
                  seller={seller}
                  order_id={order.id}
                  subject={`Order #${order.display_id}: ${
                    order.items?.[0]?.product_title
                  } ${
                    order.items?.length && order.items.length > 1
                      ? `+${order.items.length - 1}`
                      : ""
                  }`}
                />
              </div>
            </div>
            <div className="flex items-center justify-between text-secondary border border-primary bg-component-secondary py-6 px-4 rounded-sm w-full ">
              <div className="flex items-center">
                <h2 className="heading-sm uppercase text-secondary">
                  Status: <span className="text-primary">{order.status}</span>
                </h2>
              </div>
              <div className="flex justify-end">
                <h2 className="label-md text-secondary">
                  Order date:{" "}
                  <span className="text-primary">
                    {format(order.created_at || "", "yyyy-MM-dd")}
                  </span>
                </h2>
              </div>
            </div>
            <Card className="px-4 pt-6 space-y-4">
              {order.items?.map((item) => (
                <OrderProductListItem
                  key={item.id + item.variant_id}
                  item={item}
                  currency_code={order.currency_code}
                />
              ))}
            </Card>
          </div>
          <OrderAddresses singleOrder={order} />
        </div>
      </div>
    </main>
  )
}
