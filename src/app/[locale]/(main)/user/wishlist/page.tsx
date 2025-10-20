"use client"
import { retrieveCustomer } from "@/lib/data/customer"
import { redirect } from "next/navigation"
import { isEmpty } from "lodash"
import { Wishlist as WishlistType } from "@/types/wishlist"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { Button } from "@/components/atoms"
import { WishlistItem } from "@/components/cells"
import { getUserWishlists } from "@/lib/data/wishlist"
import { HttpTypes } from "@medusajs/types"
import { SelectField, UserNavigation } from "@/components/molecules"
import { ProductsPagination } from "@/components/organisms"
import { useEffect, useState } from "react"
import { usePagination } from "@/hooks/usePagination"

const ITEMS_PER_PAGE = 10

const sortOptions = [
  { label: "Newest", value: "created_at" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
]

export default function Wishlist() {
  const [user, setUser] = useState<any>(null)
  const [wishlist, setWishlist] = useState<WishlistType[]>([])
  const [sortBy, setSortBy] = useState("created_at")
  const [loading, setLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const { currentPage, setPage } = usePagination()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const userData = await retrieveCustomer()

      if (!userData) {
        redirect("/user")
      }

      setUser(userData)

      const response = await getUserWishlists()
      setWishlist(response.wishlists)
      setTotalCount(response.count)
      setLoading(false)
    }

    fetchData()
  }, [])

  const sortProducts = (products: any[]) => {
    if (!products) return []

    return [...products].sort((a, b) => {
      if (sortBy === "created_at") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      } else if (sortBy === "price_asc") {
        return a.calculated_amount - b.calculated_amount
      } else if (sortBy === "price_desc") {
        return b.calculated_amount - a.calculated_amount
      }
      return 0
    })
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
    // Reset to first page when sort order changes
    if (currentPage !== 1) {
      setPage('1')
    }
  }

  if (loading) {
    return <div className="container">Loading...</div>
  }

  // Get all products from the wishlist
  const allProducts = wishlist?.[0]?.products || []
  const count = allProducts.length || 0

  // Sort all products based on the current sort order
  const sortedAllProducts = sortProducts(allProducts)

  // Calculate total pages based on the total count of products
  const totalPages = Math.ceil(count / ITEMS_PER_PAGE) || 1

  // Paginate the sorted products on the client side
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const sortedProducts = sortedAllProducts.slice(startIndex, endIndex)

  return (
    <main className="container">
      <div className="grid grid-cols-1 md:grid-cols-4 mt-6 gap-5 md:gap-8">
        <UserNavigation />
        <div className="md:col-span-3 space-y-8">
          {isEmpty(wishlist?.[0]?.products) ? (
            <div className="w-96 mx-auto flex flex-col items-center justify-center">
              <h2 className="heading-lg text-primary uppercase mb-2">
                Wishlist
              </h2>
              <p className="text-lg text-secondary mb-6">
                Your wishlist is currently empty.
              </p>
              <LocalizedClientLink href="/categories" className="w-full">
                <Button className="w-full">Explore</Button>
              </LocalizedClientLink>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <h2 className="heading-lg text-primary uppercase">Wishlist</h2>
              <div className="flex justify-between items-center">
                <p>{count} listings (showing {sortedProducts.length} on this page)</p>
                <div className="flex gap-2 items-center">
                  Sort by:{' '}
                  <SelectField
                    className="min-w-[200px]"
                    options={sortOptions}
                    selected={sortBy}
                    selectOption={handleSortChange}
                  />
                </div>
              </div>
              <div className="flex flex-wrap max-md:justify-center gap-4">
                {sortedProducts.map((product) => (
                  <WishlistItem
                    key={product.id}
                    product={
                      product as HttpTypes.StoreProduct & {
                        calculated_amount: number
                        currency_code: string
                      }
                    }
                    wishlist={wishlist}
                    user={user}
                  />
                ))}
              </div>
              <ProductsPagination pages={totalPages} />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
