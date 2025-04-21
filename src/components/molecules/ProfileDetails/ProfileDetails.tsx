"use client"
import { Button, Card } from "@/components/atoms"
import { HttpTypes } from "@medusajs/types"
import { Modal } from "../Modal/Modal"
import { useState } from "react"
import { ProfileDetailsForm } from "../ProfileDetailsForm/ProfileDetailsForm"

export const ProfileDetails = ({ user }: { user: HttpTypes.StoreCustomer }) => {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="md:col-span-3">
      <h1 className="heading-xl uppercase mb-8">Profile details</h1>
      <Card className="px-4 flex justify-between items-start gap-4 max-w-2xl">
        <div className="flex flex-col">
          <p className="label-md text-primary">Name</p>
          <p className="label-md text-secondary">
            {`${user.first_name} ${user.last_name}`}
          </p>
          <p className="label-md text-primary mt-2">Phone number</p>
          <p className="label-md text-secondary">{user.phone}</p>
        </div>
        <div className="flex gap-2 sm:gap-4 flex-col-reverse sm:flex-row">
          <Button variant="tonal" onClick={() => setShowForm(true)}>
            Edit
          </Button>
        </div>
      </Card>
      {showForm && (
        <Modal
          heading="Edit profile details"
          onClose={() => setShowForm(false)}
        >
          <ProfileDetailsForm
            handleClose={() => setShowForm(false)}
            defaultValues={{
              firstName: user.first_name || "",
              lastName: user.last_name || "",
              phone: user.phone || "",
            }}
          />
        </Modal>
      )}
    </div>
  )
}
