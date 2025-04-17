"use client"
import { Button } from "@/components/atoms"
import { AddressForm, Modal } from "@/components/molecules"
import { HttpTypes } from "@medusajs/types"
import { isEmpty } from "lodash"
import { useState } from "react"

export const Addresses = ({
  user,
  regions,
}: {
  user: HttpTypes.StoreCustomer
  regions: HttpTypes.StoreRegion[]
}) => {
  const [showForm, setShowForm] = useState(false)

  return (
    <>
      <div className="md:col-span-3 space-y-8">
        <h1 className="heading-md uppercase">Addresses</h1>
        {isEmpty(user.addresses) ? (
          <div className="text-center">
            <h3 className="heading-lg text-primary uppercase">
              No saved shipping addresses
            </h3>
            <p className="text-lg text-secondary mt-2">
              You currently have no saved shipping addresses. <br />
              Add an address to make your checkout process quicker and easier.
            </p>
            <Button onClick={() => setShowForm(true)} className="mt-4">
              Add address
            </Button>
          </div>
        ) : (
          // TODO - Add address list
          // TODO - edit / delete address
          <p>Addresses: {user.addresses.length}</p>
        )}
      </div>
      {showForm && (
        // TODO - handle address editing
        <Modal heading="Add address" onClose={() => setShowForm(false)}>
          <AddressForm regions={regions} />
        </Modal>
      )}
    </>
  )
}
