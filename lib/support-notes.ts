export interface SupportNote {
  id: string
  studentId: string
  psychologistId: string
  psychologistName: string
  note: string
  date: string
  type: "observation" | "intervention" | "follow-up"
}

export function addSupportNote(
  studentId: string,
  psychologistId: string,
  psychologistName: string,
  note: string,
  type: SupportNote["type"],
): void {
  const supportNote: SupportNote = {
    id: Date.now().toString(),
    studentId,
    psychologistId,
    psychologistName,
    note,
    date: new Date().toISOString(),
    type,
  }

  if (typeof window !== "undefined") {
    const notes = getSupportNotes(studentId)
    notes.push(supportNote)
    localStorage.setItem(`vozes_support_notes_${studentId}`, JSON.stringify(notes))
  }
}

export function getSupportNotes(studentId: string): SupportNote[] {
  if (typeof window !== "undefined") {
    const notes = localStorage.getItem(`vozes_support_notes_${studentId}`)
    return notes ? JSON.parse(notes) : []
  }
  return []
}

export function getAllSupportNotes(): SupportNote[] {
  if (typeof window !== "undefined") {
    const allNotes: SupportNote[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith("vozes_support_notes_")) {
        const notes = localStorage.getItem(key)
        if (notes) {
          allNotes.push(...JSON.parse(notes))
        }
      }
    }
    return allNotes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }
  return []
}
