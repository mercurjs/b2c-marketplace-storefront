"use client"

import { Chip, Input } from "@/components/atoms"
import { Accordion, FilterCheckboxOption } from "@/components/molecules"
import useFilters from "@/hooks/useFilters"
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams"
import { DollarIcon } from "@/icons"
import { cn } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { useRefinementList } from "react-instantsearch"

export const AlgoliaProductSidebar = () => {
  return (
    <div>
      <PriceFilter />
      <SizeFilter />
      <ColorFilter />
      <ConditionFilter />
    </div>
  )
}

function ConditionFilter() {
  const { items } = useRefinementList({
    attribute: "variants.condition",
    limit: 100,
    operator: "or",
  })
  const { updateFilters, isFilterActive } = useFilters("condition")

  const selectHandler = (option: string) => {
    updateFilters(option)
  }
  return (
    <Accordion heading="Condition" defaultOpen={false}>
      <ul className="px-4">
        {items.map(({ label, count }) => (
          <li key={label} className="mb-4">
            <FilterCheckboxOption
              checked={isFilterActive(label)}
              disabled={Boolean(!count)}
              onCheck={selectHandler}
              label={label}
              amount={count}
            />
          </li>
        ))}
      </ul>
    </Accordion>
  )
}

function ColorFilter() {
  const { items } = useRefinementList({
    attribute: "variants.color",
    limit: 100,
    operator: "and",
    escapeFacetValues: false,
    sortBy: ["isRefined", "count", "name"],
  })
  const { updateFilters, isFilterActive } = useFilters("color")

  const selectHandler = (option: string) => {
    updateFilters(option)
  }
  return (
    <Accordion heading="Color" defaultOpen={false}>
      <ul className="px-4">
        {items.map(({ label, count }) => (
          <li key={label} className="mb-4 flex items-center justify-between">
            <FilterCheckboxOption
              checked={isFilterActive(label)}
              disabled={Boolean(!count)}
              onCheck={selectHandler}
              label={label}
              amount={count}
            />
            <div
              style={{ backgroundColor: label.toLowerCase() }}
              className={cn(
                "w-5 h-5 border border-primary rounded-xs",
                Boolean(!label) && "opacity-30"
              )}
            />
          </li>
        ))}
      </ul>
    </Accordion>
  )
}

function SizeFilter() {
  const { items } = useRefinementList({
    attribute: "variants.size",
    limit: 100,
    operator: "or",
  })
  const { updateFilters, isFilterActive } = useFilters("size")

  const selectSizeHandler = (size: string) => {
    updateFilters(size)
  }

  return (
    <Accordion heading="Size" defaultOpen={false}>
      <ul className="grid grid-cols-4 mt-2 gap-2">
        {items.map(({ label }) => (
          <li key={label} className="mb-4">
            <Chip
              selected={isFilterActive(label)}
              onSelect={() => selectSizeHandler(label)}
              value={label}
              className="w-full !justify-center !py-2 !font-normal"
            />
          </li>
        ))}
      </ul>
    </Accordion>
  )
}

function PriceFilter() {
  const [min, setMin] = useState("")
  const [max, setMax] = useState("")

  const updateSearchParams = useUpdateSearchParams()
  const searchParams = useSearchParams()

  useEffect(() => {
    setMin(searchParams.get("min_price") || "")
    setMax(searchParams.get("max_price") || "")
  }, [searchParams])

  const priceChangeHandler = (field: string, value: string) => {
    const reg = new RegExp("^[0-9]+$")
    if (reg.test(value)) {
      if (field === "min") setMin(value)
      if (field === "max") setMax(value)
    }
  }

  const updateMinPriceHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateSearchParams("min_price", min)
  }

  const updateMaxPriceHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateSearchParams("max_price", max)
  }
  return (
    <Accordion heading="Price">
      <div className="flex gap-2 mb-4">
        <form method="POST" onSubmit={updateMinPriceHandler}>
          <Input
            placeholder="Min"
            icon={<DollarIcon size={16} />}
            onChange={(e) => priceChangeHandler("min", e.target.value)}
            value={min}
          />
          <input type="submit" className="hidden" />
        </form>
        <form method="POST" onSubmit={updateMaxPriceHandler}>
          <Input
            placeholder="Max"
            icon={<DollarIcon size={16} />}
            onChange={(e) => priceChangeHandler("max", e.target.value)}
            value={max}
          />
          <input type="submit" className="hidden" />
        </form>
      </div>
    </Accordion>
  )
}
