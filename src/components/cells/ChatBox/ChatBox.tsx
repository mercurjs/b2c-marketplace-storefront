"use client"

import { useEffect, useRef } from "react"
import Talk from "talkjs"

type ChatProps = {
  order_id?: string
  product_id?: string
  subject?: string | null
  currentUser: {
    id: string
    name: string
    email: string | null
    photoUrl?: string
    role: string
  }
  supportUser: {
    id: string
    name: string
    email: string | null
    photoUrl?: string
    role: string
  }
}

export function ChatBox({
  currentUser,
  supportUser,
  subject,
  order_id,
  product_id,
}: ChatProps) {
  const chatboxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let session: Talk.Session | undefined

    Talk.ready.then(() => {
      const me = new Talk.User(currentUser)
      const other = new Talk.User(supportUser)

      session = new Talk.Session({
        appId: process.env.NEXT_PUBLIC_TALKJS_APP_ID || "",
        me,
      })

      const conversationId = `product-${product_id || order_id}-${me.id}-${
        other.id
      }`

      const conversation = session.getOrCreateConversation(conversationId)

      if (subject) {
        conversation.subject = subject
      }

      conversation.setParticipant(me)
      conversation.setParticipant(other)

      const chatbox = session.createChatbox()
      chatbox.select(conversation)
      if (chatboxRef.current) {
        chatbox.mount(chatboxRef.current)
      }
    })

    return () => session?.destroy()
  }, [currentUser, supportUser])

  return <div className="w-full h-[500px]" ref={chatboxRef} />
}
