"use client"
import { navigation } from "@/app/[locale]/(main)/user/page"
import { Card, NavigationItem } from "@/components/atoms"
import { StarIcon } from "@/icons"
import { Review } from "@/lib/data/reviews"
import { isEmpty } from "lodash"
import { usePathname } from "next/navigation"

export const ReviewsWritten = ({ reviews }: { reviews: Review[] }) => {
  const pathname = usePathname()

  return (
    <div className="md:col-span-3 space-y-8">
      <h1 className="heading-md uppercase">Reviews</h1>
      <div className="flex gap-4">
        {navigation.map((item) => (
          <NavigationItem
            key={item.label}
            href={item.href}
            active={pathname === item.href}
            className="px-0"
          >
            {item.label}
          </NavigationItem>
        ))}
      </div>
      {isEmpty(reviews) ? (
        <Card>
          <div className="text-center py-6">
            <h3 className="heading-lg text-primary uppercase">
              No written reviews
            </h3>
            <p className="text-lg text-secondary mt-2">
              You haven&apos;t written any reviews yet. Once you write a review,
              it will appear here.
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-2">
          {reviews.map((review) => (
            <Card className="flex flex-col gap-2 px-4" key={review.id}>
              <div className="flex gap-3 items-center">
                <div className="flex gap-0.5">
                  {new Array(review.rating).fill("").map((_, index) => (
                    <StarIcon
                      className="size-3.5"
                      key={`${review.id}-${index}`}
                    />
                  ))}
                </div>
                <div className="h-2.5 w-px bg-action" />
                <p className="text-md text-primary">
                  {new Date(review.updated_at).getTime() >
                  Date.now() - 7 * 24 * 60 * 60 * 1000
                    ? `${Math.ceil(
                        (Date.now() - new Date(review.updated_at).getTime()) /
                          (24 * 60 * 60 * 1000)
                      )} day${
                        Date.now() - 2 * 24 * 60 * 60 * 1000 ? "" : "s"
                      } ago`
                    : `${Math.floor(
                        (Date.now() - new Date(review.updated_at).getTime()) /
                          (7 * 24 * 60 * 60 * 1000)
                      )} week${
                        Date.now() - 2 * 24 * 60 * 60 * 1000 ? "" : "s"
                      } ago`}
                </p>
              </div>
              <div className="col-span-5 flex flex-col lg:flex-row justify-between lg:items-center gap-4">
                <p className="text-md text-primary">{review.customer_note}</p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
