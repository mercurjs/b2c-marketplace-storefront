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
      <div className="flex flex-col items-center space-y-1 p-2">
        <div className="w-14 h-14 bg-green-200 rounded-full flex items-center justify-center">
          {/* FIX: Renders the Font Awesome solid icon */}
          <FontAwesomeIcon
            icon={IconComponent} // Pass the icon object
            className="w-6 h-6 text-primary-300" // Sets size and color
          />
        </div>
        <span className="text-md font-medium text-center text-foreground pt-2">
          {category.name}
        </span>
      </div>
    </Link>
  )
}

// HomeCategories is a Client Component
export const HomeCategories = ({ heading }: { heading: string }) => {
  return (
    <section className="bg-background py-4 w-full">
      <div className="mb-2 px-4 lg:px-8">
        <h3 className="heading-md text-foreground pb-2">{heading}</h3>
      </div>
      <Carousel
        // The items prop receives an array of rendered React elements, which is safe
        items={categories?.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
        showIndicator={false}
      />
    </section>
  )
}
