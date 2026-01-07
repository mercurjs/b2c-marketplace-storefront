import { DoneIcon, ErrorIcon } from "@/icons";
import { toast as sonnerToast } from "sonner"

export const toast = {
  info: ({ description, title }: { description?: string; title: string }) => {
    sonnerToast.info(title, {
      className: "bg-blue-100 text-blue-900",
      description,
      "data-testid": "toast-info",
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
      description,
      duration: 10000,
      icon: <DoneIcon color="rgb(20, 83, 45)"/>,
      classNames: {
        icon: "self-start pt-2",
        toast: "items-start gap-3",
        title: "text-md text-primary",
      },
      "data-testid": "toast-success",
    })
  },
  error: ({ description, title }: { description?: string; title: string }) => {
    sonnerToast.error(title, {
      description,
      icon: <ErrorIcon color="rgb(155, 34, 25)" />,
      classNames: {
        icon: "self-start pt-2",
        toast: "items-start gap-3",
        title: "text-md text-primary"
      },
      "data-testid": "toast-error",
    })
  },
}