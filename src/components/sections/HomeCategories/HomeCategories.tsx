import { Carousel } from "@/components/cells"
import { CategoryCard } from "@/components/organisms"

export const categories: { id: number; name: string; handle: string }[] = [
  {
    id: 1,
    name: "Sofas",
    handle: "sofa",
  },
  {
    id: 2,
    name: "Seats",
    handle: "seat",
  },
  {
    id: 3,
    name: "Beds",
    handle: "bed",
  },
  {
    id: 4,
    name: "Wardrobes",
    handle: "wardrobe",
  },
  {
    id: 5,
    name: "Tables",
    handle: "table",
  },
  {
    id: 6,
    name: "Chairs",
    handle: "chair",
  },
]

export const HomeCategories = async ({ heading }: { heading: string }) => {
  return (
    <section className="bg-primary py-8 w-full">
      <div className="mb-6">
        <h2 className="heading-lg text-primary uppercase">{heading}</h2>
      </div>
      <Carousel
        items={categories?.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      />
    </section>
  )
}
