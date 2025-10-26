"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw } from "lucide-react"
import { saveGameScore, type Game } from "@/lib/games"
import type { User } from "@/lib/auth"
import { updateUserProgress } from "@/lib/gamification"

interface BreathingGameProps {
  user: User
  game: Game
  onComplete: () => void
}

export function BreathingGame({ user, game, onComplete }: BreathingGameProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale")
  const [cycles, setCycles] = useState(0)
  const [timer, setTimer] = useState(4)
  const [isComplete, setIsComplete] = useState(false)

  const targetCycles = 5

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          if (phase === "inhale") {
            setPhase("hold")
            return 4
          } else if (phase === "hold") {
            setPhase("exhale")
            return 4
          } else {
            setCycles((c) => c + 1)
            setPhase("inhale")
            return 4
          }
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isPlaying, phase])

  useEffect(() => {
    if (cycles >= targetCycles) {
      setIsPlaying(false)
      saveGameScore(user.id, game.id, 100)

      const progress = updateUserProgress(user.id, 0)
      progress.points += game.pointsReward
      if (typeof window !== "undefined") {
        localStorage.setItem(`vozes_progress_${user.id}`, JSON.stringify(progress))
      }

      setIsComplete(true)
    }
  }, [cycles])

  const handleReset = () => {
    setIsPlaying(false)
    setPhase("inhale")
    setCycles(0)
    setTimer(4)
    setIsComplete(false)
  }

  const getPhaseText = () => {
    switch (phase) {
      case "inhale":
        return "Inspire"
      case "hold":
        return "Segure"
      case "exhale":
        return "Expire"
    }
  }

  const getCircleScale = () => {
    switch (phase) {
      case "inhale":
        return 1.5
      case "hold":
        return 1.5
      case "exhale":
        return 0.8
    }
  }

  if (isComplete) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Exercício Completo!</CardTitle>
          <CardDescription>Você completou {targetCycles} ciclos de respiração</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-4xl mb-4">🌬️</p>
            <p className="text-green-600 font-semibold">+{game.pointsReward} pontos ganhos!</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleReset} variant="outline" className="flex-1 bg-transparent">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reiniciar
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
        <CardDescription>
          Ciclo {cycles + 1} de {targetCycles}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center py-12">
          <motion.div
            className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center"
            animate={{ scale: getCircleScale() }}
            transition={{ duration: 4, ease: "easeInOut" }}
          >
            <div className="text-center text-white">
              <p className="text-3xl font-bold mb-2">{getPhaseText()}</p>
              <p className="text-6xl font-bold">{timer}</p>
            </div>
          </motion.div>
        </div>

        <div className="flex gap-2 justify-center">
          <Button onClick={() => setIsPlaying(!isPlaying)} size="lg">
            {isPlaying ? (
              <>
                <Pause className="w-5 h-5 mr-2" />
                Pausar
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                {cycles > 0 ? "Continuar" : "Começar"}
              </>
            )}
          </Button>
          <Button onClick={handleReset} variant="outline" size="lg">
            <RotateCcw className="w-5 h-5 mr-2" />
            Reiniciar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
