import Image from "next/image"

export const SellerAvatar = ({
  photo = "",
  size = 32,
  alt = "",
}: {
  photo?: string
  size?: number
  alt?: string
}) => {
  return photo ? (
    <Image
      src={decodeURIComponent(photo)}
      alt={alt}
      width={size}
      height={size}
      style={{ width: size, height: size }}
    />
  ) : (
    <Image
      src="/images/placeholder.svg"
      alt={alt}
      className="opacity-30 w-8 h-8"
      width={32}
      height={32}
    />
  )
}
