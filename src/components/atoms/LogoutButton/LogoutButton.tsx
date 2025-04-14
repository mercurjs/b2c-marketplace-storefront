"use client"
import { signout } from "@/lib/data/customer"
import { cn } from "@/lib/utils"

type LogoutButtonProps = {
  unstyled?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  unstyled,
  className,
  children,
}) => {
  const handleLogout = async () => {
    await signout()
  }

  return (
    <button
      onClick={handleLogout}
      className={cn(
        !unstyled && "label-md uppercase px-4 py-3 my-3 md:my-0",
        className
      )}
    >
      {children || "Logout"}
    </button>
  )
}
