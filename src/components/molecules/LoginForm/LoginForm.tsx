"use client"
import {
  FieldError,
  FieldValues,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form"
import { Button } from "@/components/atoms"
import { zodResolver } from "@hookform/resolvers/zod"
import { LabeledInput } from "@/components/cells"
import { loginFormSchema, LoginFormData } from "./schema"
import { useState } from "react"
import { login } from "@/lib/data/customer"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "@/lib/helpers/toast"

export const LoginForm = () => {
  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  )
}

const Form = () => {
  const [isAuthError, setIsAuthError] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useFormContext()
  const router = useRouter()

  const submit = async (data: FieldValues) => {
    const formData = new FormData()
    formData.append("email", data.email)
    formData.append("password", data.password)

    const res = await login(formData)
    if (res) {
      // Temporary solution. API returns 200 code in case of auth error. To change when API is updated.
      const isCredentialsError = 
        res.toLowerCase().includes("invalid email or password") ||
        res.toLowerCase().includes("unauthorized") ||
        res.toLowerCase().includes("incorrect") ||
        res.toLowerCase().includes("credentials");
      
      setIsAuthError(isCredentialsError);
      toast.error({ title: res || "An error occurred. Please try again." })
      return
    }
    setIsAuthError(false);
    router.push("/user")
  }

  const clearApiError = () => {
    isAuthError && setIsAuthError(false);
  }

  return (
    <main className="container">
      <div className="max-w-xl w-full mx-auto mt-6 space-y-4">
        <div className="rounded-sm border p-4">
          <h1 className="heading-md uppercase mb-8 text-primary">Log in</h1>
          <form onSubmit={handleSubmit(submit)}>
            <div className="space-y-4">
              <LabeledInput
                label="E-mail"
                placeholder="Your e-mail address"
                error={(errors.email as FieldError) || (isAuthError ? { message: '' } as FieldError : undefined)}
                {...register("email", {
                  onChange: clearApiError
                })}
              />
              <LabeledInput
                label="Password"
                placeholder="Your password"
                type="password"
                error={(errors.password as FieldError) || (isAuthError ? { message: '' } as FieldError : undefined)}
                {...register("password", {
                  onChange: clearApiError
                })}
              />
            </div>

            <Link
              href="/user/forgot-password"
              className="block text-right label-md uppercase text-action-on-secondary mt-4"
            >
              Forgot your password?
            </Link>

            <Button className="w-full uppercase mt-8" disabled={isSubmitting}>
              Log in
            </Button>
          </form>
        </div>

        <div className="rounded-sm border p-4">
          <h2 className="heading-md uppercase mb-4 text-primary">
            Don&apos;t have an account yet?
          </h2>
          <Link href="/user/register">
            <Button
              variant="tonal"
              className="w-full flex justify-center mt-8 uppercase"
            >
              Create account
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}