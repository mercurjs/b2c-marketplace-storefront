import type { Meta, StoryObj } from "@storybook/react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
  CarouselProgress,
  CarouselThumbnails,
  useCarousel,
} from "./Carousel"
import Autoplay from "embla-carousel-autoplay"

// ============================================================================
// Helper Components for Stories
// ============================================================================

function DemoSlide({
  index,
  color,
  title,
}: {
  index: number
  color: string
  title?: string
}) {
  return (
    <div
      className={`${color} rounded-lg flex items-center justify-center min-h-[300px] p-8`}
    >
      <div className="text-center text-white">
        <div className="text-6xl font-bold mb-2">{index}</div>
        {title && <div className="text-xl">{title}</div>}
      </div>
    </div>
  )
}

function ProductSlide({ index }: { index: number }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mx-2">
      <div className="bg-gray-200 rounded-lg h-48 mb-4 flex items-center justify-center">
        <span className="text-4xl text-gray-400">🏥</span>
      </div>
      <h3 className="font-semibold text-lg mb-2">Medical Product {index}</h3>
      <p className="text-gray-600 text-sm mb-3">
        High quality medical product description
      </p>
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold text-primary">$299.99</span>
        <button className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary/90">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

function CustomNumberIndicator() {
  const { selectedIndex, slideCount, scrollTo } = useCarousel()

  return (
    <div className="flex gap-2 justify-center mt-4">
      {Array.from({ length: slideCount }).map((_, i) => (
        <button
          key={i}
          onClick={() => scrollTo(i)}
          className={`
            w-10 h-10 rounded-full font-semibold transition-all
            ${
              i === selectedIndex
                ? "bg-primary text-white scale-110"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }
          `}
        >
          {i + 1}
        </button>
      ))}
    </div>
  )
}

// ============================================================================
// Shared Data
// ============================================================================

const colors = [
  "bg-gradient-to-br from-blue-500 to-blue-700",
  "bg-gradient-to-br from-purple-500 to-purple-700",
  "bg-gradient-to-br from-pink-500 to-pink-700",
  "bg-gradient-to-br from-green-500 to-green-700",
  "bg-gradient-to-br from-orange-500 to-orange-700",
]

const slides = colors.map((color, i) => (
  <DemoSlide key={i} index={i + 1} color={color} />
))

const heroSlides = [
  {
    id: 1,
    color: "bg-gradient-to-r from-blue-600 to-cyan-500",
    title: "Medical Equipment",
  },
  {
    id: 2,
    color: "bg-gradient-to-r from-purple-600 to-pink-500",
    title: "Professional Machinery",
  },
  {
    id: 3,
    color: "bg-gradient-to-r from-green-600 to-teal-500",
    title: "Pharmaceutical Products",
  },
]

const productSlides = Array.from({ length: 8 }).map((_, i) => (
  <ProductSlide key={i} index={i + 1} />
))

const thumbnails = colors.map((_, i) => ({
  id: `thumb-${i}`,
  url: `https://placehold.co/200x200/${
    ["3B82F6", "A855F7", "EC4899", "10B981", "F97316"][i]
  }/FFFFFF?text=${i + 1}`,
}))

// ============================================================================
// Meta Configuration
// ============================================================================

const meta: Meta<typeof Carousel> = {
  title: "Components/Cells/Carousel",
  component: Carousel,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Carousel>

// ============================================================================
// Stories
// ============================================================================

export const WithDots: Story = {
  name: "1. Carousel with Dots",
  render: () => (
    <Carousel
      opts={{ loop: true }}
      className="w-full"
      aria-label="Carousel with dot indicators"
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>{slide}</CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <div className="absolute bottom-4 left-0 right-0 z-10">
        <CarouselDots />
      </div>
    </Carousel>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Simple carousel with dot indicators. Ideal for hero sections or featured content.",
      },
    },
  },
}

export const WithProgress: Story = {
  name: "2. Carousel with Progress Bar",
  render: () => (
    <Carousel
      opts={{ loop: true, align: "start" }}
      className="w-full"
      aria-label="Carousel with progress bar"
    >
      <CarouselContent>
        {slides.slice(0, 4).map((slide, index) => (
          <CarouselItem key={index}>{slide}</CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-4">
        <CarouselProgress />
      </div>
    </Carousel>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Carousel with progress bar. Perfect for showing progress through a sequence.",
      },
    },
  },
}

export const WithThumbnails: Story = {
  name: "3. Carousel with Thumbnails",
  render: () => (
    <Carousel
      opts={{ loop: true }}
      className="w-full"
      aria-label="Carousel with thumbnails"
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>{slide}</CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-4">
        <CarouselThumbnails thumbnails={thumbnails} />
      </div>
    </Carousel>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Carousel with navigable thumbnails. Ideal for product galleries.",
      },
    },
  },
}

