import {
  AlgoliaTrendingListings,
  BannerSection,
  BlogSection,
  Hero,
  HomeCategories,
  HomePopularBrandsSection,
  HomeProductSection,
  ShopByStyleSection,
} from "@/components/sections"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home",
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start text-primary">
      <Hero
        image="/images/hero/Image.jpg"
        heading="Snag your style in a flash"
        paragraph="Buy, sell, and discover pre-loved gems from the trendiest brands."
        buttons={[
          { label: "Buy now", path: "#" },
          { label: "Sell now", path: "#" },
        ]}
      />
      <div className="px-4 lg:px-8 w-full">
        <HomeProductSection heading="trending listings" locale={locale} />
        {/* <AlgoliaTrendingListings /> */}
      </div>
      <HomePopularBrandsSection />
      <div className="px-4 lg:px-8 w-full">
        <HomeCategories heading="SHOP BY CATEGORY" />
      </div>
      <BannerSection />
      <ShopByStyleSection />
      <BlogSection />
    </main>
  )
}
