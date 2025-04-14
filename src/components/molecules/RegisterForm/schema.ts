import { z } from "zod"

export const registerFormSchema = z
  .object({
    firstName: z.string().nonempty("Please enter first name"),
    lastName: z.string().nonempty("Please enter last name"),
    email: z.string().nonempty("Please enter email").email("Invalid email"),
    confirmPassword: z.string().nonempty("Please confirm password"),
    password: z
      .string()
      .nonempty("Please enter password")
      .min(8, "Password must be at least 8 characters long")
      .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/, {
        message:
          "Password must contain at least one uppercase letter and one special character",
      }),
    phone: z
      .string()
      .min(6, "Please enter phone number")
      .regex(/^\+?\d+$/, { message: "Mobile phone must contain digits only" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // This specifies the field where the error will appear
  })

export type RegisterFormData = z.infer<typeof registerFormSchema>
