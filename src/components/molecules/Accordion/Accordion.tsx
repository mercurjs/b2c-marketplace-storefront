"use client"
import { Card } from "@/components/atoms"
import { CollapseIcon } from "@/icons"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

export const Accordion = ({
  children,
  heading,
  defaultOpen = true,
}: {
  children: React.ReactNode
  heading: string
  defaultOpen?: boolean
}) => {
  const [open, setOpen] = useState(defaultOpen)
  const [contentHeight, setContentHeight] = useState(defaultOpen ? "100%" : 0)

  const accordionRef = useRef(null)

  useEffect(() => {
    if (accordionRef.current) {
      setContentHeight(
        accordionRef.current["scrollHeight"] || defaultOpen ? "100%" : 0
      )
    }
  }, [accordionRef?.current?.["scrollHeight"], defaultOpen])

  const openHandler = () => {
    setOpen(!open)
  }

  return (
    <Card>
      <div
        onClick={openHandler}
        className="flex justify-between items-center cursor-pointer px-2"
      >
        <h4 className="label-lg uppercase">{heading}</h4>
        <CollapseIcon
          size={20}
          className={cn("transition-all duration-300", open && "rotate-180")}
        />
      </div>
      <div
        ref={accordionRef}
        className={cn("transition-all duration-300 h-full overflow-hidden")}
        style={{ maxHeight: open ? contentHeight : 0 }}
      >
        <div className="pt-4">{children}</div>
      </div>
    </Card>
  )
}
