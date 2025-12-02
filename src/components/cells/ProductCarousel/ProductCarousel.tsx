"use client"

import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { ProductCarouselIndicator } from "@/components/molecules"
import { useScreenSize } from "@/hooks/useScreenSize"
import { Carousel, CarouselContent, CarouselItem } from "@/components/cells"

export const ProductCarousel = ({
  slides = [],
}: {
  slides: HttpTypes.StoreProduct["images"]
}) => {
  const screenSize = useScreenSize()

  return (
    <div className="relative">
      <Carousel
        opts={{
          axis:
            screenSize === "xs" || screenSize === "sm" || screenSize === "md"
              ? "x"
              : "y",
          loop: true,
          align: "start",
        }}
        className="rounded-xs"
      >
        <CarouselContent className="h-[350px] lg:h-fit max-h-[698px] flex lg:block">
          {(slides || []).map((slide, idx) => (
            <CarouselItem
              key={slide.id}
              className="basis-full min-w-0 h-[350px] lg:h-fit"
            >
              <Image
                priority={idx === 0}
                fetchPriority={idx === 0 ? "high" : "auto"}
                src={decodeURIComponent(slide.url)}
                alt="Product image"
                width={700}
                height={700}
                quality={idx === 0 ? 85 : 70}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="max-h-[700px] w-full h-auto aspect-square object-cover object-center"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {slides?.length ? <ProductCarouselIndicator slides={slides} /> : null}
      </Carousel>
    </div>
  )
}
