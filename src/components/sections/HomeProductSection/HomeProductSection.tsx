import { HomeProductsCarousel } from "@/components/organisms"
import { AlgoliaProductsCarousel } from "@/components/organisms/HomeProductsCarousel/AlgoliaProductsCarousel"
import { Product } from "@/types/product"

const ALGOLIA_ID = process.env.NEXT_PUBLIC_ALGOLIA_ID
const ALGOLIA_SEARCH_KEY = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY

export const HomeProductSection = async ({
  heading,
  locale = process.env.NEXT_PUBLIC_DEFAULT_REGION || "pl",
  products = [],
  home = false,
}: {
  heading: string
  locale?: string
  products?: Product[]
  home?: boolean
}) => {
  return (
    <section className="py-8 w-full">
      <h2 className="mb-6 heading-lg font-bold tracking-tight uppercase">
        {heading}
      </h2>
      {!ALGOLIA_ID || !ALGOLIA_SEARCH_KEY ? (
        <HomeProductsCarousel
          locale={locale}
          sellerProducts={products.slice(0, 4)}
          home={home}
        />
      ) : (
        <AlgoliaProductsCarousel locale={locale} />
      )}
    </section>
  )
}
