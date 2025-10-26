"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

interface DemoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DemoModal({ open, onOpenChange }: DemoModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Demonstração do Vozes da Escola</DialogTitle>
          <DialogDescription>Veja como nossa plataforma funciona na prática</DialogDescription>
        </DialogHeader>
        <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
          <div className="text-center text-white">
            <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg mb-2">Vídeo de demonstração</p>
            <p className="text-sm opacity-75">Em breve: vídeo completo da plataforma</p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold mb-2">O que você verá:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
            <li>Como os alunos registram suas emoções</li>
            <li>Dashboard do professor com relatórios de IA</li>
            <li>Sistema de gamificação e conquistas</li>
            <li>Chat entre alunos e profissionais</li>
          </ul>
        </div>
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
          <Button onClick={() => window.open("/login", "_blank")}>Experimentar Agora</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
