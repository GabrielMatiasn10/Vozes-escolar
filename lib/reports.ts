import { getEmotionEntries, getWeeklyAverage, type EmotionEntry } from "./emotions"
import { mockUsers } from "./auth"

export interface StudentReport {
  studentId: string
  studentName: string
  totalEntries: number
  averageEmotion: number
  lastEntry?: EmotionEntry
  trend: "improving" | "stable" | "declining"
  alertLevel: "none" | "warning" | "critical"
  recentEmotions: EmotionEntry[]
  problemAreas: string[] // Areas where student is struggling
  recommendations: string[] // AI-generated recommendations
}

export interface WeeklyReport {
  week: number
  year: number
  totalStudents: number
  activeStudents: number
  averageWellbeing: number
  positivePercentage: number
  negativePercentage: number
  criticalCases: number
  insights: string[]
}

export function generateStudentReport(studentId: string): StudentReport {
  const entries = getEmotionEntries(studentId)
  const student = mockUsers.find((u) => u.id === studentId && u.role === "student")

  if (!student || entries.length === 0) {
    return {
      studentId,
      studentName: student?.name || "Aluno Desconhecido",
      totalEntries: 0,
      averageEmotion: 0,
      trend: "stable",
      alertLevel: "none",
      recentEmotions: [],
      problemAreas: [],
      recommendations: [],
    }
  }

  const averageEmotion = getWeeklyAverage(entries)
  const recentEmotions = entries.slice(-5).reverse()
  const lastEntry = entries[entries.length - 1]

  // Calculate trend
  let trend: "improving" | "stable" | "declining" = "stable"
  if (entries.length >= 3) {
    const recent = entries.slice(-3)
    const older = entries.slice(-6, -3)
    if (older.length > 0) {
      const recentAvg = getWeeklyAverage(recent)
      const olderAvg = getWeeklyAverage(older)
      if (recentAvg > olderAvg + 0.5) trend = "improving"
      else if (recentAvg < olderAvg - 0.5) trend = "declining"
    }
  }

  // Calculate alert level
  let alertLevel: "none" | "warning" | "critical" = "none"
  const lastTwoWeeks = entries.slice(-2)
  if (lastTwoWeeks.length >= 2 && lastTwoWeeks.every((e) => e.emotion <= 2)) {
    alertLevel = "critical"
  } else if (averageEmotion < 2.5) {
    alertLevel = "warning"
  }

  const problemAreas: string[] = []
  const recommendations: string[] = []

  // Check for consistent low emotions
  const lowEmotionCount = entries.filter((e) => e.emotion <= 2).length
  const lowEmotionPercentage = (lowEmotionCount / entries.length) * 100

  if (lowEmotionPercentage > 50) {
    problemAreas.push("Bem-estar emocional consistentemente baixo")
    recommendations.push("Agendar conversa individual para entender causas do mal-estar")
    recommendations.push("Considerar encaminhamento para psicólogo escolar")
  }

  // Check for declining trend
  if (trend === "declining") {
    problemAreas.push("Tendência de piora no bem-estar")
    recommendations.push("Monitorar de perto nas próximas semanas")
    recommendations.push("Investigar mudanças recentes na vida do aluno (família, amigos, escola)")
  }

  // Check for lack of engagement
  if (entries.length < 3) {
    problemAreas.push("Baixo engajamento com o sistema")
    recommendations.push("Incentivar o aluno a registrar suas emoções regularmente")
    recommendations.push("Explicar a importância do autoconhecimento emocional")
  }

  // Check for extreme variations
  const hasExtremeVariation = entries.some((e, i) => {
    if (i === 0) return false
    return Math.abs(e.emotion - entries[i - 1].emotion) >= 3
  })

  if (hasExtremeVariation) {
    problemAreas.push("Variações extremas de humor")
    recommendations.push("Avaliar possíveis gatilhos emocionais")
    recommendations.push("Ensinar técnicas de regulação emocional")
  }

  // Check recent notes for patterns
  const recentNotes = entries.slice(-3).filter((e) => e.note && e.note.trim() !== "")
  if (recentNotes.length > 0) {
    const notesText = recentNotes.map((e) => e.note?.toLowerCase() || "").join(" ")

    if (notesText.includes("sozinho") || notesText.includes("isolado")) {
      problemAreas.push("Possível isolamento social")
      recommendations.push("Promover atividades em grupo e integração social")
    }

    if (notesText.includes("cansado") || notesText.includes("sono")) {
      problemAreas.push("Fadiga ou problemas de sono")
      recommendations.push("Conversar sobre rotina de sono e hábitos saudáveis")
    }

    if (notesText.includes("prova") || notesText.includes("nota") || notesText.includes("dificuldade")) {
      problemAreas.push("Estresse acadêmico")
      recommendations.push("Oferecer apoio pedagógico adicional")
      recommendations.push("Ensinar técnicas de gerenciamento de estresse")
    }
  }

  // Positive reinforcement for good cases
  if (alertLevel === "none" && averageEmotion >= 4) {
    recommendations.push("Aluno está bem! Manter acompanhamento regular")
    recommendations.push("Considerar como exemplo positivo para outros alunos")
  }

  return {
    studentId,
    studentName: student.name,
    totalEntries: entries.length,
    averageEmotion,
    lastEntry,
    trend,
    alertLevel,
    recentEmotions,
    problemAreas,
    recommendations,
  }
}

