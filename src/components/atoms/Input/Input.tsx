"use client"
import { cn } from "@/lib/utils"

import { CloseIcon } from "@/icons"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  icon?: React.ReactNode
  clearable?: boolean
  error?: boolean
  changeValue?: (value: string) => void
}

export function Input({
  icon,
  clearable,
  className,
  error,
  changeValue,
  ...props
}: InputProps) {
  let paddingY = ""
  if (icon) paddingY += "pl-[46px] "
  if (clearable) paddingY += "pr-[38px]"

  const changeHandler = (value: string) => {
    if (changeValue) changeValue(value)
  }

  const clearHandler = () => {
    if (changeValue) changeValue("")
  }

  return (
    <div className="relative">
      {icon && (
        <span className="absolute top-0 left-[16px] h-full flex items-center">
          {icon}
        </span>
      )}

      <input
        className={cn(
          "w-full px-[16px] py-[12px] border rounded-sm bg-component-secondary focus:border-primary focus:outline-none focus:ring-0",
          error && "border-negative focus:border-negative",
          props.disabled && "bg-disabled cursor-not-allowed",
          paddingY,
          className
        )}
        value={props.value}
        onChange={(e) => changeHandler(e.target.value)}
        {...props}
      />
      {clearable && props.value && (
        <span
          className="absolute h-full flex items-center top-0 right-[16px] cursor-pointer"
          onClick={clearHandler}
        >
          <CloseIcon />
        </span>
      )}
    </div>
  )
}
