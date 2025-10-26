"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Gamepad2, Trophy, Play, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { availableGames, hasPlayedToday, getBestScore, type Game } from "@/lib/games"
import { MemoryGame } from "@/components/games/memory-game"
import { BreathingGame } from "@/components/games/breathing-game"
import { EmotionQuiz } from "@/components/games/emotion-quiz"
import type { User } from "@/lib/auth"

interface GamesPanelProps {
  user: User
  onPointsEarned: () => void
}

export function GamesPanel({ user, onPointsEarned }: GamesPanelProps) {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)

  const getDifficultyColor = (difficulty: Game["difficulty"]) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "hard":
        return "bg-red-500"
    }
  }

  const renderGame = () => {
    if (!selectedGame) return null

    switch (selectedGame.id) {
      case "memory-emotions":
        return <MemoryGame user={user} game={selectedGame} onComplete={handleGameComplete} />
      case "breathing-exercise":
        return <BreathingGame user={user} game={selectedGame} onComplete={handleGameComplete} />
      case "emotion-quiz":
        return <EmotionQuiz user={user} game={selectedGame} onComplete={handleGameComplete} />
      default:
        return (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-500">Jogo em desenvolvimento</p>
            </CardContent>
          </Card>
        )
    }
  }

  const handleGameComplete = () => {
    setSelectedGame(null)
    onPointsEarned()
  }

  if (selectedGame) {
    return (
      <div className="space-y-4">
        <Button variant="outline" onClick={() => setSelectedGame(null)}>
          ← Voltar aos Jogos
        </Button>
        {renderGame()}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gamepad2 className="w-5 h-5" />
            Jogos e Desafios
          </CardTitle>
          <CardDescription>Jogue, aprenda e ganhe pontos extras!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {availableGames.map((game, index) => {
              const playedToday = hasPlayedToday(user.id, game.id)
              const bestScore = getBestScore(user.id, game.id)

              return (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-4xl">{game.icon}</span>
                          <div>
                            <CardTitle className="text-lg">{game.name}</CardTitle>
                            <CardDescription className="text-sm">{game.description}</CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Recompensa:</span>
                          <Badge variant="secondary">+{game.pointsReward} pontos</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Dificuldade:</span>
                          <Badge className={getDifficultyColor(game.difficulty)}>{game.difficulty}</Badge>
                        </div>
                        {bestScore > 0 && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Melhor pontuação:</span>
                            <span className="font-semibold flex items-center gap-1">
                              <Trophy className="w-4 h-4 text-yellow-500" />
                              {bestScore}
                            </span>
                          </div>
                        )}
                        <Button
                          className="w-full"
                          onClick={() => setSelectedGame(game)}
                          disabled={playedToday}
                          variant={playedToday ? "secondary" : "default"}
                        >
                          {playedToday ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Jogado Hoje
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              Jogar
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
