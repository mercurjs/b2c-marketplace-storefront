import { HomeProductsCarousel } from "@/components/organisms"
import { Product } from "@/types/product"

export const HomeProductSection = async ({
  // heading,
  locale = process.env.NEXT_PUBLIC_DEFAULT_REGION || "pl",
  products = [],
  home = false,
}: {
  // heading: string
  locale?: string
  products?: Product[]
  home?: boolean
}) => {
  return (
    <section className="py-1 w-full">
      <HomeProductsCarousel
        locale={locale}
        sellerProducts={products.slice(0, 4)}
        home={home}
      />
    </section>
  )
}
