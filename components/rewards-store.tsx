"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ShoppingBag, Package, History, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { availableRewards, getUserPurchases, purchaseItem, getTotalSpent, type RewardItem } from "@/lib/rewards"
import { getUserProgress } from "@/lib/gamification"
import type { User } from "@/lib/auth"

interface RewardsStoreProps {
  user: User
  totalEntries: number
  onPurchase: () => void
}

export function RewardsStore({ user, totalEntries, onPurchase }: RewardsStoreProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [purchaseMessage, setPurchaseMessage] = useState<string>("")

  const progress = getUserProgress(user.id)
  const purchases = getUserPurchases(user.id)
  const totalSpent = getTotalSpent(user.id)
  const availablePoints = progress.points - totalSpent

  const handlePurchase = (item: RewardItem) => {
    const success = purchaseItem(user.id, item, availablePoints)

    if (success) {
      setPurchaseMessage(`Parabéns! Você adquiriu: ${item.name}`)
      onPurchase()
      setTimeout(() => setPurchaseMessage(""), 3000)
    } else {
      setPurchaseMessage("Pontos insuficientes para esta compra")
      setTimeout(() => setPurchaseMessage(""), 3000)
    }
  }

  const filteredRewards =
    selectedCategory === "all" ? availableRewards : availableRewards.filter((r) => r.category === selectedCategory)

  const getCategoryColor = (category: RewardItem["category"]) => {
    switch (category) {
      case "educational":
        return "bg-blue-500"
      case "sports":
        return "bg-orange-500"
      case "wellness":
        return "bg-green-500"
      case "special":
        return "bg-purple-500"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Loja de Recompensas
          </CardTitle>
          <CardDescription>Troque seus pontos por prêmios incríveis!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Pontos Disponíveis</p>
                  <p className="text-3xl font-bold text-primary">{availablePoints}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Total Ganho</p>
                  <p className="text-3xl font-bold text-green-600">{progress.points}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Total Gasto</p>
                  <p className="text-3xl font-bold text-orange-600">{totalSpent}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {purchaseMessage && (
            <Alert className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{purchaseMessage}</AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="store" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="store">Loja</TabsTrigger>
              <TabsTrigger value="history">Histórico</TabsTrigger>
            </TabsList>

            <TabsContent value="store" className="space-y-4">
              <div className="flex gap-2 flex-wrap mb-4">
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("all")}
                >
                  Todos
                </Button>
                <Button
                  variant={selectedCategory === "educational" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("educational")}
                >
                  Educacional
                </Button>
                <Button
                  variant={selectedCategory === "sports" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("sports")}
                >
                  Esportes
                </Button>
                <Button
                  variant={selectedCategory === "wellness" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("wellness")}
                >
                  Bem-Estar
                </Button>
                <Button
                  variant={selectedCategory === "special" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("special")}
                >
                  Especial
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredRewards.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <span className="text-5xl">{item.icon}</span>
                          <Badge className={getCategoryColor(item.category)}>{item.category}</Badge>
                        </div>
                        <CardTitle className="text-lg mt-2">{item.name}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col justify-end">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Custo:</span>
                            <Badge variant="secondary" className="text-lg">
                              {item.cost} pts
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Estoque:</span>
                            <span className="font-semibold">{item.stock} unidades</span>
                          </div>
                          <Button
                            className="w-full"
                            onClick={() => handlePurchase(item)}
                            disabled={availablePoints < item.cost || item.stock === 0}
                          >
                            {availablePoints < item.cost ? "Pontos Insuficientes" : "Resgatar"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="w-5 h-5" />
                    Histórico de Compras
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {purchases.length > 0 ? (
                    <div className="space-y-3">
                      {purchases.map((purchase, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 rounded-lg border border-gray-200"
                        >
                          <div>
                            <p className="font-semibold">{purchase.itemName}</p>
                            <p className="text-sm text-gray-600">
                              {new Date(purchase.date).toLocaleDateString("pt-BR")}
                            </p>
                          </div>
                          <Badge variant="secondary">-{purchase.cost} pts</Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Nenhuma compra realizada ainda</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
