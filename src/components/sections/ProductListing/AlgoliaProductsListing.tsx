"use client"

import { HttpTypes } from "@medusajs/types"
import {
  AlgoliaProductSidebar,
  ProductCard,
  ProductListingActiveFilters,
  ProductsPagination,
} from "@/components/organisms"
import { client } from "@/lib/client"
import { Hit as AlgoliaHit } from "instantsearch.js"
import { Hits, Configure, useStats } from "react-instantsearch"
import { InstantSearchNext } from "react-instantsearch-nextjs"
import { FacetFilters } from "algoliasearch/lite"
import { useSearchParams } from "next/navigation"
import { getFacedFilters } from "@/lib/helpers/get-faced-filters"
import { SelectField } from "@/components/molecules"
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams"
import { PRODUCT_LIMIT } from "@/const"
import { useEffect, useState } from "react"

type HitProps = {
  hit: AlgoliaHit<HttpTypes.StoreProduct>
}

const selectOptions = [
  { label: "Newest", value: "created_at" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
]

export const AlgoliaProductsListing = ({
  category_id,
}: {
  category_id: string
}) => {
  const [pagesCount, setPagesCount] = useState(1)
  const searchParamas = useSearchParams()
  const updateSearchParams = useUpdateSearchParams()

  const facetFilters: FacetFilters = getFacedFilters(searchParamas)
  const page: number = +(searchParamas.get("page") || 1)

  const filters = `categories.id:${category_id} ${facetFilters}`

  const selectOptionHandler = (value: string) => {
    updateSearchParams("sortBy", value)
  }

  const ListingCount = () => {
    const { nbHits } = useStats()

    useEffect(() => {
      setPagesCount(Math.ceil(nbHits / PRODUCT_LIMIT))
    }, [nbHits])

    return <div className="my-4 label-md">{`${nbHits} listings`}</div>
  }

  return (
    <InstantSearchNext searchClient={client} indexName="products" routing>
      <Configure
        hitsPerPage={PRODUCT_LIMIT}
        filters={filters}
        page={page - 1}
      />
      <div className="flex justify-between w-full items-center">
        <ListingCount />
        <div className="hidden md:flex gap-2 items-center">
          Sort by:{" "}
          <SelectField
            className="min-w-[200px]"
            options={selectOptions}
            selectOption={selectOptionHandler}
          />
        </div>
      </div>

      <div className="hidden md:block">
        <ProductListingActiveFilters />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 mt-6">
        <div>
          <AlgoliaProductSidebar />
        </div>
        <div className="w-full col-span-3">
          <Hits
            hitComponent={({ hit }: HitProps) => <ProductCard product={hit} />}
            escapeHTML={false}
            classNames={{
              root: "w-full",
              list: "grid grid-cols-3 w-full",
            }}
          />
        </div>
      </div>
      <ProductsPagination pages={pagesCount} />
    </InstantSearchNext>
  )
}
