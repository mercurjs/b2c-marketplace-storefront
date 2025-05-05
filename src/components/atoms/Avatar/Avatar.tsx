import { cn } from "@/lib/utils"
import Image from "next/image"
import { ProfileIcon } from "@/icons"

interface AvatarProps {
  src?: string
  alt?: string
  initials?: string
  size?: "small" | "large"
  className?: string
}

export function Avatar({
  src,
  alt,
  initials,
  size = "small",
  className,
}: AvatarProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-sm text-primary font-medium border"
  const sizeClasses = {
    small: "w-8 h-8 text-sm",
    large: "w-12 h-12 text-lg !font-semibold",
  }

  if (src) {
    return (
      <Image
        width={150}
        height={150}
        src={src}
        alt={alt || "Avatar"}
        className={cn(
          baseClasses,
          sizeClasses[size],
          "object-cover",
          className
        )}
      />
    )
  }

  return (
    <div className={cn(baseClasses, sizeClasses[size], className)}>
      {initials || <ProfileIcon />}
    </div>
  )
}
