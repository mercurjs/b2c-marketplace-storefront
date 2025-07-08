"use client"

import { Chatbox, Inbox } from "@talkjs/react"
import { useCallback } from "react"
import Talk from "talkjs"

export const UserMessagesSection = ({ user_id }: { user_id: string }) => {
  const syncConversation = useCallback((session: Talk.Session) => {
    const conversation = session.getOrCreateConversation(
      "my_conversations_" + user_id
    )
    conversation.setParticipant(session.me)
    return conversation
  }, [])

  return (
    <div className="max-w-full h-[655px]">
      <Inbox
        loadingComponent={
          <div className="h-96 w-full flex items-center justify-center">
            Loading..
          </div>
        }
        syncConversation={syncConversation}
        className="h-full max-w-[760px] w-full"
      />
    </div>
  )
}
