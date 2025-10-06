import { Button } from "@/components/atoms"
import { Carousel } from "@/components/cells"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { listCategories } from "@/lib/data/categories"
import { CategoryCard } from "../CategoryCard/CategoryCard"

export const EmptyCart = async () => {
  const { categories } = await listCategories()

  return (
    <div>
      <div className="py-4 h-full w-full md:w-[426px] md:mx-auto flex flex-col items-center justify-center mb-16">
        <h4 className="heading-md uppercase text-center text-primary">
          Shopping cart
        </h4>
        <p className="text-lg text-center py-2">
          Your shopping cart is currently empty.
        </p>
        <LocalizedClientLink href="/categories" className="w-full mt-6">
          <Button className="w-full py-3 md:px-24 uppercase">Explore</Button>
        </LocalizedClientLink>
      </div>
      <Carousel
        items={categories?.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      />
    </div>
  )
}
