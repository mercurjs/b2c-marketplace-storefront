import Image from "next/image"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { BlogPost } from "@/types/blog"
import { ArrowRightIcon } from "@/icons"
import tailwindConfig from "../../../../tailwind.config"
import { cn } from "@/lib/utils"

interface BlogCardProps {
  post: BlogPost
  index: number
}

export function BlogCard({ post, index }: BlogCardProps) {
  return (
    <LocalizedClientLink
      href={post.href}
      className="group block bg-white rounded-lg shadow-sm border border-neutral-100 overflow-hidden hover:shadow-md transition-all duration-200"
    >
      <div className="relative overflow-hidden h-48">
        <Image
          loading="lazy"
          sizes="100vw"
          src={decodeURIComponent(post.image)}
          alt={post.title}
          width={467}
          height={192}
          className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute top-3 left-3">
          <span className="text-xs inline-block px-2 py-1 bg-kiddo-secondary text-kiddo-dark rounded-full font-medium border border-kiddo-primary/20">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-md font-semibold mb-2 text-primary leading-tight">{post.title}</h3>
        <p className="text-sm text-secondary line-clamp-2 mb-3 leading-relaxed">{post.excerpt}</p>
        <div className="flex items-center gap-2 text-kiddo-accent text-sm font-medium">
          Read more
          <ArrowRightIcon
            size={16}
            color="currentColor"
          />
        </div>
      </div>
    </LocalizedClientLink>
  )
}
