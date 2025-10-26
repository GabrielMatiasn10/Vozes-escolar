export type UserRole = "student" | "teacher" | "psychologist"

export interface User {
  id: string
  name: string
  role: UserRole
  email: string
}

export const mockUsers: User[] = [
  { id: "1", name: "Ana Silva", role: "student", email: "ana@escola.com" },
  { id: "2", name: "Carlos Santos", role: "student", email: "carlos@escola.com" },
  { id: "3", name: "Maria Oliveira", role: "teacher", email: "maria@escola.com" },
  { id: "4", name: "João Costa", role: "psychologist", email: "joao@escola.com" },
]

export function saveUser(user: User) {
  if (typeof window !== "undefined") {
    localStorage.setItem("vozes_user", JSON.stringify(user))
  }
}

export function getUser(): User | null {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("vozes_user")
    return user ? JSON.parse(user) : null
  }
  return null
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("vozes_user")
  }
}
