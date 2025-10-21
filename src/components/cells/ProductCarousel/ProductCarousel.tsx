"use client"

import useEmblaCarousel from "embla-carousel-react"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { ProductCarouselIndicator } from "@/components/molecules"
import { useScreenSize } from "@/hooks/useScreenSize"

export const ProductCarousel = ({
  slides = [],
}: {
  slides: HttpTypes.StoreProduct["images"]
}) => {
  const screenSize = useScreenSize()

  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis:
      screenSize === "xs" || screenSize === "sm" || screenSize === "md"
        ? "x"
        : "y",
    loop: true,
    align: "start",
  })

  return (
    <div className="embla relative">
      <div
        className="embla__viewport overflow-hidden rounded-xs"
        ref={emblaRef}
      >
        <div className="embla__container h-[350px] lg:h-fit max-h-[698px] flex lg:block">
          {(slides || []).map((slide, idx) => (
            <div
              key={slide.id}
              className="embla__slide min-w-0 h-[350px] lg:h-fit"
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
                className="max-h-[700px] w-full h-auto aspect-square object-cover object-center object-center"
              />
            </div>
          ))}
        </div>
        {slides?.length ? (
          <ProductCarouselIndicator slides={slides} embla={emblaApi} />
        ) : null}
      </div>
    </div>
  )
}
