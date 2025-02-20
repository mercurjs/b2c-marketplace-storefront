export interface Product {
  id: number
  brand: string
  title: string
  size: string
  price: number
  originalPrice: number
  thumbnail: string
  created_at: string
  sold?: boolean
}

export type SortOptions = "price_asc" | "price_desc" | "created_at"

export interface SingleProductImage {
  id: string
  url: string
  alt: string
}

export interface SingleProductReview {
  id: string
  rating: number
  username: string
  date: string
  text: string
  image: string
}

export interface SingleProductSeller {
  id: string
  name: string
  avatar: string
  rating: number
  reviewCount: number
  verified: boolean
  page: string
  joinDate: string
  sold: number
  description: string
  reviews?: SingleProductReview[]
  parcel?: string
  date?: string
}

export interface SingleProductMeasurement {
  label: string
  inches: string
  cm: string
}

export interface SingleProduct {
  id: string
  brand: string
  name: string
  price: number
  originalPrice: number
  color: string
  colorVariants?: {
    variant: string
    label: string
    disabled: boolean
  }[]
  size: string
  sizeVariants?: { label: string; disabled: boolean }[]
  condition: string
  images: SingleProductImage[]
  details: string
  measurements: SingleProductMeasurement[]
  shippingReturns: string
  seller: SingleProductSeller
  reviews: SingleProductReview[]
  tags: string[]
  postedDate: string
}
