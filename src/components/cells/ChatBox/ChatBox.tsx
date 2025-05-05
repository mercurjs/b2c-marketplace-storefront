"use client"

import { useEffect, useRef } from "react"
import Talk from "talkjs"

type ChatProps = {
  currentUser: {
    id: string
    name: string
    email: string
    photoUrl?: string
  }
  supportUser: {
    id: string
    name: string
    email: string
    photoUrl?: string
    role: string
  }
}

export function ChatBox({ currentUser, supportUser }: ChatProps) {
  const chatboxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    Talk.ready.then(() => {
      const me = new Talk.User(currentUser)
      const other = new Talk.User(supportUser)

      const session = new Talk.Session({
        appId: process.env.NEXT_PUBLIC_TALKJS_APP_ID || "",
        me,
      })

      const conversation = session.getOrCreateConversation(
        Talk.oneOnOneId(me, other)
      )

      conversation.setParticipant(me)
      conversation.setParticipant(other)

      const chatbox = session.createChatbox()
      chatbox.select(conversation)
      chatbox.mount(chatboxRef.current!)
    })
  }, [currentUser, supportUser])

  return <div className="w-full h-[500px]" ref={chatboxRef} />
}
