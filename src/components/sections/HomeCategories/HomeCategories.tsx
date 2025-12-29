import { Carousel } from "@/components/cells"
import { CategoryCard } from "@/components/organisms"

export const categories: { id: number; name: string; handle: string }[] = [
  {
    id: 1,
    name: "Seats",
    handle: "seats",
  },
  {
    id: 2,
    name: "Sofas",
    handle: "sofas",
  },
  {
    id: 3,
    name: "Beds",
    handle: "beds",
  },
  {
    id: 4,
    name: "Tables",
    handle: "tables",
  },
  {
    id: 5,
    name: "Chairs",
    handle: "chairs",
  },
  {
    id: 6,
    name: "Kitchen",
    handle: "kitchen",
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
