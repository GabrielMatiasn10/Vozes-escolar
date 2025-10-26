"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { User, GraduationCap, Brain, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockUsers, saveUser, type UserRole } from "@/lib/auth"

export default function LoginPage() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)

  const handleLogin = (role: UserRole) => {
    const user = mockUsers.find((u) => u.role === role)
    if (user) {
      saveUser(user)
      router.push("/dashboard")
    }
  }

  const roles = [
    {
      role: "student" as UserRole,
      title: "Aluno",
      description: "Registre suas emoções e acompanhe seu bem-estar",
      icon: GraduationCap,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      role: "teacher" as UserRole,
      title: "Professor",
      description: "Acompanhe o bem-estar dos seus alunos",
      icon: User,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      role: "psychologist" as UserRole,
      title: "Psicólogo",
      description: "Analise relatórios e identifique casos críticos",
      icon: Brain,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-orange-50 p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Vozes da Escola</h1>
          <p className="text-gray-600">Selecione seu perfil para acessar a plataforma</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((roleData, index) => {
            const Icon = roleData.icon
            return (
              <motion.div
                key={roleData.role}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedRole === roleData.role ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedRole(roleData.role)}
                >
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-full ${roleData.bgColor} flex items-center justify-center mb-4`}>
                      <Icon className={`w-8 h-8 ${roleData.color}`} />
                    </div>
                    <CardTitle>{roleData.title}</CardTitle>
                    <CardDescription>{roleData.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleLogin(roleData.role)
                      }}
                    >
                      Entrar como {roleData.title}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <div className="text-center mt-8">
          <Button variant="ghost" onClick={() => router.push("/")}>
            Voltar para o site
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
