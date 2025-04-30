import { retrieveCustomer } from "@/lib/data/customer"
import { listProducts } from "@/lib/data/products"
import { redirect } from "next/navigation"
import { listRegions } from "@/lib/data/regions"
import { isEmpty } from "lodash"

import Link from "next/link"
import { Button } from "@/components/atoms"
import { SelectField } from "@/components/molecules"
import { WishlistItem } from "@/components/cells"
import { getUserWishlists } from "@/lib/data/wishlist"

export default async function Wishlist() {
  const user = await retrieveCustomer()
  const region = await listRegions()
  const wishlists = await getUserWishlists()

  const {
    response: { products },
  } = await listProducts({ regionId: region[0].id })

  if (!user) {
    redirect("/user")
  }

  const sortOptions = [
    { label: "Date added", value: "Date added" },
    {
      label: "Last updated",
      value: "Last updated",
    },
  ]

  return (
    <main className="container">
      {isEmpty(products) ? (
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
            <p>{products.length} listings</p>
            <label className="flex items-center gap-2">
              <span className="label-sm">Sort by:</span>
              <SelectField options={sortOptions} className="w-36" />
            </label>
          </div>
          <div className="flex flex-wrap justify-center">
            {products.map((product) => (
              <WishlistItem key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