export function generateWeeklyReport(): WeeklyReport {
  const now = new Date()
  const week = Math.ceil((now.getDate() + 6) / 7)
  const year = now.getFullYear()

  const students = mockUsers.filter((u) => u.role === "student")
  const allEntries = getEmotionEntries()

  const activeStudents = new Set(allEntries.map((e) => e.userId)).size
  const averageWellbeing = getWeeklyAverage(allEntries)

  const positiveCount = allEntries.filter((e) => e.emotion >= 4).length
  const negativeCount = allEntries.filter((e) => e.emotion <= 2).length
  const positivePercentage = allEntries.length > 0 ? (positiveCount / allEntries.length) * 100 : 0
  const negativePercentage = allEntries.length > 0 ? (negativeCount / allEntries.length) * 100 : 0

  let criticalCases = 0
  students.forEach((student) => {
    const report = generateStudentReport(student.id)
    if (report.alertLevel === "critical") criticalCases++
  })

  // Generate AI insights
  const insights: string[] = []

  if (averageWellbeing >= 4) {
    insights.push("O bem-estar geral dos alunos está excelente. Continue com as práticas atuais.")
  } else if (averageWellbeing >= 3) {
    insights.push("O bem-estar dos alunos está em nível satisfatório, mas há espaço para melhorias.")
  } else {
    insights.push("Atenção: O bem-estar geral está abaixo do esperado. Considere intervenções.")
  }

  if (criticalCases > 0) {
    insights.push(`${criticalCases} aluno(s) necessitam de atenção imediata. Recomenda-se acompanhamento individual.`)
  }

  if (negativePercentage > 30) {
    insights.push("Alta porcentagem de emoções negativas. Considere atividades de bem-estar coletivo.")
  }

  if (positivePercentage > 70) {
    insights.push("Excelente! A maioria dos alunos está com emoções positivas.")
  }

  return {
    week,
    year,
    totalStudents: students.length,
    activeStudents,
    averageWellbeing,
    positivePercentage,
    negativePercentage,
    criticalCases,
    insights,
  }
}

export function getAllStudentReports(): StudentReport[] {
  const students = mockUsers.filter((u) => u.role === "student")
  return students
    .map((student) => generateStudentReport(student.id))
    .sort((a, b) => {
      // Sort by alert level first (critical > warning > none)
      const alertOrder = { critical: 0, warning: 1, none: 2 }
      if (alertOrder[a.alertLevel] !== alertOrder[b.alertLevel]) {
        return alertOrder[a.alertLevel] - alertOrder[b.alertLevel]
      }
      // Then by average emotion (lower first)
      return a.averageEmotion - b.averageEmotion
    })
}
