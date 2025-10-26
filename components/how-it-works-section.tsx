"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Smartphone, Brain, Users } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      icon: Smartphone,
      number: "01",
      title: "Aluno Registra Emoções",
      description:
        "Estudantes registram semanalmente seus sentimentos e vivências escolares através do aplicativo de forma simples e intuitiva.",
    },
    {
      icon: Brain,
      number: "02",
      title: "IA Analisa e Gera Relatórios",
      description:
        "Nossa Inteligência Artificial processa os dados e identifica padrões de bem-estar emocional, gerando insights valiosos.",
    },
    {
      icon: Users,
      number: "03",
      title: "Equipe Recebe Insights",
      description:
        "Professores, psicólogos e orientadores recebem relatórios detalhados e podem propor intervenções personalizadas.",
    },
  ]

  return (
    <section id="como-funciona" className="py-20 lg:py-32 px-4 bg-muted/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Como <span className="text-primary">Funciona</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
            Um processo simples e eficaz que conecta estudantes, tecnologia e equipe escolar para promover o bem-estar
            emocional.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Steps */}
          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-primary">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                        <step.icon className="w-7 h-7 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl font-bold text-primary/20">{step.number}</span>
                        <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-[9/16] max-w-sm mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-3xl opacity-20 blur-2xl" />
              <img
                src="/mobile-app-mockup-showing-emotional-wellness-track.jpg"
                alt="Mockup do aplicativo Vozes da Escola"
                className="relative w-full h-full object-cover rounded-3xl shadow-2xl border-8 border-card"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
