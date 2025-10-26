export interface TeacherComment {
  id: string
  studentId: string
  authorId: string
  authorName: string
  authorRole: "teacher" | "psychologist"
  comment: string
  date: string
  sharedWith: string[] // IDs of teachers/psychologists who can see this
  priority: "low" | "medium" | "high"
  category: "academic" | "behavioral" | "emotional" | "social"
}

export function addTeacherComment(
  studentId: string,
  authorId: string,
  authorName: string,
  authorRole: "teacher" | "psychologist",
  comment: string,
  priority: TeacherComment["priority"],
  category: TeacherComment["category"],
  sharedWith: string[] = [],
): void {
  const newComment: TeacherComment = {
    id: Date.now().toString(),
    studentId,
    authorId,
    authorName,
    authorRole,
    comment,
    date: new Date().toISOString(),
    sharedWith,
    priority,
    category,
  }

  if (typeof window !== "undefined") {
    const comments = getTeacherComments(studentId)
    comments.push(newComment)
    localStorage.setItem(`vozes_teacher_comments_${studentId}`, JSON.stringify(comments))
  }
}

export function getTeacherComments(studentId: string): TeacherComment[] {
  if (typeof window !== "undefined") {
    const comments = localStorage.getItem(`vozes_teacher_comments_${studentId}`)
    return comments ? JSON.parse(comments) : []
  }
  return []
}

export function getAllTeacherComments(): TeacherComment[] {
  if (typeof window !== "undefined") {
    const allComments: TeacherComment[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith("vozes_teacher_comments_")) {
        const comments = localStorage.getItem(key)
        if (comments) {
          allComments.push(...JSON.parse(comments))
        }
      }
    }
    return allComments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }
  return []
}
