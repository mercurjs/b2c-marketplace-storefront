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
    <Image src={photo} alt={alt} width={size} height={size} />
  ) : (
    <Image
      src="/images/placeholder.svg"
      alt={alt}
      className="opacity-30"
      width={32}
      height={32}
    />
  )
}
