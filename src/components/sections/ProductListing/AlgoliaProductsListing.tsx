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
import { FacetFilters } from "algoliasearch/lite"
import { useSearchParams } from "next/navigation"
import { getFacedFilters } from "@/lib/helpers/get-faced-filters"
import { SelectField } from "@/components/molecules"
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams"
import { PRODUCT_LIMIT } from "@/const"
import { ProductListingSkeleton } from "@/components/organisms/ProductListingSkeleton/ProductListingSkeleton"

const selectOptions = [
  { label: "Newest", value: "created_at" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
]

export const AlgoliaProductsListing = ({
  category_id,
}: {
  category_id?: string
}) => {
  const searchParamas = useSearchParams()

  const facetFilters: string = getFacedFilters(searchParamas)
  const page: number = +(searchParamas.get("page") || 1)

  const filters = category_id
    ? `categories.id:${category_id} ${facetFilters}`
    : `${facetFilters.replace("AND", "")}`

  return (
    <InstantSearchNext searchClient={client} indexName="products" routing>
      <Configure
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

  console.log({ items, results })

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
      <div className="grid grid-cols-1 md:grid-cols-4 mt-6">
        <div>
          <AlgoliaProductSidebar />
        </div>
        <div className="w-full col-span-3">
          {!items.length ? (
            <div className="text-center w-full my-10">
              <h2 className="uppercase text-primary heading-lg">no results</h2>
              <p className="mt-4 text-lg">
                Sorry, we can&apos;t find any results for your criteria
              </p>
            </div>
          ) : (
            <div className="w-full">
              <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
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
