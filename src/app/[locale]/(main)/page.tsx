import {
  BannerSection,
  BlogSection,
  Hero,
  HomeCategories,
  HomePopularBrandsSection,
  HomeProductSection,
  ShopByStyleSection,
} from '@/components/sections';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Welcome to Mercur B2C Demo! Create a modern marketplace that you own and customize in every aspect with high-performance, fully customizable storefront.',
  openGraph: {
    title: 'Mercur B2C Demo - Marketplace Storefront',
    description:
      'Welcome to Mercur B2C Demo! Create a modern marketplace that you own and customize in every aspect with high-performance, fully customizable storefront.',
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: 'Mercur B2C Demo - Marketplace Storefront',
    type: 'website',
    images: [
      {
        url: '/B2C_Storefront_Open_Graph.png',
        width: 1200,
        height: 630,
        alt: 'Mercur B2C Demo - Marketplace Storefront',
      },
    ],
  },
};

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start text-primary'>
      <Hero
        image='/images/hero/Image.jpg'
        heading='Snag your style in a flash'
        paragraph='Buy, sell, and discover pre-loved gems from the trendiest brands.'
        buttons={[
          { label: 'Buy now', path: '#' },
          { label: 'Sell now', path: '#' },
        ]}
      />
      <div className='px-4 lg:px-8 w-full'>
        <HomeProductSection
          heading='trending listings'
          locale={locale}
        />
      </div>
      <HomePopularBrandsSection />
      <div className='px-4 lg:px-8 w-full'>
        <HomeCategories heading='SHOP BY CATEGORY' />
      </div>
      <BannerSection />
      <ShopByStyleSection />
      <BlogSection />
    </main>
  );
}
