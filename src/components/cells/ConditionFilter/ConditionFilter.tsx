"use client"

import { Accordion, FilterCheckboxOption } from "@/components/molecules"
import useFilters from "@/hooks/useFilters"

const filters = [
  { label: "New", amount: 78 },
  { label: "New - With tags", amount: 40 },
  { label: "Used - Excellent", amount: 7 },
  { label: "Used - Good", amount: 16 },
  { label: "Used - Fair", amount: 0 },
]

export const ConditionFilter = () => {
  const { updateFilters, isFilterActive } = useFilters("condition")

  const selectHandler = (option: string) => {
    updateFilters(option)
  }

  return (
    <Accordion heading="Condition">
      <ul className="px-4">
        {filters.map(({ label, amount }) => (
          <li key={label} className="mb-4">
            <FilterCheckboxOption
              checked={isFilterActive(label)}
              disabled={Boolean(!amount)}
              onCheck={selectHandler}
              label={label}
              amount={amount}
            />
          </li>
        ))}
      </ul>
    </Accordion>
  )
}
