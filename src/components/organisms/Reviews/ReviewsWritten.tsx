"use client"
import { navigation } from "./navigation"
import { Card, NavigationItem } from "@/components/atoms"
import { StarIcon } from "@/icons"
import { Review } from "@/lib/data/reviews"
import { cn } from "@/lib/utils"
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
            <Card
              className="flex flex-col gap-6 lg:grid lg:grid-cols-6 px-4"
              key={review.id}
            >
              {review.seller && (
                <div className="flex gap-2 max-lg:items-center lg:flex-col">
                  <img
                    src={review.seller.photo}
                    className="size-8 border border-base-primary rounded-xs"
                  />
                  <p className="label-md text-primary">{review.seller.name}</p>
                </div>
              )}
              <div
                className={cn(
                  "flex flex-col gap-2 px-4",
                  review.seller ? "col-span-5" : "col-span-6"
                )}
              >
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
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
