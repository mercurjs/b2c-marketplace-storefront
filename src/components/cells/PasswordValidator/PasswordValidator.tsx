"use client"

import { Card } from "@/components/atoms"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { CheckCircle } from "@medusajs/icons"

function validatePassword(password: string) {
  const errors = {
    tooShort: password.length < 8,
    noLower: !/[a-z]/.test(password),
    noUpper: !/[A-Z]/.test(password),
    noDigitOrSymbol: !/[0-9!@#$%^&*(),.?":{}|<>_\-+=\[\]\\\/~`]/.test(password),
  }

  return {
    isValid: !Object.values(errors).some(Boolean),
    errors,
  }
}

export const PasswordValidator = ({
  password,
  setError,
}: {
  password: string
  setError: (error: any) => void
}) => {
  const [newPasswordError, setNewPasswordError] = useState({
    isValid: false,
    lower: false,
    upper: false,
    "8chars": false,
    symbolOrDigit: false,
  })

  useEffect(() => {
    const validation = validatePassword(password)

    setError({
      isValid: validation.isValid,
      lower: validation.errors.noLower,
      upper: validation.errors.noUpper,
      "8chars": validation.errors.tooShort,
      symbolOrDigit: validation.errors.noDigitOrSymbol,
    })
    setNewPasswordError({
      isValid: validation.isValid,
      lower: validation.errors.noLower,
      upper: validation.errors.noUpper,
      "8chars": validation.errors.tooShort,
      symbolOrDigit: validation.errors.noDigitOrSymbol,
    })
  }, [password])
  return (
    <Card className="p-4">
      <p
        className={cn(
          "label-md flex items-center gap-2 mb-2",
          newPasswordError["8chars"] ? "text-red-700" : "text-green-700"
        )}
      >
        <CheckCircle /> At least 8 characters
      </p>
      <p
        className={cn(
          "label-md flex items-center gap-2 mb-2",
          newPasswordError["lower"] ? "text-red-700" : "text-green-700"
        )}
      >
        <CheckCircle /> One lowercase letter
      </p>
      <p
        className={cn(
          "label-md flex items-center gap-2 mb-2",
          newPasswordError["upper"] ? "text-red-700" : "text-green-700"
        )}
      >
        <CheckCircle /> One uppercase letter
      </p>
      <p
        className={cn(
          "label-md flex items-center gap-2 mb-2",
          newPasswordError["symbolOrDigit"] ? "text-red-700" : "text-green-700"
        )}
      >
        <CheckCircle /> One number or symbol
      </p>
    </Card>
  )
}
