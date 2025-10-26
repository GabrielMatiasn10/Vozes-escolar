"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Calendar, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getEmotionEntries, emotionEmojis, type EmotionEntry } from "@/lib/emotions"

interface EmotionHistoryProps {
  userId: string
}

export function EmotionHistory({ userId }: EmotionHistoryProps) {
  const [entries, setEntries] = useState<EmotionEntry[]>([])

  useEffect(() => {
    const userEntries = getEmotionEntries(userId)
    setEntries(userEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
  }, [userId])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  const getEmotionData = (value: number) => {
    return emotionEmojis.find((e) => e.value === value) || emotionEmojis[2]
  }

  if (entries.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Histórico de Emoções
          </CardTitle>
          <CardDescription>Acompanhe suas emoções ao longo do tempo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Você ainda não tem registros</p>
            <p className="text-sm mt-2">Comece registrando suas emoções na aba "Registrar"</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Resumo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {emotionEmojis.map((emotion) => {
              const count = entries.filter((e) => e.emotion === emotion.value).length
              const percentage = entries.length > 0 ? (count / entries.length) * 100 : 0

              return (
                <div key={emotion.value} className="text-center">
                  <div className="text-3xl mb-2">{emotion.emoji}</div>
                  <div className="text-2xl font-bold">{count}</div>
                  <div className="text-xs text-gray-500">{percentage.toFixed(0)}%</div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Histórico de Registros
          </CardTitle>
          <CardDescription>Suas emoções registradas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {entries.map((entry, index) => {
              const emotionData = getEmotionData(entry.emotion)

              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <div className="text-4xl">{entry.emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`font-semibold ${emotionData.color}`}>{emotionData.label}</h4>
                      <span className="text-sm text-gray-500">{formatDate(entry.date)}</span>
                    </div>
                    {entry.note && <p className="text-sm text-gray-600 mt-2">{entry.note}</p>}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
