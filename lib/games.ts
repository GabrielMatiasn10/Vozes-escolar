export interface GameScore {
  userId: string
  gameId: string
  score: number
  date: string
}

export interface Game {
  id: string
  name: string
  description: string
  icon: string
  pointsReward: number
  difficulty: "easy" | "medium" | "hard"
}

export const availableGames: Game[] = [
  {
    id: "memory-emotions",
    name: "Memória das Emoções",
    description: "Encontre os pares de emoções iguais",
    icon: "🧠",
    pointsReward: 20,
    difficulty: "easy",
  },
  {
    id: "breathing-exercise",
    name: "Exercício de Respiração",
    description: "Pratique técnicas de respiração guiada",
    icon: "🌬️",
    pointsReward: 15,
    difficulty: "easy",
  },
  {
    id: "emotion-quiz",
    name: "Quiz das Emoções",
    description: "Teste seus conhecimentos sobre inteligência emocional",
    icon: "❓",
    pointsReward: 25,
    difficulty: "medium",
  },
  {
    id: "mindfulness-challenge",
    name: "Desafio Mindfulness",
    description: "Complete exercícios de atenção plena",
    icon: "🧘",
    pointsReward: 30,
    difficulty: "medium",
  },
]

export function saveGameScore(userId: string, gameId: string, score: number): void {
  const gameScore: GameScore = {
    userId,
    gameId,
    score,
    date: new Date().toISOString(),
  }

  if (typeof window !== "undefined") {
    const scores = getGameScores(userId)
    scores.push(gameScore)
    localStorage.setItem(`vozes_game_scores_${userId}`, JSON.stringify(scores))
  }
}

export function getGameScores(userId: string): GameScore[] {
  if (typeof window !== "undefined") {
    const scores = localStorage.getItem(`vozes_game_scores_${userId}`)
    return scores ? JSON.parse(scores) : []
  }
  return []
}

export function getBestScore(userId: string, gameId: string): number {
  const scores = getGameScores(userId)
  const gameScores = scores.filter((s) => s.gameId === gameId)
  return gameScores.length > 0 ? Math.max(...gameScores.map((s) => s.score)) : 0
}

export function hasPlayedToday(userId: string, gameId: string): boolean {
  const scores = getGameScores(userId)
  const today = new Date().toDateString()
  return scores.some((s) => s.gameId === gameId && new Date(s.date).toDateString() === today)
}
