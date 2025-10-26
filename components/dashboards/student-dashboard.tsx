"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { LogOut, Home, Calendar, TrendingUp, Trophy, Gamepad2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { logout, type User } from "@/lib/auth"
import { EmotionRegistration } from "@/components/emotion-registration"
import { EmotionHistory } from "@/components/emotion-history"
import { GamificationPanel } from "@/components/gamification-panel"
import { ChatPanel } from "@/components/chat-panel"
import { GamesPanel } from "@/components/games-panel"
import { RewardsStore } from "@/components/rewards-store"
import { getEmotionEntries, getWeeklyAverage, hasEntryThisWeek } from "@/lib/emotions"
import { updateUserProgress } from "@/lib/gamification"
import { getTotalSpent } from "@/lib/rewards"

interface StudentDashboardProps {
  user: User
}

export function StudentDashboard({ user }: StudentDashboardProps) {
  const router = useRouter()
  const [hasRegisteredThisWeek, setHasRegisteredThisWeek] = useState(false)
  const [weeklyAverage, setWeeklyAverage] = useState(0)
  const [totalEntries, setTotalEntries] = useState(0)
  const [availablePoints, setAvailablePoints] = useState(0)

  useEffect(() => {
    updateStats()
  }, [user.id])

  const updateStats = () => {
    const hasEntry = hasEntryThisWeek(user.id)
    setHasRegisteredThisWeek(hasEntry)

    const entries = getEmotionEntries(user.id)
    setTotalEntries(entries.length)

    const avg = getWeeklyAverage(entries)
    setWeeklyAverage(avg)

    const progress = updateUserProgress(user.id, entries.length)
    const spent = getTotalSpent(user.id)
    setAvailablePoints(progress.points - spent)
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-primary">Vozes da Escola</h1>
            <span className="text-sm text-gray-600 hidden sm:inline">Olá, {user.name}!</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
              <Home className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Início</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Sair</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Meu Painel</h2>
          <p className="text-gray-600 mb-8">Acompanhe seu bem-estar emocional</p>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Registros Totais</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalEntries}</div>
                <p className="text-xs text-muted-foreground">
                  {hasRegisteredThisWeek ? "Registrado esta semana" : "Registre hoje!"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Média Geral</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{weeklyAverage.toFixed(1)}/5</div>
                <p className="text-xs text-muted-foreground">
                  {weeklyAverage >= 4 ? "Excelente!" : weeklyAverage >= 3 ? "Bom" : "Precisa de atenção"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pontos Disponíveis</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{availablePoints}</div>
                <p className="text-xs text-muted-foreground">Use na loja!</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="register" className="space-y-4">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="register">Registrar</TabsTrigger>
              <TabsTrigger value="history">Histórico</TabsTrigger>
              <TabsTrigger value="games">
                <Gamepad2 className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Jogos</span>
              </TabsTrigger>
              <TabsTrigger value="store">
                <ShoppingBag className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Loja</span>
              </TabsTrigger>
              <TabsTrigger value="achievements">Conquistas</TabsTrigger>
              <TabsTrigger value="chat">Chat</TabsTrigger>
            </TabsList>

            <TabsContent value="register" className="space-y-4">
              <EmotionRegistration user={user} onSuccess={updateStats} />
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <EmotionHistory userId={user.id} />
            </TabsContent>

            <TabsContent value="games" className="space-y-4">
              <GamesPanel user={user} onPointsEarned={updateStats} />
            </TabsContent>

            <TabsContent value="store" className="space-y-4">
              <RewardsStore user={user} totalEntries={totalEntries} onPurchase={updateStats} />
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4">
              <GamificationPanel user={user} totalEntries={totalEntries} />
            </TabsContent>

            <TabsContent value="chat" className="space-y-4">
              <ChatPanel user={user} />
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  )
}
