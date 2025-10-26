export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  requirement: number
  type: "entries" | "streak" | "special"
}

export interface UserProgress {
  userId: string
  points: number
  badges: string[]
  streak: number
  lastEntryDate?: string
}

export const availableBadges: Badge[] = [
  {
    id: "first-step",
    name: "Primeiro Passo",
    description: "Registrou sua primeira emoção",
    icon: "🌟",
    requirement: 1,
    type: "entries",
  },
  {
    id: "consistent",
    name: "Consistente",
    description: "Registrou emoções por 4 semanas",
    icon: "🔥",
    requirement: 4,
    type: "entries",
  },
  {
    id: "dedicated",
    name: "Dedicado",
    description: "Registrou emoções por 8 semanas",
    icon: "💪",
    requirement: 8,
    type: "entries",
  },
  {
    id: "champion",
    name: "Campeão",
    description: "Registrou emoções por 12 semanas",
    icon: "🏆",
    requirement: 12,
    type: "entries",
  },
  {
    id: "positive-vibes",
    name: "Energia Positiva",
    description: "Manteve média acima de 4 por 4 semanas",
    icon: "✨",
    requirement: 4,
    type: "special",
  },
]

export function getUserProgress(userId: string): UserProgress {
  if (typeof window !== "undefined") {
    const progress = localStorage.getItem(`vozes_progress_${userId}`)
    if (progress) {
      return JSON.parse(progress)
    }
  }
  return {
    userId,
    points: 0,
    badges: [],
    streak: 0,
  }
}

export function updateUserProgress(userId: string, totalEntries: number): UserProgress {
  const progress = getUserProgress(userId)

  // Update points
  progress.points = totalEntries * 10

  // Check and award badges
  availableBadges.forEach((badge) => {
    if (badge.type === "entries" && totalEntries >= badge.requirement) {
      if (!progress.badges.includes(badge.id)) {
        progress.badges.push(badge.id)
      }
    }
  })

  // Save progress
  if (typeof window !== "undefined") {
    localStorage.setItem(`vozes_progress_${userId}`, JSON.stringify(progress))
  }

  return progress
}

export function getLeaderboard(): Array<{ userId: string; userName: string; points: number }> {
  if (typeof window !== "undefined") {
    const leaderboard = localStorage.getItem("vozes_leaderboard")
    return leaderboard ? JSON.parse(leaderboard) : []
  }
  return []
}

export function updateLeaderboard(userId: string, userName: string, points: number) {
  if (typeof window !== "undefined") {
    let leaderboard = getLeaderboard()

    // Remove existing entry for this user
    leaderboard = leaderboard.filter((entry) => entry.userId !== userId)

    // Add new entry
    leaderboard.push({ userId, userName, points })

    // Sort by points
    leaderboard.sort((a, b) => b.points - a.points)

    // Keep top 10
    leaderboard = leaderboard.slice(0, 10)

    localStorage.setItem("vozes_leaderboard", JSON.stringify(leaderboard))
  }
}
