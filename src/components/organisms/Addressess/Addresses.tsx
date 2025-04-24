"use client"
import { Button, Card } from "@/components/atoms"
import { AddressForm, Modal } from "@/components/molecules"
import { emptyDefaultAddressValues } from "@/components/molecules/AddressForm/AddressForm"
import { AddressFormData } from "@/components/molecules/AddressForm/schema"
import { deleteCustomerAddress } from "@/lib/data/customer"
import { cn } from "@/lib/utils"
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
  const [deleteAddress, setDeleteAddress] = useState<string | null>(null)

  const [defaultValues, setDefaultValues] = useState<AddressFormData | null>(
    null
  )

  const countries = regions.flatMap((region) => region.countries)

  const handleEdit = (addressId: string) => {
    const address = user.addresses.find((address) => address.id === addressId)
    if (address) {
      setDefaultValues({
        addressId: addressId,
        addressName: address.address_name || "",
        firstName: address.first_name || "",
        lastName: address.last_name || "",
        address: address.address_1 || "",
        city: address.city || "",
        countryCode: address.country_code || "",
        postalCode: address.postal_code || "",
        company: address.company || "",
        province: address.province || "",
        phone: address.phone || user.phone || "",
      })
      setShowForm(true)
    }
  }

  const handleDelete = async (addressId: string) => {
    await deleteCustomerAddress(addressId)
    setDeleteAddress(null)
  }

  const handleAdd = () => {
    setDefaultValues(emptyDefaultAddressValues)
    setDeleteAddress(null)
    setShowForm(true)
  }

  return (
    <>
      <div
        className={cn(
          "md:col-span-3",
          isEmpty(user.addresses) ? "space-y-8" : "space-y-4"
        )}
      >
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
            <Button onClick={handleAdd} className="mt-4">
              Add address
            </Button>
          </div>
        ) : (
          <>
            {user.addresses.map((address) => (
              <Card
                className="px-4 flex justify-between items-start gap-4 max-w-2xl"
                key={address.id}
              >
                <div className="flex flex-col ">
                  <h4 className="label-md text-primary">
                    {address.address_name}
                  </h4>
                  <p className="label-md text-secondary">
                    {`${address.first_name} ${address.last_name}`}
                  </p>
                  {address.company && (
                    <p className="label-md text-secondary">{address.company}</p>
                  )}
                  <p className="label-md text-secondary">
                    {`${address.address_1}, ${address.postal_code} ${
                      address.city
                    }${address.province ? `, ${address.province}` : ""}${`, ${
                      countries.find(
                        (country) =>
                          country && country.iso_2 === address.country_code
                      )?.display_name || address.country_code?.toUpperCase()
                    }`}`}
                  </p>
                  <p className="label-md text-secondary">
                    {`${user.email}, ${address.phone || user.phone}`}
                  </p>
                </div>
                <div className="flex gap-2 sm:gap-4 flex-col-reverse sm:flex-row">
                  <Button
                    variant="tonal"
                    className="text-negative"
                    onClick={() => setDeleteAddress(address.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="tonal"
                    onClick={() => handleEdit(address.id)}
                  >
                    Edit
                  </Button>
                </div>
              </Card>
            ))}
            {user.addresses.length < 6 && (
              <Button onClick={handleAdd}>Add address</Button>
            )}
          </>
        )}
      </div>
      {showForm && (
        <Modal
          heading={
            defaultValues?.addressId
              ? `Edit adddress: ${defaultValues.addressName}`
              : "Add address"
          }
          onClose={() => setShowForm(false)}
        >
          <AddressForm
            regions={regions}
            handleClose={() => setShowForm(false)}
            defaultValues={defaultValues || emptyDefaultAddressValues}
          />
        </Modal>
      )}
      {deleteAddress && (
        <Modal
          heading="Confirm your action"
          onClose={() => setDeleteAddress(null)}
        >
          <div className="px-4 flex flex-col gap-4">
            <p>Are you sure you want to delete this address?</p>
            <div className="flex justify-end gap-4">
              <Button variant="tonal" onClick={() => setDeleteAddress(null)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(deleteAddress)}
              >
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
