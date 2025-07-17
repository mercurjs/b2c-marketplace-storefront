import { Button, Card } from "@/components/atoms"
import { convertToLocale } from "@/lib/helpers/money"
import Image from "next/image"

export const ReturnSummaryTab = ({
  selectedItems,
  items,
  currency_code,
  handleSubmit,
  disabled,
}: {
  selectedItems: any[]
  items: any[]
  currency_code: string
  handleSubmit: () => void
  disabled: boolean
}) => {
  const selected = items.filter((item) =>
    selectedItems.some((i) => i.line_item_id === item.id)
  )

  const subtotal = selected.reduce((acc, item) => {
    return acc + item.subtotal
  }, 0)

  return (
    <div className="sm:mt-20">
      {selected.length ? (
        <Card className="p-4">
          <ul>
            {selected.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-2 mb-4 justify-between w-full"
              >
                <div className="flex items-center gap-2 font-semibold">
                  <div className="w-16 rounded-sm border">
                    {item.thumbnail ? (
                      <Image
                        src={item.thumbnail}
                        alt={item.subtitle}
                        width={64}
                        height={64}
                        className="rounded-sm"
                      />
                    ) : (
                      <Image
                        src={"/images/placeholder.svg"}
                        alt={item.subtitle}
                        width={64}
                        height={64}
                        className="opacity-25 scale-75"
                      />
                    )}
                  </div>
                  {item.subtitle}
                </div>
                <div>
                  {convertToLocale({ amount: item.subtotal, currency_code })}
                </div>
              </li>
            ))}
          </ul>
        </Card>
      ) : null}

      <Card className="p-4">
        <p className="label-md flex justify-between mb-4">
          Subtotal refund:
          <span className="label-md !font-bold text-primary">
            {convertToLocale({
              amount: subtotal,
              currency_code,
            })}
          </span>
        </p>
        <Button
          className="label-md w-full uppercase"
          disabled={!selected.length || disabled}
          onClick={handleSubmit}
        >
          Request return
        </Button>
      </Card>
    </div>
  )
}
