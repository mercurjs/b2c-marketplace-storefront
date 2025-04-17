"use client"
import { Card, Divider, LogoutButton, NavigationItem } from "@/components/atoms"
import { usePathname } from "next/navigation"

const navigationItems = [
  {
    label: "Orders",
    href: "/user/orders",
  },
  {
    label: "Addresses",
    href: "/user/addresses",
  },
]

export const UserNavigation = () => {
  const path = usePathname()

  return (
    <Card className="h-min">
      {navigationItems.map((item) => (
        <NavigationItem
          key={item.label}
          href={item.href}
          active={path === item.href}
        >
          {item.label}
        </NavigationItem>
      ))}
      <Divider className="my-2" />
      <LogoutButton className="w-full text-left" />
    </Card>
  )
}
