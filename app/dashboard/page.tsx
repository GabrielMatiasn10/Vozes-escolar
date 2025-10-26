"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getUser, type User } from "@/lib/auth"
import { StudentDashboard } from "@/components/dashboards/student-dashboard"
import { TeacherDashboard } from "@/components/dashboards/teacher-dashboard"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = getUser()
    if (!currentUser) {
      router.push("/login")
    } else {
      setUser(currentUser)
      setLoading(false)
    }
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) return null

  if (user.role === "student") {
    return <StudentDashboard user={user} />
  }

  return <TeacherDashboard user={user} />
}
