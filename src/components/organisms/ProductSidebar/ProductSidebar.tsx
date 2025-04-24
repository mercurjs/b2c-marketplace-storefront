"use client"
import { Button } from "@/components/atoms"
import {
  ColorFilter,
  ConditionFilter,
  PriceFilter,
  SizeFilter,
} from "@/components/cells"
import { CloseIcon } from "@/icons"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { ProductListingActiveFilters } from "../ProductListingActiveFilters/ProductListingActiveFilters"

import useFilters from "@/hooks/useFilters"

export const ProductSidebar = () => {
  const [filterModal, setFilterModal] = useState(false)
  const { clearAllFilters } = useFilters("")

  return (
    <aside className="w-full relative">
      <div
        className={cn(
          "blur-sm pointer-events-none md:relative w-full h-full bg-primary top-0 left-0 transition-opacity duration-100",
          filterModal
            ? "opacity-1 z-20"
            : "opacity-0 -z-10 md:opacity-100 md:z-10"
        )}
      >
        {filterModal && (
          <div className="md:hidden">
            <div className="p-4 border-y flex items-center justify-between mb-4">
              <h3 className="uppercase heading-md">Filters</h3>
              <div
                onClick={() => setFilterModal(false)}
                className="cursor-pointer"
              >
                <CloseIcon size={20} />
              </div>
            </div>
            <div className="px-2 mb-4 md:mb-0">
              <ProductListingActiveFilters />
            </div>
          </div>
        )}

        <div className="px-2 md:px-0 overflow-y-scroll md:overflow-y-auto h-[calc(100vh-200px)] md:h-full no-scrollbar">
          <PriceFilter />
          <SizeFilter />
          <ColorFilter />
          <ConditionFilter />
        </div>
        <div className="bg-primary md:hidden absolute bottom-0 left-0 w-full px-4 flex items-center py-4 border-y gap-2">
          <Button
            className="w-1/2 uppercase label-sm"
            variant="tonal"
            onClick={() => clearAllFilters()}
          >
            Clear all
          </Button>
          <Button
            className="w-1/2 uppercase label-sm"
            onClick={() => setFilterModal(false)}
          >
            View 222 listings
          </Button>
        </div>
      </div>
      <div className="absolute z-10 bg-primary p-8 w-full top-4 heading-md text-center rounded-lg shadow-md">
        Set your Algolia ID and configure filters to enable product filtering
      </div>
    </aside>
  )
}
