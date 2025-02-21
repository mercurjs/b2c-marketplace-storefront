import type { Meta, StoryObj } from "@storybook/react"

import { Hero } from "./Hero"
import { NextIntlClientProvider } from "next-intl"
import defaultMessages from "../../../translations/gb.json"

const meta: Meta<typeof Hero> = {
  component: Hero,
  decorators: (Story) => (
    <NextIntlClientProvider locale="en" messages={defaultMessages}>
      <Story />
    </NextIntlClientProvider>
  ),
}

export default meta
type Story = StoryObj<typeof Hero>

export const FirstStory: Story = {
  args: {
    heading: "Snag your style in a flash",
    paragraph: "Buy, sell, and discover pre-loved from the trendiest brands.",
    image: "/images/hero/Image.jpg",
    buttons: [
      { label: "Buy now", path: "#" },
      { label: "Sell now", path: "3" },
    ],
  },
}
