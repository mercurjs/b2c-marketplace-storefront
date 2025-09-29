"use server"
// import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Grid3X3, Package, ShoppingCart, User } from "lucide-react"
import { Badge } from "@/components/atoms/Badge/Badge"
// import { useState, useEffect } from "react"
import { HttpTypes } from "@medusajs/types"
import { retrieveCart } from "@/lib/data/cart"
import { retrieveCustomer } from "@/lib/data/customer"
import { Wishlist } from "@/types/wishlist"
import { getUserWishlists } from "@/lib/data/wishlist"
import { headers } from "next/headers"

export const Header = async () => {
  // const pathname = usePathname()
  const headersList = await headers()
  const pathname = headersList.get("x-pathname") || headersList.get("referer") // 'x-pathname' is often set by middleware, 'referer' is a fallback.
  const cart = await retrieveCart().catch(() => null)
  const user = await retrieveCustomer()
  let wishlist: Wishlist[] = []
  if (user) {
    const response = await getUserWishlists()
    wishlist = response.wishlists
  }

  const getItemCount = (cart: HttpTypes.StoreCart | null) => {
    return cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0
  }

  const wishlistCount = wishlist?.[0]?.products.length || 0

  const isActive = (path: string) => {
    console.log(path, pathname, path !== "/" && pathname?.endsWith(path))
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname?.endsWith(path)) return true
    return false
  }

  const getTabClassName = (path: string) => {
    const baseClasses =
      "flex flex-col items-center gap-1.5 text-xs font-medium transition-colors"
    const activeClasses = "text-primary bg-primary/10 rounded-lg px-3 py-2"
    const inactiveClasses =
      "text-muted-foreground hover:text-foreground px-3 py-2"

    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`
  }

  return (
    <header className="fixed bottom-0 left-0 right-0 bg-primary border-t shadow-lg z-[100]">
      <nav className="flex items-center justify-around py-3 pb-12 px-4 bg-primary z-[100]">
        <Link href="/categories" className={getTabClassName("/")}>
          <Home size={22} />
          <span>Home</span>
        </Link>

        <Link
          href="/categories/list"
          className={getTabClassName("/categories/list")}
        >
          <Grid3X3 size={22} />
          <span>Categories</span>
        </Link>

        {user && (
          <Link href="/user/orders" className={getTabClassName("/user/orders")}>
            <Package size={22} />
            <span>Orders</span>
          </Link>
        )}

        <Link href="/cart" className={`${getTabClassName("/cart")} relative`}>
          <div className="relative">
            <ShoppingCart size={22} />
            {Boolean(getItemCount(cart)) && (
              <Badge className="absolute -top-2 -right-2 w-4 h-4 p-0 text-xs flex items-center justify-center">
                {getItemCount(cart)}
              </Badge>
            )}
          </div>
          <span>Cart</span>
        </Link>

        <Link
          href={user ? "/user" : "/user"}
          className={getTabClassName(user ? "/user" : "/user")}
        >
          <User size={22} />
          <span>Profile</span>
        </Link>
      </nav>
    </header>
  )
}
