import { cn } from "@/lib/utils"

export const Card = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
} & React.ComponentPropsWithoutRef<"div">) => {
  return (
    <div className={cn("border rounded-sm py-4 px-2", className)} {...props}>
      {children}
    </div>
  )
}
