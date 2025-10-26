"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"

interface HeroSectionProps {
  onDemoClick?: () => void
}

export function HeroSection({ onDemoClick }: HeroSectionProps) {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 lg:space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block"
            >
              <span className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold">
                Saúde Mental nas Escolas
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance"
            >
              Dando voz aos estudantes, <span className="text-primary">fortalecendo o futuro</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg lg:text-xl text-muted-foreground leading-relaxed text-pretty"
            >
              Um aplicativo que conecta alunos e escolas para cuidar da saúde mental e promover o bem-estar emocional.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground group w-full sm:w-auto"
                >
                  Conheça o Projeto
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-2 bg-transparent" onClick={onDemoClick}>
                <Play className="mr-2 h-4 w-4" />
                Ver Demonstração
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/diverse-students-and-teachers-in-modern-school-env.jpg"
                alt="Estudantes e professores em ambiente escolar"
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-xl border border-border"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-2xl">💙</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">1000+</p>
                  <p className="text-sm text-muted-foreground">Alunos Atendidos</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
