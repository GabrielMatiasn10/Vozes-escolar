"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy } from "lucide-react"
import { saveGameScore, type Game } from "@/lib/games"
import type { User } from "@/lib/auth"
import { updateUserProgress } from "@/lib/gamification"

interface MemoryGameProps {
  user: User
  game: Game
  onComplete: () => void
}

const emotions = ["😊", "😢", "😡", "😰", "😴", "😊", "😢", "😡", "😰", "😴"]

export function MemoryGame({ user, game, onComplete }: MemoryGameProps) {
  const [cards, setCards] = useState<string[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    shuffleCards()
  }, [])

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped
      if (cards[first] === cards[second]) {
        setMatched([...matched, first, second])
        setFlipped([])
      } else {
        setTimeout(() => setFlipped([]), 1000)
      }
      setMoves(moves + 1)
    }
  }, [flipped])

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      const score = Math.max(100 - moves * 5, 10)
      saveGameScore(user.id, game.id, score)

      const progress = updateUserProgress(user.id, 0)
      progress.points += game.pointsReward
      if (typeof window !== "undefined") {
        localStorage.setItem(`vozes_progress_${user.id}`, JSON.stringify(progress))
      }

      setIsComplete(true)
    }
  }, [matched])

  const shuffleCards = () => {
    const shuffled = [...emotions].sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setFlipped([])
    setMatched([])
    setMoves(0)
    setIsComplete(false)
  }

  const handleCardClick = (index: number) => {
    if (flipped.length < 2 && !flipped.includes(index) && !matched.includes(index)) {
      setFlipped([...flipped, index])
    }
  }

  if (isComplete) {
    const score = Math.max(100 - moves * 5, 10)
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            Parabéns!
          </CardTitle>
          <CardDescription>Você completou o jogo!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-4xl font-bold text-primary mb-2">{score} pontos</p>
            <p className="text-gray-600">Movimentos: {moves}</p>
            <p className="text-green-600 font-semibold mt-4">+{game.pointsReward} pontos ganhos!</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={shuffleCards} variant="outline" className="flex-1 bg-transparent">
              Jogar Novamente
            </Button>
            <Button onClick={onComplete} className="flex-1">
              Voltar
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{game.name}</CardTitle>
        <CardDescription>Encontre os pares de emoções • Movimentos: {moves}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-3">
          {cards.map((card, index) => (
            <motion.button
              key={index}
              onClick={() => handleCardClick(index)}
              className={`aspect-square rounded-lg text-4xl flex items-center justify-center transition-all ${
                flipped.includes(index) || matched.includes(index)
                  ? "bg-white border-2 border-primary"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {flipped.includes(index) || matched.includes(index) ? card : "?"}
            </motion.button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
