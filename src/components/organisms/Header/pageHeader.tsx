"use client"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/atoms/Button/Button"

interface PageHeaderProps {
  title: string
  onBack?: () => void
  showBackButton?: boolean
}

export const PageHeader = ({
  title,
  onBack,
  showBackButton = true,
}: PageHeaderProps) => {
  const router = useRouter()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.back()
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b">
      <div className="flex items-center gap-3 px-4 py-3">
        {showBackButton && (
          <Button
            // variant="ghost"
            // size="icon"
            onClick={handleBack}
            className="shrink-0"
          >
            <ArrowLeft size={20} />
            <span className="sr-only">Go back</span>
          </Button>
        )}
        <h1 className="text-lg font-semibold text-foreground truncate">
          {title}
        </h1>
      </div>
    </header>
  )
}
