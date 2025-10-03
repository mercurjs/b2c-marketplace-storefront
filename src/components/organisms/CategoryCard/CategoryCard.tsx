import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import Image from "next/image"

export function CategoryCard({
  category,
}: {
  category: { id: number; name: string; handle: string }
}) {
  return (
    <LocalizedClientLink
      href={`/categories/${category.handle}`}
      className="relative flex flex-col items-center border border-kiddo-primary/20 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200 w-[233px] aspect-square p-4"
    >
      <div className="flex relative aspect-square overflow-hidden w-[200px] bg-kiddo-secondary rounded-full p-2">
        <Image
          loading="lazy"
          src={`/images/categories/${category.handle}.png`}
          alt={`category - ${category.name}`}
          width={200}
          height={200}
          sizes="(min-width: 1024px) 200px, 40vw"
          className="object-contain scale-90 rounded-full"
        />
      </div>
      <h3 className="w-full text-center label-lg text-kiddo-dark font-semibold mt-3">
        {category.name}
      </h3>
    </LocalizedClientLink>
  )
}
