"use client"

import { HttpTypes } from "@medusajs/types"
import {
  ProductCard,
  ProductListingActiveFilters,
  ProductSidebar,
} from "@/components/organisms"
import { client } from "@/lib/client"
import { Hit as AlgoliaHit } from "instantsearch.js"
import {
  Hits,
  RefinementList,
  DynamicWidgets,
  Configure,
  Pagination,
  Stats,
} from "react-instantsearch"
import { InstantSearchNext } from "react-instantsearch-nextjs"
import { FacetFilters } from "algoliasearch/lite"
import { useSearchParams } from "next/navigation"
import { getFacedFilters } from "@/lib/helpers/get-faced-filters"
import { SelectField } from "@/components/molecules"
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams"
import { PRODUCT_LIMIT } from "@/const"

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
  let productsCount = 0
  const searchParamas = useSearchParams()
  const updateSearchParams = useUpdateSearchParams()

  const facetFilters: FacetFilters = getFacedFilters(searchParamas)

  const filters = `categories.id:${category_id} ${facetFilters}`

  const selectOptionHandler = (value: string) => {
    updateSearchParams("sortBy", value)
  }

  return (
    <InstantSearchNext searchClient={client} indexName="products" routing>
      <Configure hitsPerPage={PRODUCT_LIMIT} filters={filters} />
      <div className="flex justify-between w-full items-center">
        <Stats
          className="my-4 label-md"
          translations={{
            rootElementText({ nbHits }) {
              productsCount = nbHits
              return `${nbHits} listings`
            },
          }}
        />
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
          {/* <DynamicWidgets fallbackComponent={FallbackComponent} /> */}
          <ProductSidebar />
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
      <Pagination
        showFirst={false}
        showLast={false}
        classNames={{
          root: "flex justify-center items-center mt-4",
          list: "flex gap-2",
          item: "border rounded-sm ",
          link: "w-10 h-10 flex items-center justify-center",
          selectedItem: "border-primary",
          disabledItem: "bg-secondary text-disabled",
        }}
      />
    </InstantSearchNext>
  )
}

// function FallbackComponent({ attribute }: { attribute: string }) {
//   return (
//     <div>
//       <h2>{attribute}</h2>
//       <RefinementList attribute={attribute} />
//     </div>
//   )
// }
