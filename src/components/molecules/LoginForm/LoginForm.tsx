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
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { LabeledInput } from "@/components/cells"
import { loginFormSchema, LoginFormData } from "./schema"
import { useState } from "react"
import { login } from "@/lib/data/customer"
import { useRouter } from "next/navigation"
import Link from "next/link"

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
  const [error, setError] = useState("")
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
      setError(res)
      return
    }
    setError("")
    router.push("/user")
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
                error={errors.email as FieldError}
                {...register("email")}
              />
              <LabeledInput
                label="Password"
                placeholder="Your password"
                type="password"
                error={errors.password as FieldError}
                {...register("password")}
              />
            </div>

            {/* TODO: Add forgot password link when forgot password page is implemented */}
            {/* <Link href="/user/forgot-password" className="block text-right label-md uppercase text-action-on-secondary mt-4">
              Forgot your password?
            </Link> */}

            <Button className="w-full uppercase mt-8" disabled={isSubmitting}>
              Log in
            </Button>

            {error && (
              <p className="label-md text-negative my-4 text-center">{error}</p>
            )}
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
