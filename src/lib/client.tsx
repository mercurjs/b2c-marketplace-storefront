import { liteClient as algoliasearch } from "algoliasearch/lite"

export const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_ID || "",
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || ""
)
