"use client"

import type { HttpTypes } from "@medusajs/types"
import { Carousel, CarouselContent, CarouselItem } from "@/components/cells"
import { client } from "@/lib/client"
import { Configure, useHits } from "react-instantsearch"
import { InstantSearchNext } from "react-instantsearch-nextjs"
import { ProductCard } from "../ProductCard/ProductCard"
import { listProducts } from "@/lib/data/products"
import { useEffect, useMemo, useState } from "react"
import { getProductPrice } from "@/lib/helpers/get-product-price"

// Shape of your Algolia hit. Extend with what ProductCard needs.
type ProductHit = {
  objectID: string // product id
  handle?: string // include this in your index if possible
  // ...other fields used by <ProductCard product={hit} />
}

export const AlgoliaProductsCarousel = ({
  locale,
  seller_handle,
  currency_code,
}: {
  locale: string
  seller_handle?: string
  currency_code: string
}) => {
  // Build Algolia filters once per relevant prop change
  const filters = useMemo(() => {
    const parts = [
      "NOT seller:null",
      "NOT seller.store_status:SUSPENDED",
      `supported_countries:${locale}`,
      `variants.prices.currency_code:${currency_code}`,
    ]
    if (seller_handle) parts.splice(1, 0, `seller.handle:${seller_handle}`)
    return parts.join(" AND ")
  }, [locale, seller_handle, currency_code])

  return (
    <InstantSearchNext searchClient={client} indexName="products">
      <Configure hitsPerPage={4} filters={filters} />
      <ProductsListing locale={locale} />
    </InstantSearchNext>
  )
}

const ProductsListing = ({ locale }: { locale: string }) => {
  const { items } = useHits<ProductHit>()
  const [apiById, setApiById] = useState<Map<string, HttpTypes.StoreProduct>>(
    new Map()
  )

  // Stable list of unique ids and handles so the effect only runs when hits actually change
  const ids = useMemo(
    () => Array.from(new Set(items.map((i) => i.objectID))),
    [items]
  )
  const handles = useMemo(
    () =>
      Array.from(
        new Set(items.map((i) => i.handle).filter(Boolean))
      ) as string[],
    [items]
  )

  useEffect(() => {
    let cancelled = false

    // No hits, clear and exit
    if (ids.length === 0) {
      setApiById(new Map())
      return () => {
        cancelled = true
      }
    }

    // Fetch only the products we’re about to render.
    listProducts({
      countryCode: locale,
      queryParams: {
        limit: handles.length || ids.length,
        handle: handles.length ? handles : undefined,
        // Id filtering?
        fields:
          "*variants.calculated_price,*seller.reviews,-thumbnail,-images,-type,-tags,-variants.options,-options,-collection,-collection_id",
      },
    })
      .then(({ response }) => {
        if (cancelled) return
        const map = new Map<string, HttpTypes.StoreProduct>()
        for (const p of response.products ?? []) {
          const { cheapestPrice } = getProductPrice({ product: p })
          if (cheapestPrice) map.set(p.id, p)
        }
        setApiById(map)
      })
      .catch(() => {
        if (!cancelled) setApiById(new Map())
      })

    return () => {
      cancelled = true
    }
  }, [locale, ids, handles])

  return (
    <>
      <div className="flex justify-between items-center w-full mb-4"></div>
      <div className="w-full">
        {items.length === 0 ? (
          <div className="text-center w-full my-10">
            <h2 className="uppercase text-primary heading-lg">no results</h2>
            <p className="mt-4 text-lg">
              Sorry, we can&apos;t find any results for your criteria
            </p>
          </div>
        ) : (
          <Carousel opts={{ align: "start" }}>
            <CarouselContent>
              {items.map((hit) => (
                <CarouselItem
                  key={hit.objectID}
                  className="basis-full md:basis-1/2 lg:basis-1/4"
                >
                  <ProductCard
                    product={hit}
                    api_product={apiById.get(hit.objectID)}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>
    </>
  )
}
