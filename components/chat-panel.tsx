"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Send, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getChatMessages, sendChatMessage, type ChatMessage } from "@/lib/chat"
import type { User } from "@/lib/auth"

interface ChatPanelProps {
  user: User
}

export function ChatPanel({ user }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadMessages()
  }, [user.id])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const loadMessages = () => {
    const userMessages = getChatMessages(user.id)
    setMessages(userMessages)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim()) return

    const message: ChatMessage = {
      id: `${user.id}-${Date.now()}`,
      senderId: user.id,
      senderName: user.name,
      senderRole: user.role,
      recipientId: "school-staff",
      message: newMessage.trim(),
      timestamp: new Date().toISOString(),
      read: false,
    }

    sendChatMessage(message)
    setMessages([...messages, message])
    setNewMessage("")

    // Simulate response after 2 seconds
    setTimeout(() => {
      const response: ChatMessage = {
        id: `staff-${Date.now()}`,
        senderId: "school-staff",
        senderName: "Equipe Escolar",
        senderRole: "teacher",
        recipientId: user.id,
        message: "Obrigado por compartilhar! Estamos aqui para ajudar. Em breve um profissional entrará em contato.",
        timestamp: new Date().toISOString(),
        read: false,
      }
      sendChatMessage(response)
      setMessages((prev) => [...prev, response])
    }, 2000)
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <Card className="flex flex-col h-[600px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Chat com Profissionais
        </CardTitle>
        <CardDescription>Converse com professores e psicólogos da escola</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma mensagem ainda</p>
              <p className="text-sm mt-2">Envie uma mensagem para começar a conversa</p>
            </div>
          ) : (
            messages.map((message, index) => {
              const isOwnMessage = message.senderId === user.id

              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex gap-3 ${isOwnMessage ? "flex-row-reverse" : "flex-row"}`}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className={isOwnMessage ? "bg-primary text-white" : "bg-gray-200"}>
                      {message.senderName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`flex flex-col ${isOwnMessage ? "items-end" : "items-start"} max-w-[70%]`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-gray-600">{message.senderName}</span>
                      <span className="text-xs text-gray-400">{formatTime(message.timestamp)}</span>
                    </div>
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        isOwnMessage ? "bg-primary text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={!newMessage.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
