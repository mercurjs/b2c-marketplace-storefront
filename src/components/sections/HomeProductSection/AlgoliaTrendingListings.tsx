"use client"

import { client } from "@/lib/client"
import { InstantSearch, TrendingItems } from "react-instantsearch"

export const AlgoliaTrendingListings = () => {
  return (
    <InstantSearch searchClient={client} indexName="products" routing>
      <section className="py-8 w-full">
        <h2 className="mb-6 heading-lg font-bold tracking-tight uppercase">
          Trending Listings
        </h2>

        {/* <TrendingItems
          limit={4}
          emptyComponent={() => <div>No recommendation</div>}
        /> */}
      </section>
    </InstantSearch>
  )
}
