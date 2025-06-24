export const getImageUrl = (image: string) => {
  const res = image
    .replace(
      "http://localhost:9000",
      process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || ""
    )
    .replace(
      "https://localhost:9000",
      process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || ""
    )
  return res
}