export const WithAutoplay: Story = {
  name: "4. Carousel with Autoplay",
  render: () => (
    <Carousel
      opts={{ loop: true }}
      plugins={[Autoplay({ delay: 3000, stopOnInteraction: true })]}
      className="w-full"
      aria-label="Carousel with autoplay"
    >
      <CarouselContent>
        {heroSlides.map((slide) => (
          <CarouselItem key={slide.id}>
            <DemoSlide
              index={slide.id}
              color={slide.color}
              title={slide.title}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <div className="absolute bottom-4 left-0 right-0 z-10">
        <CarouselDots />
      </div>
    </Carousel>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Carousel with automatic playback. Perfect for banners and promotional slides.",
      },
    },
  },
}

export const WithOutsideArrows: Story = {
  name: "5. Carousel with Outside Arrows",
  render: () => (
    <div className="px-16">
      <Carousel
        opts={{ loop: false, align: "start" }}
        className="w-full"
        aria-label="Product carousel"
      >
        <CarouselContent>
          {productSlides.map((slide, index) => (
            <CarouselItem key={index}>{slide}</CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-[-3rem]" />
        <CarouselNext className="right-[-3rem]" />
        <div className="mt-4">
          <CarouselProgress />
        </div>
      </Carousel>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Carousel with arrows positioned outside the content. Useful when you don't want arrows to overlap.",
      },
    },
  },
}

export const BasicComposable: Story = {
  name: "6. Basic Composable Pattern",
  render: () => (
    <Carousel opts={{ loop: true }}>
      <CarouselContent>
        {slides.map((slide, i) => (
          <CarouselItem key={i}>{slide}</CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
        <CarouselDots />
      </div>
    </Carousel>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Use individual components to create custom layouts. Full control over positioning.",
      },
    },
  },
}

export const CustomLayout: Story = {
  name: "7. Custom Layout",
  render: () => (
    <Carousel opts={{ loop: true }}>
      <CarouselContent>
        {slides.slice(0, 4).map((slide, i) => (
          <CarouselItem key={i}>{slide}</CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex items-center gap-4 mt-6">
        <CarouselPrevious className="relative left-0 top-0 translate-y-0" />
        <div className="flex-1">
          <CarouselProgress />
        </div>
        <CarouselNext className="relative right-0 top-0 translate-y-0" />
      </div>
    </Carousel>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Indicators and controls in a custom layout. Arrows and progress in a row.",
      },
    },
  },
}

export const CustomIndicator: Story = {
  name: "8. Custom Indicator with useCarousel",
  render: () => (
    <Carousel opts={{ loop: true }}>
      <CarouselContent>
        {slides.map((slide, i) => (
          <CarouselItem key={i}>{slide}</CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CustomNumberIndicator />
    </Carousel>
  ),
  parameters: {
    docs: {
      description: {
        story: "Create fully custom indicators using the useCarousel hook.",
      },
    },
  },
}

export const Vertical: Story = {
  name: "9. Vertical Carousel",
  render: () => (
    <Carousel
      orientation="vertical"
      opts={{
        loop: true,
        align: "start",
        slidesToScroll: 1,
      }}
      className="h-full"
    >
      <CarouselContent className="h-[300px]">
        {slides.slice(0, 3).map((slide, i) => (
          <CarouselItem key={i} className="md:basis-1/2">
            {slide}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Vertical orientation for special layouts. Arrows adjust automatically.",
      },
    },
  },
}

export const MultipleVisible: Story = {
  name: "10. Multiple Slides Visible",
  render: () => (
    <Carousel opts={{ loop: false, align: "start" }}>
      <CarouselContent>
        {productSlides.map((slide, i) => (
          <CarouselItem
            key={i}
            className="basis-full md:basis-1/2 lg:basis-1/3"
          >
            {slide}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <div className="mt-4">
        <CarouselProgress />
      </div>
    </Carousel>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Show multiple slides at once by adjusting the basis of CarouselItem.",
      },
    },
  },
}

export const CustomProgressColors: Story = {
  name: "11. Custom Progress Colors",
  render: () => (
    <div className="space-y-6">
      {/* Default colors */}
      <div>
        <p className="text-sm font-semibold mb-2">Default (Brand Blue)</p>
        <Carousel opts={{ loop: true }}>
          <CarouselContent>
            {slides.slice(0, 3).map((slide, i) => (
              <CarouselItem key={i}>{slide}</CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-4">
            <CarouselProgress />
          </div>
        </Carousel>
      </div>

      {/* Green variant */}
      <div>
        <p className="text-sm font-semibold mb-2">Green (Success)</p>
        <Carousel opts={{ loop: true }}>
          <CarouselContent>
            {slides.slice(0, 3).map((slide, i) => (
              <CarouselItem key={i}>{slide}</CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-4">
            <CarouselProgress
              trackClassName="bg-green-100"
              fillClassName="bg-green-600"
            />
          </div>
        </Carousel>
      </div>

      {/* Purple variant */}
      <div>
        <p className="text-sm font-semibold mb-2">Purple (Custom)</p>
        <Carousel opts={{ loop: true }}>
          <CarouselContent>
            {slides.slice(0, 3).map((slide, i) => (
              <CarouselItem key={i}>{slide}</CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-4">
            <CarouselProgress
              trackClassName="bg-purple-100"
              fillClassName="bg-purple-600"
            />
          </div>
        </Carousel>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Customize the track (background) and fill (progress) colors of the indicator.",
      },
    },
  },
}
