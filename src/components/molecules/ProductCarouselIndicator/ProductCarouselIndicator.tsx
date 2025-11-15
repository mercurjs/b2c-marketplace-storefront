"use client"
import Image from "next/image"
import { HttpTypes } from "@medusajs/types"
import { useCallback } from "react"
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/cells"

function ThumbnailsCarousel({
  slides,
}: {
  slides: HttpTypes.StoreProduct["images"]
}) {
  const { selectedIndex, scrollTo, api: parentApi } = useCarousel()

  const changeSlideHandler = useCallback(
    (index: number) => {
      if (!parentApi) return
      scrollTo(index)
    },
    [parentApi, scrollTo]
  )

  return (
    <div className="embla relative">
      <Carousel
        opts={{
          axis: "y",
          loop: true,
          align: "start",
        }}
        className="overflow-hidden rounded-xs"
      >
        <CarouselContent className="h-[350px] lg:h-[680px] flex lg:block">
          {(slides || []).map((slide, index) => (
            <CarouselItem
              key={slide.id}
              className="mb-3 rounded-sm cursor-pointer w-16 h-16 bg-primary hidden lg:block basis-auto"
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
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export const ProductCarouselIndicator = ({
  slides = [],
}: {
  slides: HttpTypes.StoreProduct["images"]
}) => {
  const { selectedIndex } = useCarousel()
  const totalSlides = slides?.length || 0
  const progress =
    totalSlides > 0 ? ((selectedIndex + 1) / totalSlides) * 100 : 0

  return (
    <div className="embla__dots absolute lg:top-3 bottom-3 lg:bottom-auto left-3 w-[calc(100%-24px)] h-[2px]">
      {/* Mobile Progress Bar */}
      <div className="lg:hidden w-full h-1 rounded-md bg-tertiary/10 relative">
        <div
          className="h-full rounded-sm absolute transition-all duration-300 bg-tertiary"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={selectedIndex + 1}
          aria-valuemin={1}
          aria-valuemax={totalSlides}
          aria-label={`Imagen ${selectedIndex + 1} de ${totalSlides}`}
        />
      </div>

      {/* Desktop Thumbnails */}
      <ThumbnailsCarousel slides={slides} />
    </div>
  )
}
