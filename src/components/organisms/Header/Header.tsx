import Image from "next/image"
import { HttpTypes } from "@medusajs/types"

import {
  CartDropdown,
  HeadingCategories,
  MobileNavbar,
  Navbar,
} from "@/components/cells"
import { Link } from "@/i18n/routing"
import { HeartIcon } from "@/icons"
import { listCategories } from "@/lib/data/categories"
import { PARENT_CATEGORIES } from "@/const"
import { retrieveCart } from "@/lib/data/cart"
import { UserDropdown } from "@/components/cells/UserDropdown/UserDropdown"
import { retrieveCustomer } from "@/lib/data/customer"

export const Header = async () => {
  const cart = await retrieveCart().catch(() => null)
  const user = await retrieveCustomer()

  const { categories, parentCategories } = (await listCategories({
    headingCategories: PARENT_CATEGORIES,
  })) as {
    categories: HttpTypes.StoreProductCategory[]
    parentCategories: HttpTypes.StoreProductCategory[]
  }

  return (
    <header>
      <div className="flex py-2 lg:px-8 px-4">
        <div className="flex items-center lg:w-1/3">
          <MobileNavbar
            parentCategories={parentCategories}
            childrenCategories={categories}
          />
          <HeadingCategories categories={parentCategories} />
        </div>
        <div className="flex lg:justify-center lg:w-1/3 items-center pl-4 lg:pl-0">
          <Link href="/" className="text-2xl font-bold">
            <Image
              src="/Logo.svg"
              width={126}
              height={40}
              alt="Logo"
              priority
            />
          </Link>
        </div>
        <div className="flex items-center justify-end gap-2 lg:gap-4 w-full lg:w-1/3 py-2">
          <UserDropdown user={user} />
          <Link href="/user/wishlist">
            <HeartIcon size={20} />
          </Link>
          <CartDropdown cart={cart} />
        </div>
      </div>
      <Navbar categories={categories} />
    </header>
  )
}
