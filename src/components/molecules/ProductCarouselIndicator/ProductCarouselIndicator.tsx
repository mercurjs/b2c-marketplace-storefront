"use client"
import Image from "next/image"
import { HttpTypes } from "@medusajs/types"
import { EmblaCarouselType } from "embla-carousel"
import { useCallback, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Indicator } from "@/components/atoms"

export const ProductCarouselIndicator = ({
  slides = [],
  embla,
}: {
  slides: HttpTypes.StoreProduct["images"]
  embla?: EmblaCarouselType
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const changeSlideHandler = useCallback(
    (index: number) => {
      if (!embla) return
      embla.scrollTo(index)
    },
    [embla]
  )

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!embla) return

    onSelect(embla)
    embla.on("reInit", onSelect).on("select", onSelect)
  }, [embla, onSelect])

  return (
    <div className="embla__dots absolute lg:top-3 bottom-3 lg:bottom-auto left-3 w-[calc(100%-24px)] h-[2px]">
      <div className="lg:hidden">
        <Indicator
          step={selectedIndex + 1}
          size="large"
          maxStep={slides?.length || 0}
        />
      </div>

      {(slides || []).map((slide, index) => (
        <div
          key={slide.id}
          className="mb-3 rounded-sm cursor-pointer w-16 h-16"
          onClick={() => changeSlideHandler(index)}
        >
          <Image
            src={decodeURIComponent(slide.url)}
            alt="Product carousel Indicator"
            width={64}
            height={64}
            className={cn(
              "rounded-sm border-2 transition-color duration-300 hidden lg:block w-16 h-16 object-cover",
              selectedIndex === index ? "border-primary" : "border-tertiary"
            )}
          />
        </div>
      ))}
    </div>
  )
}
