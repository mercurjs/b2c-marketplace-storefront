import { StarIcon } from "@/icons"
import tailwindConfig from "../../../../tailwind.config"

export const StarRating = ({
  rate,
  starSize = 20,
  disabled,
}: {
  rate: number
  starSize?: number
  disabled?: boolean
}) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => {
        const starColor =
          i < Math.floor(rate)
            ? disabled
              ? tailwindConfig.theme.extend.colors.disabled
              : tailwindConfig.theme.extend.colors.primary
            : tailwindConfig.theme.extend.colors.action.on.primary
        return <StarIcon size={starSize} key={i} color={starColor} />
      })}
    </div>
  )
}
