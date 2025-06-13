"use client"

import { Card } from "@/components/atoms"
import { OrderProductListItem } from "@/components/cells"
import { CollapseIcon } from "@/icons"
import { parcelStatuses, steps } from "@/lib/helpers/parcel-statuses"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

export const ParcelAccordionItems = ({
  order,
  index,
  currency_code,
}: {
  order: any
  index: number
  currency_code: string
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [height, setHeight] = useState(0)

  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTimeout(() => {
      if (contentRef.current) {
        setHeight(contentRef.current.scrollHeight)
      }
    }, 100)
  }, [])

  const openHandler = () => {
    setIsOpen((prev) => !prev)
  }

  const status = parcelStatuses(order.fulfillment_status)

  return (
    <Card key={order.id} className="border-b rounded-sm p-0">
      <div
        className="grid grid-cols-2 sm:grid-cols-5 cursor-pointer hover:bg-component-secondary/40 p-4 transition-all duration-300"
        onClick={openHandler}
      >
        <p className="label-md col-span-3">
          Parcel {index}:{" "}
          <span className="text-primary font-semibold uppercase">
            {steps[status]}
          </span>
        </p>
        <p className="label-md">
          Seller:{" "}
          <span className="text-primary font-semibold">
            {order.seller.name}
          </span>
        </p>
        <div className="flex items-center gap-4 justify-end">
          <p className="label-md">
            {order.items.length > 1
              ? `${order.items.length} Items`
              : `${order.items.length} Item`}
          </p>
          <CollapseIcon
            size={20}
            className={cn(
              "transition-all duration-300 mt-0.5 flex-none",
              isOpen && "rotate-180"
            )}
          />
        </div>
      </div>
      <div
        ref={contentRef}
        className={cn("transition-all duration-300 overflow-hidden")}
        style={{
          maxHeight: isOpen ? `${height}px` : "0px",
          opacity: isOpen ? 1 : 0,
          transition: "max-height 0.3s ease-in-out, opacity 0.2s ease-in-out",
        }}
      >
        <div className="p-4">
          {order.items.map((item: any, idx: number) => (
            <OrderProductListItem
              key={item.id + item.variant_id}
              item={item}
              currency_code={currency_code}
            />
          ))}
        </div>
      </div>
    </Card>
  )
}
