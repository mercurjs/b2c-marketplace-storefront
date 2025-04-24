import Image from "next/image"
import { Link } from "@/i18n/routing"
import { ArrowRightIcon } from "@/icons"
import { Style } from "@/types/styles"

export const styles: Style[] = [
  {
    id: 1,
    name: "LUXURY",
    href: "#",
  },
  {
    id: 2,
    name: "VINTAGE",
    href: "#",
  },
  {
    id: 3,
    name: "CASUAL",
    href: "#",
  },
  {
    id: 4,
    name: "STREETWEAR",
    href: "#",
  },
  {
    id: 5,
    name: "GORPCORE",
    href: "#",
  },
  {
    id: 6,
    name: "Y2K",
    href: "#",
  },
]

export function ShopByStyleSection() {
  return (
    <section className="bg-primary container">
      <h2 className="heading-lg text-primary mb-12">SHOP BY STYLE</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
        <div className="py-[52px] px-[58px] h-full border rounded-sm">
          {styles.map((style) => (
            <Link
              key={style.id}
              href={style.href}
              className="group flex items-center gap-4 text-primary hover:text-action transition-colors border-b border-transparent hover:border-primary w-fit pb-2 mb-8"
            >
              <span className="heading-lg">{style.name}</span>
              <ArrowRightIcon className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
          ))}
        </div>
        <div className="relative hidden lg:block">
          <Image
            src="/images/shop-by-styles/Image.jpg"
            alt="Models showcasing luxury fashion styles"
            width={700}
            height={600}
            priority
            className="object-cover rounded-sm w-full h-auto"
          />
        </div>
      </div>
    </section>
  )
}
