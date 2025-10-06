import { Button } from "@/components/atoms"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import Image from "next/image"

export const BannerSection = () => {
  return (
    <section className="bg-primary px-6 py-8">
      <div className="flex flex-col gap-6 max-w-md mx-auto">
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md">
          <Image
            loading="lazy"
            fetchPriority="high"
            src="/images/banner-section/Image.jpg"
            alt="Boho fashion collection - Model wearing a floral dress with yellow boots"
            width={700}
            height={600}
            className="object-cover object-top w-full h-full"
            sizes="100vw"
          />
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-neutral-100">
          <div className="mb-6">
            <span className="text-xs inline-block px-3 py-1 bg-kiddo-secondary text-kiddo-dark rounded-full font-medium border border-kiddo-primary/20">
              #COLLECTION
            </span>
            <h2 className="text-xl font-bold mt-3 mb-3 text-primary leading-tight">
              BOHO VIBES: WHERE COMFORT MEETS CREATIVITY
            </h2>
            <p className="text-sm text-secondary leading-relaxed">
              Discover boho styles that inspire adventure and embrace the beauty
              of the unconventional.
            </p>
          </div>
          <LocalizedClientLink href="/collections/boho">
            <Button size="large" className="w-full bg-kiddo-accent hover:bg-kiddo-dark text-white font-medium">
              EXPLORE
            </Button>
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}
