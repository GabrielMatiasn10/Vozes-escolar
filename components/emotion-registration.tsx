"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { emotionEmojis, saveEmotionEntry, getWeekNumber, hasEntryThisWeek, type EmotionEntry } from "@/lib/emotions"
import type { User } from "@/lib/auth"

interface EmotionRegistrationProps {
  user: User
  onSuccess?: () => void
}

export function EmotionRegistration({ user, onSuccess }: EmotionRegistrationProps) {
  const [selectedEmotion, setSelectedEmotion] = useState<number | null>(null)
  const [note, setNote] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (selectedEmotion === null) {
      toast({
        title: "Selecione uma emoção",
        description: "Por favor, escolha como você está se sentindo hoje.",
        variant: "destructive",
      })
      return
    }

    if (hasEntryThisWeek(user.id)) {
      toast({
        title: "Já registrado",
        description: "Você já registrou suas emoções esta semana.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    const now = new Date()
    const entry: EmotionEntry = {
      id: `${user.id}-${Date.now()}`,
      userId: user.id,
      date: now.toISOString(),
      emotion: selectedEmotion,
      emoji: emotionEmojis.find((e) => e.value === selectedEmotion)?.emoji || "😐",
      note: note.trim() || undefined,
      week: getWeekNumber(now),
      year: now.getFullYear(),
    }

    saveEmotionEntry(entry)

    toast({
      title: "Registrado com sucesso!",
      description: "Suas emoções foram registradas. Continue assim!",
    })

    setSelectedEmotion(null)
    setNote("")
    setIsSubmitting(false)

    if (onSuccess) {
      onSuccess()
    }
  }

  const alreadyRegistered = hasEntryThisWeek(user.id)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Como você está se sentindo hoje?</CardTitle>
        <CardDescription>Registre suas emoções semanalmente para acompanhar seu bem-estar</CardDescription>
      </CardHeader>
      <CardContent>
        {alreadyRegistered ? (
          <div className="text-center py-12">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-6xl mb-4">
              ✅
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Você já registrou esta semana!</h3>
            <p className="text-gray-600">Volte na próxima semana para registrar novamente.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label className="text-base mb-4 block">Selecione sua emoção:</Label>
              <div className="grid grid-cols-5 gap-4">
                {emotionEmojis.map((emotion) => (
                  <motion.button
                    key={emotion.value}
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedEmotion(emotion.value)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                      selectedEmotion === emotion.value
                        ? "border-primary bg-primary/10 shadow-lg"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-4xl mb-2">{emotion.emoji}</span>
                    <span className="text-xs font-medium text-center">{emotion.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="note">Quer compartilhar algo? (opcional)</Label>
              <Textarea
                id="note"
                placeholder="Como foi sua semana na escola? O que você sentiu?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
                className="mt-2"
              />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting || selectedEmotion === null}>
              {isSubmitting ? "Registrando..." : "Registrar Emoção"}
              <Send className="ml-2 w-4 h-4" />
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
