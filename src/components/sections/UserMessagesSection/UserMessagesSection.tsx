"use client"

import { Inbox } from "@talkjs/react"

export const UserMessagesSection = () => {
  return (
    <div className="max-w-full h-[655px]">
      <Inbox className="h-full max-w-[760px] w-full" />
    </div>
  )
}
