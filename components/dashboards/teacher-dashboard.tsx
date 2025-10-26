"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  LogOut,
  Home,
  Users,
  TrendingUp,
  AlertTriangle,
  BarChart3,
  UserIcon,
  MessageSquare,
  FileText,
  Send,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { logout, type User, mockUsers } from "@/lib/auth"
import { generateWeeklyReport, getAllStudentReports, type WeeklyReport, type StudentReport } from "@/lib/reports"
import { emotionEmojis } from "@/lib/emotions"
import { addSupportNote, getSupportNotes, type SupportNote } from "@/lib/support-notes"
import { addTeacherComment, getTeacherComments, type TeacherComment } from "@/lib/teacher-comments"

interface TeacherDashboardProps {
  user: User
}

export function TeacherDashboard({ user }: TeacherDashboardProps) {
  const router = useRouter()
  const [weeklyReport, setWeeklyReport] = useState<WeeklyReport | null>(null)
  const [studentReports, setStudentReports] = useState<StudentReport[]>([])
  const [selectedStudent, setSelectedStudent] = useState<StudentReport | null>(null)
  const [supportNotes, setSupportNotes] = useState<SupportNote[]>([])
  const [teacherComments, setTeacherComments] = useState<TeacherComment[]>([])
  const [newNote, setNewNote] = useState("")
  const [noteType, setNoteType] = useState<SupportNote["type"]>("observation")

  const [newComment, setNewComment] = useState("")
  const [commentPriority, setCommentPriority] = useState<TeacherComment["priority"]>("medium")
  const [commentCategory, setCommentCategory] = useState<TeacherComment["category"]>("emotional")
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([])

  useEffect(() => {
    loadReports()
  }, [])

  useEffect(() => {
    if (selectedStudent) {
      const notes = getSupportNotes(selectedStudent.studentId)
      setSupportNotes(notes)
      const comments = getTeacherComments(selectedStudent.studentId)
      setTeacherComments(comments)
    }
  }, [selectedStudent])

  const loadReports = () => {
    const weekly = generateWeeklyReport()
    setWeeklyReport(weekly)

    const students = getAllStudentReports()
    setStudentReports(students)
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleAddNote = () => {
    if (!selectedStudent || !newNote.trim()) return

    addSupportNote(selectedStudent.studentId, user.id, user.name, newNote, noteType)
    setNewNote("")
    const notes = getSupportNotes(selectedStudent.studentId)
    setSupportNotes(notes)
  }

  const handleAddComment = () => {
    if (!selectedStudent || !newComment.trim()) return

    addTeacherComment(
      selectedStudent.studentId,
      user.id,
      user.name,
      user.role as "teacher" | "psychologist",
      newComment,
      commentPriority,
      commentCategory,
      selectedRecipients,
    )
    setNewComment("")
    setSelectedRecipients([])
    const comments = getTeacherComments(selectedStudent.studentId)
    setTeacherComments(comments)
  }

  const dashboardTitle = user.role === "teacher" ? "Painel do Professor" : "Painel do Psicólogo"
  const isPsychologist = user.role === "psychologist"

  const otherStaff = mockUsers.filter((u) => (u.role === "teacher" || u.role === "psychologist") && u.id !== user.id)

  const getAlertBadge = (level: StudentReport["alertLevel"]) => {
    switch (level) {
      case "critical":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            Crítico
          </Badge>
        )
      case "warning":
        return (
          <Badge className="bg-yellow-500 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Atenção
          </Badge>
        )
      default:
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Normal
          </Badge>
        )
    }
  }

  const getTrendIcon = (trend: StudentReport["trend"]) => {
    switch (trend) {
      case "improving":
        return <span className="text-green-500 font-bold">↗</span>
      case "declining":
        return <span className="text-red-500 font-bold">↘</span>
      default:
        return <span className="text-gray-500">→</span>
    }
  }

  const getNoteTypeLabel = (type: SupportNote["type"]) => {
    switch (type) {
      case "observation":
        return "Observação"
      case "intervention":
        return "Intervenção"
      case "follow-up":
        return "Acompanhamento"
    }
  }

  const getNoteTypeBadge = (type: SupportNote["type"]) => {
    switch (type) {
      case "observation":
        return <Badge variant="secondary">Observação</Badge>
      case "intervention":
        return <Badge className="bg-orange-500">Intervenção</Badge>
      case "follow-up":
        return <Badge className="bg-blue-500">Acompanhamento</Badge>
    }
  }

  const getPriorityBadge = (priority: TeacherComment["priority"]) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">Alta</Badge>
      case "medium":
        return <Badge className="bg-yellow-500">Média</Badge>
      case "low":
        return <Badge variant="secondary">Baixa</Badge>
    }
  }

  const getCategoryLabel = (category: TeacherComment["category"]) => {
    switch (category) {
      case "academic":
        return "Acadêmico"
      case "behavioral":
        return "Comportamental"
      case "emotional":
        return "Emocional"
      case "social":
        return "Social"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{dashboardTitle}</h2>
          <p className="text-gray-600 mb-8">Acompanhe o bem-estar dos alunos</p>

          {weeklyReport && (
            <>
              {/* Stats Cards */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Alunos Ativos</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{weeklyReport.activeStudents}</div>
                    <p className="text-xs text-muted-foreground">de {weeklyReport.totalStudents} alunos</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Bem-Estar Médio</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{weeklyReport.averageWellbeing.toFixed(1)}/5</div>
                    <p className="text-xs text-muted-foreground">
                      {weeklyReport.averageWellbeing >= 4
                        ? "Excelente"
                        : weeklyReport.averageWellbeing >= 3
                          ? "Bom"
                          : "Atenção"}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Emoções Positivas</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{weeklyReport.positivePercentage.toFixed(0)}%</div>
                    <p className="text-xs text-muted-foreground">dos registros</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Casos Críticos</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-500">{weeklyReport.criticalCases}</div>
                    <p className="text-xs text-muted-foreground">necessitam atenção</p>
                  </CardContent>
                </Card>
              </div>

              {/* AI Insights */}
              {weeklyReport.insights.length > 0 && (
                <Alert className="mb-8">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Insights da IA</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      {weeklyReport.insights.map((insight, index) => (
                        <li key={index}>{insight}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
            </>
          )}

          {/* Tabs */}
          <Tabs defaultValue="students" className="space-y-4">
            <TabsList>
              <TabsTrigger value="students">Lista de Alunos</TabsTrigger>
              <TabsTrigger value="analytics">Análises</TabsTrigger>
            </TabsList>

            <TabsContent value="students" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Alunos</CardTitle>
                  <CardDescription>Ordenados por prioridade (casos críticos primeiro)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {studentReports.map((report, index) => {
                      const emotionData = emotionEmojis.find((e) => e.value === Math.round(report.averageEmotion))

                      return (
                        <motion.div
                          key={report.studentId}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => setSelectedStudent(report)}
                          className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-primary hover:shadow-md transition-all cursor-pointer"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                              <UserIcon className="w-6 h-6 text-gray-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{report.studentName}</h4>
                              <p className="text-sm text-gray-600">
                                {report.totalEntries} registros • Média: {report.averageEmotion.toFixed(1)}/5
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{emotionData?.emoji || "😐"}</span>
                            {getTrendIcon(report.trend)}
                            {getAlertBadge(report.alertLevel)}
                          </div>
                        </motion.div>
                      )
                    })}

                    {studentReports.length === 0 && (
                      <div className="text-center py-12 text-gray-500">
                        <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Nenhum aluno com registros ainda</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Student Detail Modal */}
              {selectedStudent && (
                <Card className="border-primary">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Detalhes: {selectedStudent.studentName}</CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedStudent(null)}>
                        Fechar
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="overview" className="space-y-4">
                      <TabsList>
                        <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                        <TabsTrigger value="comments">Comentários</TabsTrigger>
                        {isPsychologist && <TabsTrigger value="support">Acompanhamento</TabsTrigger>}
                      </TabsList>

                      <TabsContent value="overview" className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Total de Registros</p>
                            <p className="text-2xl font-bold">{selectedStudent.totalEntries}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Média de Bem-Estar</p>
                            <p className="text-2xl font-bold">{selectedStudent.averageEmotion.toFixed(1)}/5</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Tendência</p>
                            <p className="text-lg font-semibold capitalize">{selectedStudent.trend}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Nível de Alerta</p>
                            <div className="mt-1">{getAlertBadge(selectedStudent.alertLevel)}</div>
                          </div>
                        </div>

                        {selectedStudent.problemAreas.length > 0 && (
                          <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>Áreas de Dificuldade</AlertTitle>
                            <AlertDescription>
                              <ul className="list-disc list-inside space-y-1 mt-2">
                                {selectedStudent.problemAreas.map((area, index) => (
                                  <li key={index}>{area}</li>
                                ))}
                              </ul>
                            </AlertDescription>
                          </Alert>
                        )}

                        {selectedStudent.recommendations.length > 0 && (
                          <Card className="bg-blue-50 border-blue-200">
                            <CardHeader>
                              <CardTitle className="text-lg flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                                Recomendações da IA
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {selectedStudent.recommendations.map((rec, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <span className="text-blue-600 mt-1">•</span>
                                    <span className="text-sm text-gray-700">{rec}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        )}

                        <div>
                          <h4 className="font-semibold mb-3">Últimos Registros</h4>
                          <div className="space-y-2">
                            {selectedStudent.recentEmotions.map((entry) => {
                              const emotionData = emotionEmojis.find((e) => e.value === entry.emotion)
                              return (
                                <div key={entry.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                  <span className="text-2xl">{entry.emoji}</span>
                                  <div className="flex-1">
                                    <p className={`font-medium ${emotionData?.color}`}>{emotionData?.label}</p>
                                    <p className="text-xs text-gray-500">
                                      {new Date(entry.date).toLocaleDateString("pt-BR")}
                                    </p>
                                    {entry.note && <p className="text-sm text-gray-600 mt-1">{entry.note}</p>}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="comments" className="space-y-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <MessageSquare className="w-5 h-5" />
                              Adicionar Comentário
                            </CardTitle>
                            <CardDescription>
                              Compartilhe observações com outros professores e psicólogos
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="comment-priority">Prioridade</Label>
                                <Select
                                  value={commentPriority}
                                  onValueChange={(value) => setCommentPriority(value as TeacherComment["priority"])}
                                >
                                  <SelectTrigger id="comment-priority">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="low">Baixa</SelectItem>
                                    <SelectItem value="medium">Média</SelectItem>
                                    <SelectItem value="high">Alta</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="comment-category">Categoria</Label>
                                <Select
                                  value={commentCategory}
                                  onValueChange={(value) => setCommentCategory(value as TeacherComment["category"])}
                                >
                                  <SelectTrigger id="comment-category">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="emotional">Emocional</SelectItem>
                                    <SelectItem value="academic">Acadêmico</SelectItem>
                                    <SelectItem value="behavioral">Comportamental</SelectItem>
                                    <SelectItem value="social">Social</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label>Compartilhar com:</Label>
                              <div className="space-y-2 max-h-32 overflow-y-auto border rounded-md p-3">
                                {otherStaff.map((staff) => (
                                  <div key={staff.id} className="flex items-center space-x-2">
                                    <Checkbox
                                      id={staff.id}
                                      checked={selectedRecipients.includes(staff.id)}
                                      onCheckedChange={(checked) => {
                                        if (checked) {
                                          setSelectedRecipients([...selectedRecipients, staff.id])
                                        } else {
                                          setSelectedRecipients(selectedRecipients.filter((id) => id !== staff.id))
                                        }
                                      }}
                                    />
                                    <label
                                      htmlFor={staff.id}
                                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                      {staff.name} ({staff.role === "teacher" ? "Professor" : "Psicólogo"})
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="comment">Comentário</Label>
                              <Textarea
                                id="comment"
                                placeholder="Descreva suas observações sobre o aluno..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                rows={4}
                              />
                            </div>

                            <Button onClick={handleAddComment} disabled={!newComment.trim()} className="w-full">
                              <Send className="w-4 h-4 mr-2" />
                              Enviar Comentário
                            </Button>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle>Histórico de Comentários</CardTitle>
                          </CardHeader>
                          <CardContent>
                            {teacherComments.length > 0 ? (
                              <div className="space-y-3">
                                {teacherComments.map((comment) => (
                                  <div key={comment.id} className="p-4 rounded-lg border border-gray-200 space-y-2">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        {getPriorityBadge(comment.priority)}
                                        <Badge variant="outline">{getCategoryLabel(comment.category)}</Badge>
                                      </div>
                                      <span className="text-xs text-gray-500">
                                        {new Date(comment.date).toLocaleDateString("pt-BR")}
                                      </span>
                                    </div>
                                    <p className="text-sm text-gray-900">{comment.comment}</p>
                                    <div className="flex items-center justify-between text-xs text-gray-600">
                                      <span>
                                        Por: {comment.authorName} (
                                        {comment.authorRole === "teacher" ? "Professor" : "Psicólogo"})
                                      </span>
                                      {comment.sharedWith.length > 0 && (
                                        <span className="flex items-center gap-1">
                                          <Send className="w-3 h-3" />
                                          Compartilhado com {comment.sharedWith.length} pessoa(s)
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-8 text-gray-500">
                                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <p>Nenhum comentário ainda</p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </TabsContent>

                      {isPsychologist && (
                        <TabsContent value="support" className="space-y-4">
                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <MessageSquare className="w-5 h-5" />
                                Adicionar Nota de Acompanhamento
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="note-type">Tipo de Nota</Label>
                                <Select
                                  value={noteType}
                                  onValueChange={(value) => setNoteType(value as SupportNote["type"])}
                                >
                                  <SelectTrigger id="note-type">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="observation">Observação</SelectItem>
                                    <SelectItem value="intervention">Intervenção</SelectItem>
                                    <SelectItem value="follow-up">Acompanhamento</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="note">Nota</Label>
                                <Textarea
                                  id="note"
                                  placeholder="Descreva suas observações, intervenções ou plano de acompanhamento..."
                                  value={newNote}
                                  onChange={(e) => setNewNote(e.target.value)}
                                  rows={4}
                                />
                              </div>

                              <Button onClick={handleAddNote} disabled={!newNote.trim()} className="w-full">
                                <FileText className="w-4 h-4 mr-2" />
                                Adicionar Nota
                              </Button>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle>Histórico de Acompanhamento</CardTitle>
                            </CardHeader>
                            <CardContent>
                              {supportNotes.length > 0 ? (
                                <div className="space-y-3">
                                  {supportNotes.map((note) => (
                                    <div key={note.id} className="p-4 rounded-lg border border-gray-200 space-y-2">
                                      <div className="flex items-center justify-between">
                                        {getNoteTypeBadge(note.type)}
                                        <span className="text-xs text-gray-500">
                                          {new Date(note.date).toLocaleDateString("pt-BR")}
                                        </span>
                                      </div>
                                      <p className="text-sm text-gray-900">{note.note}</p>
                                      <p className="text-xs text-gray-600">Por: {note.psychologistName}</p>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-center py-8 text-gray-500">
                                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                  <p>Nenhuma nota de acompanhamento ainda</p>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </TabsContent>
                      )}
                    </Tabs>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Análises Detalhadas</CardTitle>
                  <CardDescription>Visualizações e relatórios completos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-gray-500">
                    <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Gráficos e análises avançadas</p>
                    <p className="text-sm mt-2">Em breve: visualizações interativas e relatórios exportáveis</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  )
}
