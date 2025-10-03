"use client"

import { Carousel } from "@/components/cells"
import React from "react"
// Font Awesome Imports
// NOTE: Ensure you have '@fortawesome/react-fontawesome' and '@fortawesome/free-solid-svg-icons' installed
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faMugSaucer, // Proxy for Milk/Dairy (Solid Icon)
  faShirt, // Clothing (Solid Icon)
  faBath, // Bathing (Solid Icon)
  faBaby, // Baby Gear (Solid Icon)
  faSwatchbook, // Accessories (Solid Icon)
  faTshirt, // Tops (Solid Icon)
  faAppleWhole, // Food (Solid Icon)
  faGamepad, // Toys (Solid Icon)
} from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

// Define the core category data
type CategoryData = {
  id: number
  name: string
  handle: string
}

// Map the data structure to include the Font Awesome icon object
export const categories: (CategoryData & { icon: any })[] = [
  // Using Font Awesome Solid icons here
  { id: 1, name: "Milk", handle: "milk", icon: faMugSaucer },
  { id: 2, name: "Clothing", handle: "clothing", icon: faShirt },
  { id: 3, name: "Bathing", handle: "bathing", icon: faBath },
  { id: 4, name: "BabyGear", handle: "baby-gear", icon: faBaby },
  { id: 5, name: "Accessories", handle: "accessories", icon: faSwatchbook },
  { id: 6, name: "Tops", handle: "tops", icon: faTshirt },
  { id: 7, name: "Food", handle: "food", icon: faAppleWhole },
  { id: 8, name: "Toys", handle: "toys", icon: faGamepad },
]

// CategoryCard component
const CategoryCard = ({ category }: { category: (typeof categories)[0] }) => {
  // IconComponent is now the Font Awesome icon object (e.g., faMugSaucer)
  const IconComponent = category.icon

  return (
    <Link href={`/categories/${category.handle}`} className="block">
      <div className="flex flex-col items-center justify-center px-3 py-4 mx-2   hover:shadow-md transition-all duration-200 min-w-[80px]">
        <div className="w-12 h-12 bg-kiddo-secondary/70 rounded-full flex items-center justify-center mb-3 border-2 border-kiddo-primary/20">
          <FontAwesomeIcon
            icon={IconComponent}
            className="w-5 h-5 text-kiddo-dark"
          />
        </div>
        <span className="text-xs font-medium text-center text-primary leading-tight">
          {category.name}
        </span>
      </div>
    </Link>
  )
}

// HomeCategories is a Client Component
export const HomeCategories = ({ heading }: { heading: string }) => {
  return (
    <section className="bg-primary py-6 w-full">
      <div className="mb-4 px-6">
        <h3 className="heading-md text-primary font-semibold">{heading}</h3>
      </div>
      <div className="px-4">
        <Carousel
          items={categories?.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
          showIndicator={false}
        />
      </div>
    </section>
  )
}
