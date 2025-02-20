import { FacetFilters } from "algoliasearch/lite"
import { ReadonlyURLSearchParams } from "next/navigation"

const getOption = (label: string) => {
  switch (label) {
    case "size":
      return "options.title:Size"
    case "color":
      return "options.title:Color"
    case "condition":
      return "options.title:Condition"
    default:
      return ""
  }
}

export const getFacedFilters = (
  filters: ReadonlyURLSearchParams
): FacetFilters => {
  let facet = ""

  let minPrice = null
  let maxPrice = null

  let search = ""

  for (const [key, value] of filters.entries()) {
    if (
      key !== "min_price" &&
      key !== "max_price" &&
      key !== "sale" &&
      key !== "search" &&
      key !== "page" &&
      key !== "products[page]" &&
      key !== "sortBy"
    ) {
      let values = ""
      const splittedSize = value.split(",")
      if (splittedSize.length > 1) {
        splittedSize.map(
          (value, index) =>
            (values += `options.values.value:"${value}" ${
              index + 1 < splittedSize.length ? "OR " : ""
            }`)
        )
      } else {
        values += `options.values.value:"${splittedSize[0]}"`
      }
      facet += ` AND ${getOption(key)} AND ${values}`
    } else {
      if (key === "min_price") minPrice = value
      if (key === "max_price") maxPrice = value

      if (key === "search") search = ` AND products.title:"${value}"`
    }
  }

  const priceFilter =
    minPrice && maxPrice
      ? ` AND variants.prices.amount:${minPrice} TO ${maxPrice}`
      : minPrice
      ? ` AND variants.prices.amount >= ${minPrice}`
      : maxPrice
      ? ` AND variants.prices.amount <= ${maxPrice}`
      : ""

  return facet + priceFilter + search
}
