import { Card } from "@/components/atoms"
import { ProfilePasswordForm } from "@/components/molecules/ProfilePasswordForm/ProfilePasswordForm"
import { retrieveCustomer } from "@/lib/data/customer"

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>
}) {
  const { token } = await searchParams

  return (
    <main className="container flex justify-center">
      <Card className="w-full max-w-lg">
        <ProfilePasswordForm token={token} />
      </Card>
    </main>
  )
}
