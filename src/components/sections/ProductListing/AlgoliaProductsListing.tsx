"use client"

import {
  AlgoliaProductSidebar,
  ProductCard,
  ProductListingActiveFilters,
  ProductsPagination,
} from "@/components/organisms"
import { client } from "@/lib/client"
import { Configure, useHits } from "react-instantsearch"
import { InstantSearchNext } from "react-instantsearch-nextjs"
import { useSearchParams } from "next/navigation"
import { getFacedFilters } from "@/lib/helpers/get-faced-filters"
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams"
import { PRODUCT_LIMIT } from "@/const"
import { ProductListingSkeleton } from "@/components/organisms/ProductListingSkeleton/ProductListingSkeleton"

export const AlgoliaProductsListing = ({
  category_id,
  collection_id,
  seller_handle,
  locale = process.env.NEXT_PUBLIC_DEFAULT_REGION,
}: {
  category_id?: string
  collection_id?: string
  locale?: string
  seller_handle?: string
}) => {
  const searchParamas = useSearchParams()

  const facetFilters: string = getFacedFilters(searchParamas)
  const page: number = +(searchParamas.get("page") || 1)
  const query: string = searchParamas.get("query") || ""

  const filters = `${
    seller_handle
      ? `NOT seller:null AND seller.handle:${seller_handle} AND `
      : "NOT seller:null AND "
  }supported_countries:${locale}${
    category_id
      ? ` AND categories.id:${category_id}${
          collection_id !== undefined
            ? ` AND collections.id:${collection_id}`
            : ""
        } ${facetFilters}`
      : ` ${facetFilters}`
  }`

  return (
    <InstantSearchNext searchClient={client} indexName="products">
      <Configure
        query={query}
        hitsPerPage={PRODUCT_LIMIT}
        filters={filters}
        page={page - 1}
      />
      <ProductsListing />
    </InstantSearchNext>
  )
}

const ProductsListing = () => {
  const {
    items,
    results,
    // sendEvent,
  } = useHits()
  const updateSearchParams = useUpdateSearchParams()

  const selectOptionHandler = (value: string) => {
    updateSearchParams("sortBy", value)
  }

  if (!results?.processingTimeMS) return <ProductListingSkeleton />

  return (
    <>
      <div className="flex justify-between w-full items-center">
        <div className="my-4 label-md">{`${results?.nbHits} listings`}</div>
        {/* <div className="hidden md:flex gap-2 items-center">
          Sort by:{" "}
          <SelectField
            className="min-w-[200px]"
            options={selectOptions}
            selectOption={selectOptionHandler}
          />
        </div> TODO: Fix sorting with Algolia */}
      </div>
      <div className="hidden md:block">
        <ProductListingActiveFilters />
      </div>
      <div className="md:flex gap-4">
        <div>
          <AlgoliaProductSidebar />
        </div>
        <div className="w-full">
          {!items.length ? (
            <div className="text-center w-full my-10">
              <h2 className="uppercase text-primary heading-lg">no results</h2>
              <p className="mt-4 text-lg">
                Sorry, we can&apos;t find any results for your criteria
              </p>
            </div>
          ) : (
            <div className="w-full">
              <ul className="flex flex-wrap gap-4">
                {items.map((hit) => (
                  <ProductCard key={hit.objectID} product={hit} />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <ProductsPagination pages={results?.nbPages || 1} />
    </>
  )
}
