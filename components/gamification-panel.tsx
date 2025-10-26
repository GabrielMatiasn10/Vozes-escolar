"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Trophy, Award, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  updateUserProgress,
  availableBadges,
  getLeaderboard,
  updateLeaderboard,
  type UserProgress,
} from "@/lib/gamification"
import type { User } from "@/lib/auth"

interface GamificationPanelProps {
  user: User
  totalEntries: number
}

export function GamificationPanel({ user, totalEntries }: GamificationPanelProps) {
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [leaderboard, setLeaderboard] = useState<Array<{ userId: string; userName: string; points: number }>>([])

  useEffect(() => {
    const userProgress = updateUserProgress(user.id, totalEntries)
    setProgress(userProgress)
    updateLeaderboard(user.id, user.name, userProgress.points)
    setLeaderboard(getLeaderboard())
  }, [user.id, user.name, totalEntries])

  if (!progress) return null

  const nextBadge = availableBadges.find((badge) => badge.type === "entries" && !progress.badges.includes(badge.id))

  return (
    <div className="space-y-6">
      {/* Points and Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Seus Pontos
          </CardTitle>
          <CardDescription>Continue registrando para ganhar mais pontos!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-primary mb-2">{progress.points}</div>
            <p className="text-sm text-gray-600">pontos totais</p>
          </div>

          {nextBadge && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Próximo badge:</span>
                <span className="font-medium">{nextBadge.name}</span>
              </div>
              <Progress value={(totalEntries / nextBadge.requirement) * 100} className="h-2" />
              <p className="text-xs text-gray-500 text-center">
                {totalEntries} / {nextBadge.requirement} registros
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-500" />
            Conquistas
          </CardTitle>
          <CardDescription>Badges que você conquistou</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {availableBadges.map((badge) => {
              const isUnlocked = progress.badges.includes(badge.id)

              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-4 rounded-lg border-2 text-center transition-all ${
                    isUnlocked ? "border-primary bg-primary/5" : "border-gray-200 bg-gray-50 opacity-50"
                  }`}
                >
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <h4 className="font-semibold text-sm mb-1">{badge.name}</h4>
                  <p className="text-xs text-gray-600">{badge.description}</p>
                  {isUnlocked && (
                    <Badge variant="secondary" className="mt-2">
                      Conquistado
                    </Badge>
                  )}
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            Ranking
          </CardTitle>
          <CardDescription>Top 10 estudantes mais engajados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboard.map((entry, index) => {
              const isCurrentUser = entry.userId === user.id
              const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : null

              return (
                <motion.div
                  key={entry.userId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    isCurrentUser ? "bg-primary/10 border-2 border-primary" : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 text-center font-bold text-gray-600">{medal || `${index + 1}º`}</div>
                    <div>
                      <p className={`font-medium ${isCurrentUser ? "text-primary" : "text-gray-900"}`}>
                        {entry.userName}
                        {isCurrentUser && " (Você)"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{entry.points}</p>
                    <p className="text-xs text-gray-500">pontos</p>
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
