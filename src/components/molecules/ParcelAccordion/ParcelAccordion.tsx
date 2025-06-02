"use client"
import { Button, Card } from "@/components/atoms"
import { CollapseIcon } from "@/icons"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"
import { OrderProductListItem } from "@/components/cells"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { format } from "date-fns"
import { convertToLocale } from "@/lib/helpers/money"

export const ParcelAccordion = ({
  orderId,
  orderDisplayId,
  createdAt,
  total,
  currency_code = "eur",
  items,
  defaultOpen = false,
}: {
  orderId: string
  orderDisplayId: string
  createdAt: string | Date
  total: number
  currency_code?: string
  items: any[]
  defaultOpen?: boolean
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [height, setHeight] = useState(0)
  const contentRef = useRef<HTMLUListElement>(null)

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

  return (
    <>
      <div
        className="grid grid-cols-2 sm:grid-cols-5 text-secondary border border-primary bg-component-secondary py-6 px-4 rounded-sm w-full cursor-pointer"
        onClick={openHandler}
      >
        <div className="sm:col-span-4 flex flex-col lg:flex-row lg:items-center justify-between lg:gap-4 sm:pr-10">
          <h2 className="heading-sm truncate">ORDER {orderDisplayId}</h2>
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
            <Button variant="tonal" onClick={(e) => e.stopPropagation()}>
              <span className="label-md text-primary">VIEW ORDER</span>
            </Button>
          </LocalizedClientLink>
          <CollapseIcon
            size={20}
            className={cn(
              "transition-all duration-300 mt-0.5 flex-none",
              isOpen && "rotate-180"
            )}
          />
        </div>
      </div>
      <Card
        className={cn(
          "transition-all duration-300 overflow-hidden flex items-center w-full"
        )}
        style={{
          maxHeight: isOpen ? `${height}px` : "0px",
          opacity: isOpen ? 1 : 0,
          transition: "max-height 0.3s ease-in-out, opacity 0.2s ease-in-out",
        }}
      >
        <ul ref={contentRef} className="px-2 py-4 w-full">
          {items.map((item, idx) => (
            <OrderProductListItem
              key={item.id + item.variant_id}
              item={item}
              currency_code={currency_code}
              withDivider={idx > 0}
            />
          ))}
        </ul>
      </Card>
    </>
  )
}
