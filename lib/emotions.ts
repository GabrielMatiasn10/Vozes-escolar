export interface EmotionEntry {
  id: string
  userId: string
  date: string
  emotion: number // 1-5 scale
  emoji: string
  note?: string
  week: number
  year: number
}

export const emotionEmojis = [
  { value: 1, emoji: "😢", label: "Muito Triste", color: "text-red-500" },
  { value: 2, emoji: "😟", label: "Triste", color: "text-orange-500" },
  { value: 3, emoji: "😐", label: "Neutro", color: "text-yellow-500" },
  { value: 4, emoji: "😊", label: "Feliz", color: "text-green-500" },
  { value: 5, emoji: "😄", label: "Muito Feliz", color: "text-blue-500" },
]

export function getWeekNumber(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
}

export function saveEmotionEntry(entry: EmotionEntry) {
  if (typeof window !== "undefined") {
    const entries = getEmotionEntries()
    entries.push(entry)
    localStorage.setItem("vozes_emotions", JSON.stringify(entries))
  }
}

export function getEmotionEntries(userId?: string): EmotionEntry[] {
  if (typeof window !== "undefined") {
    const entries = localStorage.getItem("vozes_emotions")
    const allEntries: EmotionEntry[] = entries ? JSON.parse(entries) : []
    return userId ? allEntries.filter((e) => e.userId === userId) : allEntries
  }
  return []
}

export function getWeeklyAverage(entries: EmotionEntry[]): number {
  if (entries.length === 0) return 0
  const sum = entries.reduce((acc, entry) => acc + entry.emotion, 0)
  return sum / entries.length
}

export function hasEntryThisWeek(userId: string): boolean {
  const entries = getEmotionEntries(userId)
  const now = new Date()
  const currentWeek = getWeekNumber(now)
  const currentYear = now.getFullYear()

  return entries.some((e) => e.week === currentWeek && e.year === currentYear)
}
