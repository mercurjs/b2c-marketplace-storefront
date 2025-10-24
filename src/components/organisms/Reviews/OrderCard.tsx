import { Button, Card, StarRating } from "@/components/atoms"
import { Order } from "@/lib/data/reviews"
import { format } from "date-fns"
import Image from "next/image"

export const OrderCard = ({
  order,
  showForm,
}: {
  order: Order
  showForm?: (review: Order) => void
}) => {
  return (
    <Card className="flex gap-6 px-4 justify-between w-full">
      <div className="flex gap-4 max-lg:items-center">
        <div>
          {order?.items?.[0]?.thumbnail ? (
            <Image
              alt="Seller photo"
              src={order.items[0].thumbnail}
              className="border border-base-primary rounded-xs"
              width={64}
              height={64}
            />
          ) : (
            <Image
              alt="Seller photo"
              src={"/images/placeholder.svg"}
              className="opacity-25 scale-75"
              width={64}
              height={64}
            />
          )}
        </div>
        <div>
          <p className="label-md text-primary font-normal">
            {order.seller.name}
          </p>
          <p className="label-md text-secondary">
            {order?.items?.[0]?.subtitle}
          </p>
          <p className="label-md text-secondary">
            Date: {format(order.created_at, "MMM dd, yyyy")}
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 w-1/2">
        {showForm ? (
          <div className="flex justify-end w-full">
            <Button onClick={() => showForm(order)} className="w-fit uppercase">
              Write review
            </Button>
          </div>
        ) : (
          <div className="h-full -mt-2 max-w-full">
            <p className="text-sm text-secondary">
              {format(order.reviews[0].created_at, "MMM dd, yyyy")}
            </p>
            <StarRating rate={order.reviews[0].rating} starSize={12} />
            <p className="label-md mt-2 whitespace-pre-line break-words">
              {order.reviews[0].customer_note}
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}
