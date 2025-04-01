import { HomeProductsCarousel } from "@/components/organisms"

export const HomeProductSection = async ({
  heading,
  locale = process.env.NEXT_PUBLIC_DEFAULT_REGION || "gb",
}: {
  heading: string
  locale?: string
}) => {
  return (
    <section className="py-8 w-full">
      <h2 className="mb-6 heading-lg font-bold tracking-tight uppercase">
        {heading}
      </h2>

      <HomeProductsCarousel locale={locale} />
    </section>
  )
}
