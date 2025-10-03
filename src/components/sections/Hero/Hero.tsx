import Image from "next/image"

import tailwindConfig from "../../../../tailwind.config"
import { ArrowRightIcon } from "@/icons"
import Link from "next/link"

type HeroProps = {
  image: string
  heading: string
  paragraph: string
  buttons: { label: string; path: string }[]
}

export const Hero = ({ image, heading, paragraph, buttons }: HeroProps) => {
  return (
    <section className="w-full flex flex-col px-6 py-8 text-primary bg-primary">
      <div className="w-full mb-6">
        <Image
          src={decodeURIComponent(image)}
          width={700}
          height={400}
          alt={`Hero banner - ${heading}`}
          className="w-full rounded-lg shadow-sm"
          priority
          fetchPriority="high"
          quality={75}
          sizes="100vw"
        />
      </div>
      <div className="w-full">
        <div className="w-full px-4 py-6">
          <div>
            <h2 className="font-bold mb-4 text-2xl md:text-3xl leading-tight text-primary">
              {heading}
            </h2>
            <p className="text-md mb-6 text-secondary leading-relaxed">{paragraph}</p>
          </div>
        </div>
        {buttons.length && (
          <div className="flex flex-col gap-3 font-semibold">
            {buttons.map(({ label, path }) => (
              <Link
                key={path}
                href={path}
                className="group flex border border-kiddo-primary rounded-lg h-12 bg-kiddo-accent hover:bg-kiddo-dark text-white transition-all duration-300 px-4 justify-between items-center shadow-sm hover:shadow-md"
                aria-label={label}
                title={label}
              >
                <span className="text-sm font-medium">
                  {label}
                </span>
                <ArrowRightIcon
                  color="white"
                  aria-hidden
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
