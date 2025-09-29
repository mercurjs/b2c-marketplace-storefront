import { HomeOnSaleProductsCarousel } from "@/components/organisms/HomeProductsCarousel/HomeDiscountedProductsCarousel"

export const HomeDiscountedProductSection = async ({
  locale = process.env.NEXT_PUBLIC_DEFAULT_REGION || "pl",
}: {
  locale?: string
}) => {
  return (
    <section className="py-1 w-full">
      <HomeOnSaleProductsCarousel locale={locale} />
    </section>
  )
}
