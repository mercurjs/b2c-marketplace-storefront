export const steps = ["Recived", "Preparing", "Shipped", "Delivered"]

export const parcelStatuses = (
  order: "not_fulfilled" | "not_fulfilled" | "delivered" | "shipped"
) => {
  switch (order) {
    case "not_fulfilled":
      return 0
    case "not_fulfilled":
      return 1
    case "delivered":
      return 2
    case "shipped":
      return 3
    default:
      return 0
  }
}
