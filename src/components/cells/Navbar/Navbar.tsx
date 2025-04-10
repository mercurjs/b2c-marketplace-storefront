import { HttpTypes } from "@medusajs/types"
import { CategoryNavbar, NavbarSearch } from "@/components/molecules"

export const Navbar = ({
  categories,
}: {
  categories: HttpTypes.StoreProductCategory[]
}) => {
  return (
    <div className="flex border py-4 justify-between px-6">
      <div className="hidden md:flex items-center">
        <CategoryNavbar categories={categories} />
      </div>

      <NavbarSearch />
    </div>
  )
}
