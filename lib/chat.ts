export interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  senderRole: "student" | "teacher" | "psychologist"
  recipientId: string
  message: string
  timestamp: string
  read: boolean
}

export function getChatMessages(userId: string): ChatMessage[] {
  if (typeof window !== "undefined") {
    const messages = localStorage.getItem("vozes_chat")
    const allMessages: ChatMessage[] = messages ? JSON.parse(messages) : []
    return allMessages
      .filter((m) => m.senderId === userId || m.recipientId === userId)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
  }
  return []
}

export function sendChatMessage(message: ChatMessage) {
  if (typeof window !== "undefined") {
    const messages = localStorage.getItem("vozes_chat")
    const allMessages: ChatMessage[] = messages ? JSON.parse(messages) : []
    allMessages.push(message)
    localStorage.setItem("vozes_chat", JSON.stringify(allMessages))
  }
}

export function markMessagesAsRead(userId: string, senderId: string) {
  if (typeof window !== "undefined") {
    const messages = localStorage.getItem("vozes_chat")
    if (messages) {
      const allMessages: ChatMessage[] = JSON.parse(messages)
      allMessages.forEach((msg) => {
        if (msg.recipientId === userId && msg.senderId === senderId) {
          msg.read = true
        }
      })
      localStorage.setItem("vozes_chat", JSON.stringify(allMessages))
    }
  }
}
