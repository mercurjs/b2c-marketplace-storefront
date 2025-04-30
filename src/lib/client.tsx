import { liteClient as algoliasearch } from "algoliasearch/lite"

const algoliaId = process.env.NEXT_PUBLIC_ALGOLIA_ID || "supersecret"
const algoliaSearchKey =
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || "supersecret"

export const client = algoliasearch(algoliaId, algoliaSearchKey)
