import { retrieveCustomer } from "@/lib/data/customer"
import { redirect } from "next/navigation"
import { isEmpty } from "lodash"
import { Wishlist as WishlistType } from "@/types/wishlist"
import Link from "next/link"
import { Button } from "@/components/atoms"
import { WishlistItem } from "@/components/cells"
import { getUserWishlists } from "@/lib/data/wishlist"
import { HttpTypes } from "@medusajs/types"

export default async function Wishlist() {
  const user = await retrieveCustomer()

  let wishlist: WishlistType[] = []
  if (user) {
    const response = await getUserWishlists()
    wishlist = response.wishlists
  }

  const count = wishlist?.[0]?.products?.length || 0

  if (!user) {
    redirect("/user")
  }

  return (
    <main className="container">
      {isEmpty(wishlist?.[0]?.products) ? (
        <div className="w-96 mx-auto flex flex-col items-center justify-center">
          <h2 className="heading-lg text-primary uppercase mb-2">Wishlist</h2>
          <p className="text-lg text-secondary mb-6">
            Your wishlist is currently empty.
          </p>
          <Link href="/categories" className="w-full">
            <Button className="w-full">Explore</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <h2 className="heading-lg text-primary uppercase">Wishlist</h2>
          <div className="flex justify-between items-center">
            <p>{count} listings</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {wishlist?.[0].products?.map((product) => (
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
        </div>
      )}
    </main>
  )
}
