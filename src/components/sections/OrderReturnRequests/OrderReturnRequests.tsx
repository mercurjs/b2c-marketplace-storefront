import { OrdersPagination } from "@/components/organisms/OrdersPagination/OrdersPagination"
import { SingleOrderReturn } from "@/components/organisms/SingleOrderReturn/SingleOrderReturn"
import { Heading } from "@medusajs/ui"
import { isEmpty } from "lodash"

const LIMIT = 10

export const OrderReturnRequests = ({
  returns = [],
  user,
  page,
  currentReturn,
}: {
  returns: any[]
  user: any
  page: string
  currentReturn: string
}) => {
  const pages = Math.ceil(returns.length / LIMIT)
  const currentPage = +page || 1
  const offset = (+currentPage - 1) * LIMIT

  const processedReturns = returns.slice(offset, offset + LIMIT)

  if (isEmpty(processedReturns)) {
    return (
      <div className="mt-8">
        <Heading level="h2" className="uppercase text-center heading-lg">
          No returns
        </Heading>
        <p className="text-center text-secondary w-96 mt-8 mx-auto">
          {
            "You haven't requested any returns yet. Once you request a return, it will appear here."
          }
        </p>
      </div>
    )
  }

  return (
    <div>
      {processedReturns.map((item) => (
        <SingleOrderReturn
          key={item.id}
          item={item}
          user={user}
          defaultOpen={currentReturn === item.id}
        />
      ))}
      <div className="mt-8 flex justify-center">
        <OrdersPagination pages={pages} />
      </div>
    </div>
  )
}
