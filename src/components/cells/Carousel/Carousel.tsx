"use client"

import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import WheelGesturesPlugin from "embla-carousel-wheel-gestures"
import { ArrowLeftIcon, ArrowRightIcon } from "@/icons"
import { cn } from "@/lib/utils"
import Image from "next/image"

// ============================================================================
// Types
// ============================================================================

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
  disableWheelGestures?: boolean
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  selectedIndex: number
  slideCount: number
  scrollTo: (index: number) => void
  scrollProgress: number
} & CarouselProps

// ============================================================================
// Context
// ============================================================================

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

export function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

// ============================================================================
// Base Carousel Component
// ============================================================================

export function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  disableWheelGestures = false,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  // Merge WheelGesturesPlugin with user-provided plugins unless disabled
  const allPlugins = React.useMemo(() => {
    return [
      ...(plugins ?? []),
      ...(disableWheelGestures
        ? []
        : [WheelGesturesPlugin({ forceWheelAxis: "x" })]),
    ]
  }, [plugins, disableWheelGestures])

  const [carouselRef, api] = useEmblaCarousel(
    {
      skipSnaps: true,
      axis: orientation === "horizontal" ? "x" : "y",
      ...opts,
    },
    allPlugins
  )
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [slideCount, setSlideCount] = React.useState(0)
  const [scrollProgress, setScrollProgress] = React.useState(0)

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())

    const currentSnap = api.selectedScrollSnap()
    const snapCount = api.scrollSnapList().length

    setSelectedIndex(currentSnap)
    setSlideCount(api.slideNodes().length)

    // Calculate progress based on snap position (handles multiple visible slides)
    const progress = snapCount > 1 ? currentSnap / (snapCount - 1) : 0
    setScrollProgress(progress)
  }, [])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const scrollTo = React.useCallback(
    (index: number) => {
      api?.scrollTo(index)
    },
    [api]
  )

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext]
  )

  React.useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) return

    onSelect(api)
    api.on("reInit", onSelect)
    api.on("select", onSelect)

    return () => {
      api.off("select", onSelect)
    }
  }, [api, onSelect])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        selectedIndex,
        slideCount,
        scrollTo,
        scrollProgress,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

// ============================================================================
// CarouselContent & CarouselItem
// ============================================================================

export function CarouselContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "" : "flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
}

export function CarouselItem({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { orientation } = useCarousel()

  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}
      {...props}
    />
  )
}

// ============================================================================
// Arrow Navigation Components
// ============================================================================

export function CarouselPrevious({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <button
      type="button"
      className={cn(
        "absolute size-8 rounded-full disabled:opacity-50 disabled:cursor-not-allowed",
        "flex items-center justify-center",
        "bg-white shadow-md hover:bg-gray-50 transition-colors",
        orientation === "horizontal"
          ? "top-1/2 -translate-y-1/2 left-4"
          : "left-1/2 -translate-x-1/2 top-4 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      aria-label="Anterior"
      {...props}
    >
      {children || <ArrowLeftIcon className="size-4" />}
      <span className="sr-only">Anterior</span>
    </button>
  )
}

export function CarouselNext({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <button
      type="button"
      className={cn(
        "absolute size-8 rounded-full disabled:opacity-50 disabled:cursor-not-allowed",
        "flex items-center justify-center",
        "bg-white shadow-md hover:bg-gray-50 transition-colors",
        orientation === "horizontal"
          ? "top-1/2 -translate-y-1/2 right-4"
          : "left-1/2 -translate-x-1/2 bottom-4 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      aria-label="Siguiente"
      {...props}
    >
      {children || <ArrowRightIcon className="size-4" />}
      <span className="sr-only">Siguiente</span>
    </button>
  )
}

// ============================================================================
// Indicator Components
// ============================================================================

export function CarouselDots({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { selectedIndex, slideCount, scrollTo } = useCarousel()

  return (
    <div
      className={cn("flex gap-2 justify-center", className)}
      role="tablist"
      aria-label="Navegación de carrusel"
      {...props}
    >
      {Array.from({ length: slideCount }).map((_, index) => (
        <button
          key={index}
          type="button"
          role="tab"
          aria-selected={index === selectedIndex}
          aria-label={`Ir al slide ${index + 1}`}
          onClick={() => scrollTo(index)}
          className={cn(
            "h-3 rounded-full cursor-pointer transition-all duration-300",
            "hover:bg-white/80",
            selectedIndex === index ? "bg-white w-8" : "bg-white/50 w-3"
          )}
        />
      ))}
    </div>
  )
}

export function CarouselProgress({
  className,
  trackClassName,
  fillClassName,
  ...props
}: React.ComponentProps<"div"> & {
  trackClassName?: string
  fillClassName?: string
}) {
  const { scrollProgress } = useCarousel()

  // Use Embla's scrollProgress (0-1) - automatically handles multiple visible slides
  const progress = Math.max(0, Math.min(100, scrollProgress * 100))

  return (
    <div
      className={cn(
        "relative w-full h-1 rounded-md overflow-hidden",
        trackClassName || "bg-[rgba(var(--neutral-100),1)]",
        className
      )}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Progreso: ${Math.round(progress)}%`}
      {...props}
    >
      <div
        className={cn(
          "absolute h-full rounded-md transition-all duration-300 ease-out",
          fillClassName || "bg-[rgba(var(--brand-600),1)]"
        )}
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  )
}

type ThumbnailData = {
  id: string
  url: string
}

export function CarouselThumbnails({
  thumbnails,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  thumbnails: ThumbnailData[]
}) {
  const { selectedIndex, scrollTo, orientation } = useCarousel()

  return (
    <div
      className={cn(
        "flex gap-2",
        orientation === "vertical" ? "flex-col" : "flex-row",
        className
      )}
      {...props}
    >
      {thumbnails.map((thumbnail, index) => (
        <button
          key={thumbnail.id}
          type="button"
          onClick={() => scrollTo(index)}
          className={cn(
            "rounded-sm cursor-pointer w-16 h-16 overflow-hidden transition-all duration-300",
            "border-2",
            selectedIndex === index ? "border-primary" : "border-gray-300"
          )}
          aria-label={`Ver imagen ${index + 1}`}
        >
          <Image
            src={decodeURIComponent(thumbnail.url)}
            alt={`Thumbnail ${index + 1}`}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        </button>
      ))}
    </div>
  )
}

// ============================================================================
// Exports
// ============================================================================

export type { CarouselApi, CarouselOptions, CarouselPlugin, ThumbnailData }
