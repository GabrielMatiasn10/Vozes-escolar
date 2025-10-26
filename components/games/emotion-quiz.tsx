"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, CheckCircle, XCircle } from "lucide-react"
import { saveGameScore, type Game } from "@/lib/games"
import type { User } from "@/lib/auth"
import { updateUserProgress } from "@/lib/gamification"

interface EmotionQuizProps {
  user: User
  game: Game
  onComplete: () => void
}

const questions = [
  {
    question: "Qual emoção está relacionada ao medo de algo que pode acontecer?",
    options: ["Alegria", "Ansiedade", "Raiva", "Tristeza"],
    correct: 1,
  },
  {
    question: "O que é inteligência emocional?",
    options: ["Ser muito inteligente", "Reconhecer e gerenciar emoções", "Não sentir emoções", "Ser sempre feliz"],
    correct: 1,
  },
  {
    question: "Qual é uma boa forma de lidar com a raiva?",
    options: ["Gritar com alguém", "Respirar fundo e contar até 10", "Ignorar a emoção", "Bater em algo"],
    correct: 1,
  },
  {
    question: "Por que é importante falar sobre nossos sentimentos?",
    options: ["Para chamar atenção", "Para ajudar a processar emoções", "Não é importante", "Para parecer fraco"],
    correct: 1,
  },
  {
    question: "O que é empatia?",
    options: ["Sentir pena de alguém", "Se colocar no lugar do outro", "Concordar com tudo", "Ignorar os outros"],
    correct: 1,
  },
]

export function EmotionQuiz({ user, game, onComplete }: EmotionQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index)
  }

  const handleNext = () => {
    if (selectedAnswer === questions[currentQuestion].correct) {
      setCorrectAnswers(correctAnswers + 1)
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      const score = Math.round((correctAnswers / questions.length) * 100)
      saveGameScore(user.id, game.id, score)

      const progress = updateUserProgress(user.id, 0)
      progress.points += game.pointsReward
      if (typeof window !== "undefined") {
        localStorage.setItem(`vozes_progress_${user.id}`, JSON.stringify(progress))
      }

      setIsComplete(true)
    }
  }

  const handleShowResult = () => {
    setShowResult(true)
  }

  if (isComplete) {
    const score = Math.round((correctAnswers / questions.length) * 100)
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            Quiz Completo!
          </CardTitle>
          <CardDescription>Você respondeu todas as perguntas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-4xl font-bold text-primary mb-2">{score}%</p>
            <p className="text-gray-600">
              {correctAnswers} de {questions.length} corretas
            </p>
            <p className="text-green-600 font-semibold mt-4">+{game.pointsReward} pontos ganhos!</p>
          </div>
          <Button onClick={onComplete} className="w-full">
            Voltar
          </Button>
        </CardContent>
      </Card>
    )
  }

  const question = questions[currentQuestion]

  return (
    <Card>
      <CardHeader>
        <CardTitle>{game.name}</CardTitle>
        <CardDescription>
          Pergunta {currentQuestion + 1} de {questions.length}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="text-lg font-semibold text-gray-900">{question.question}</p>
        </div>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => !showResult && handleAnswer(index)}
              disabled={showResult}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                selectedAnswer === index ? "border-primary bg-primary/10" : "border-gray-200 hover:border-gray-300"
              } ${
                showResult && index === question.correct
                  ? "border-green-500 bg-green-50"
                  : showResult && selectedAnswer === index && index !== question.correct
                    ? "border-red-500 bg-red-50"
                    : ""
              }`}
              whileHover={{ scale: showResult ? 1 : 1.02 }}
              whileTap={{ scale: showResult ? 1 : 0.98 }}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showResult && index === question.correct && <CheckCircle className="w-5 h-5 text-green-500" />}
                {showResult && selectedAnswer === index && index !== question.correct && (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
            </motion.button>
          ))}
        </div>

        <div className="flex gap-2">
          {!showResult ? (
            <Button onClick={handleShowResult} disabled={selectedAnswer === null} className="w-full">
              Verificar Resposta
            </Button>
          ) : (
            <Button onClick={handleNext} className="w-full">
              {currentQuestion < questions.length - 1 ? "Próxima Pergunta" : "Ver Resultado"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
