import { HomeTopSellingProductsCarousel } from "@/components/organisms/HomeProductsCarousel/HomeTopSellingProductsCarousel"

export const HomeTopSellingProductSection = async ({
  locale = process.env.NEXT_PUBLIC_DEFAULT_REGION || "pl",
}: {
  locale?: string
}) => {
  return (
    <section className="py-1 w-full">
      <HomeTopSellingProductsCarousel locale={locale} />
    </section>
  )
}
