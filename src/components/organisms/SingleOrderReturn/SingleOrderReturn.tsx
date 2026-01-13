"use client"

import { Avatar, Badge, Card, Divider } from "@/components/atoms"
import { CollapseIcon } from "@/icons"
import { cn } from "@/lib/utils"
import { Heading } from "@medusajs/ui"
import { format } from "date-fns"
import { useEffect, useRef, useState } from "react"
import { Chat } from "../Chat/Chat"
import Image from "next/image"
import { convertToLocale } from "@/lib/helpers/money"
import { StepProgressBar } from "@/components/cells/StepProgressBar/StepProgressBar"

const steps = ["pending", "processing", "sent"]

export const SingleOrderReturn = ({
  item,
  user,
  defaultOpen,
  returnReason,
}: {
  item: any
  user: any
  defaultOpen: boolean
  returnReason: any[]
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [height, setHeight] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTimeout(() => {
      if (contentRef.current) {
        setHeight(contentRef.current.scrollHeight)
      }
    }, 100)
  }, [])

  const filteredItems = item.order.items
    .filter((orderItem: any) =>
      item.line_items.some(
        (lineItem: any) => lineItem.line_item_id === orderItem.id
      )
    )
    .map((orderItem: any) => {
      const correspondingLineItem = item.line_items.find(
        (lineItem: any) => lineItem.line_item_id === orderItem.id
      )
      return {
        ...orderItem,
        reason_id:
          returnReason.find((r) => r.id === correspondingLineItem?.reason_id)
            ?.label || "No reason provided",
      }
    })

  const currency_code = item.order.currency_code || "usd"

  const total = filteredItems.reduce((acc: number, item: any) => {
    return acc + item.unit_price
  }, 0)

  const currentStep = steps.indexOf(item.status)

  return (
    <>
      <Card className="bg-secondary p-4 flex justify-between mt-8">
        <Heading level="h2">Order: #{item.order.display_id}</Heading>
        <div className="flex flex-col gap-2 items-center">
          <p className="label-sm text-secondary">
            Return requested date:{" "}
            {format(item.line_items[0].created_at, "MMM dd, yyyy")}
          </p>
        </div>
      </Card>
      <Card className="p-0">
        <div
          className="p-4 flex justify-between items-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Heading level="h3" className="uppercase label-md !font-semibold">
            {item.status}
          </Heading>
          <p className="label-sm text-secondary flex gap-2">
            {item.line_items.length}{" "}
            {item.line_items.length > 1 ? "items" : "item"}
            <CollapseIcon
              className={cn(
                "w-5 h-5 text-secondary transition-transform duration-300",
                isOpen ? "rotate-180" : ""
              )}
            />
          </p>
        </div>
        <div
          className={cn("transition-all duration-300 overflow-hidden")}
          style={{
            maxHeight: isOpen ? `${height}px` : "0px",
            opacity: isOpen ? 1 : 0,
            transition: "max-height 0.3s ease-in-out, opacity 0.2s ease-in-out",
          }}
          ref={contentRef}
        >
          <Divider />
          <div className="p-4 uppercase">
            <StepProgressBar steps={steps} currentStep={currentStep} />
          </div>
          <Divider />
          <div className="p-4 flex justify-between">
            <div className="flex items-center gap-2">
              <Avatar
                src={item.order.seller.photo || "/talkjs-placeholder.jpg"}
              />
              <p className="label-lg text-primary">{item.order.seller.name}</p>
            </div>
            <Chat
              user={user}
              seller={item.order.seller}
              buttonClassNames="uppercase"
              order_id={item.order.id}
            />
          </div>
          <Divider />
          <div className="p-4 flex justify-between w-full">
            <div className="flex flex-col gap-4 w-full">
              {filteredItems.map((item: any) => (
                <div key={item.id} className="flex items-center gap-2">
                  <div className="flex items-center gap-4 w-1/2">
                    <div className="rounded-sm overflow-hidden border">
                      {item.thumbnail ? (
                        <Image
                          src={item.thumbnail}
                          alt={item.product_title}
                          width={60}
                          height={60}
                        />
                      ) : (
                        <Image
                          src="/images/placeholder.svg"
                          alt={item.product_title}
                          width={60}
                          height={60}
                          className="scale-50 opacity-25"
                        />
                      )}
                    </div>
                    <div>
                      <p className="label-md !font-semibold text-primary">
                        {item.product_title}
                      </p>
                      <p className="label-md text-secondary">{item.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex justify-between w-1/2">
                    <p className="label-md !font-semibold text-primary">
                      <Badge className="bg-primary text-primary border rounded-sm">
                        {item.reason_id || "No reason provided"}
                      </Badge>
                    </p>
                    <p className="label-md !font-semibold text-primary">
                      {convertToLocale({
                        amount: item.unit_price,
                        currency_code,
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Divider />
          <div className="p-4 flex justify-between">
            <p className="label-md text-secondary">Total:</p>
            <p className="label-md !font-semibold text-primary">
              {convertToLocale({
                amount: total,
                currency_code,
              })}
            </p>
          </div>
        </div>
      </Card>
    </>
  )
}
