import { toast as sonnerToast } from "sonner"

export const toast = {
  info: ({ description, title }: { description?: string; title: string }) => {
    sonnerToast.info(title, {
      className: "bg-blue-100 text-blue-900",
      description,
    })
  },
  success: ({
    description,
    title,
  }: {
    description?: string
    title: string
  }) => {
    sonnerToast.success(title, {
      className: "bg-green-100 text-green-900",
      description,
    })
  },
  error: ({ description, title }: { description?: string; title: string }) => {
    sonnerToast.error(title, {
      className: "bg-red-100 text-red-900",
      description,
    })
  },
}
