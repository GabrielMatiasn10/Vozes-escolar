export interface RewardItem {
  id: string
  name: string
  description: string
  icon: string
  cost: number
  category: "educational" | "sports" | "wellness" | "special"
  stock: number
}

export interface UserPurchase {
  userId: string
  itemId: string
  itemName: string
  cost: number
  date: string
}

export const availableRewards: RewardItem[] = [
  // Educational
  {
    id: "book-math",
    name: "Livro de Matemática",
    description: "Livro educacional de matemática avançada",
    icon: "📚",
    cost: 100,
    category: "educational",
    stock: 10,
  },
  {
    id: "book-science",
    name: "Livro de Ciências",
    description: "Guia completo de ciências naturais",
    icon: "🔬",
    cost: 100,
    category: "educational",
    stock: 10,
  },
  {
    id: "book-history",
    name: "Livro de História",
    description: "História do Brasil ilustrada",
    icon: "📖",
    cost: 100,
    category: "educational",
    stock: 10,
  },
  {
    id: "notebook",
    name: "Caderno Premium",
    description: "Caderno universitário de alta qualidade",
    icon: "📓",
    cost: 50,
    category: "educational",
    stock: 20,
  },
  // Sports
  {
    id: "shirt-blue",
    name: "Camisa Interclasse Azul",
    description: "Camisa oficial do time azul",
    icon: "👕",
    cost: 150,
    category: "sports",
    stock: 15,
  },
  {
    id: "shirt-red",
    name: "Camisa Interclasse Vermelha",
    description: "Camisa oficial do time vermelho",
    icon: "👕",
    cost: 150,
    category: "sports",
    stock: 15,
  },
  {
    id: "water-bottle",
    name: "Garrafa Esportiva",
    description: "Garrafa térmica para atividades físicas",
    icon: "🥤",
    cost: 80,
    category: "sports",
    stock: 25,
  },
  // Wellness
  {
    id: "meditation-guide",
    name: "Guia de Meditação",
    description: "Aprenda técnicas de relaxamento",
    icon: "🧘",
    cost: 70,
    category: "wellness",
    stock: 15,
  },
  {
    id: "journal",
    name: "Diário de Gratidão",
    description: "Registre momentos positivos do seu dia",
    icon: "📔",
    cost: 60,
    category: "wellness",
    stock: 20,
  },
  // Special
  {
    id: "trophy",
    name: "Troféu de Bem-Estar",
    description: "Reconhecimento especial por dedicação",
    icon: "🏆",
    cost: 300,
    category: "special",
    stock: 5,
  },
  {
    id: "certificate",
    name: "Certificado de Participação",
    description: "Certificado oficial do programa",
    icon: "📜",
    cost: 200,
    category: "special",
    stock: 10,
  },
]

export function getUserPurchases(userId: string): UserPurchase[] {
  if (typeof window !== "undefined") {
    const purchases = localStorage.getItem(`vozes_purchases_${userId}`)
    return purchases ? JSON.parse(purchases) : []
  }
  return []
}

export function purchaseItem(userId: string, item: RewardItem, currentPoints: number): boolean {
  if (currentPoints < item.cost) {
    return false
  }

  const purchase: UserPurchase = {
    userId,
    itemId: item.id,
    itemName: item.name,
    cost: item.cost,
    date: new Date().toISOString(),
  }

  if (typeof window !== "undefined") {
    const purchases = getUserPurchases(userId)
    purchases.push(purchase)
    localStorage.setItem(`vozes_purchases_${userId}`, JSON.stringify(purchases))
  }

  return true
}

export function getTotalSpent(userId: string): number {
  const purchases = getUserPurchases(userId)
  return purchases.reduce((total, purchase) => total + purchase.cost, 0)
}
