"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Heart, Brain, TrendingUp, BookAIcon, Book } from "lucide-react"

export function AboutSection() {
  const features = [
    {
      icon: Heart,
      title: "Escuta Ativa",
      description: "Valorizamos a voz de cada estudante, criando um espaço seguro para expressão emocional.",
    },
    {
      icon: BookAIcon,
      title: "IA Educacional",
      description: "Tecnologia de ponta para análise de bem-estar emocional e identificação de padrões. Equipe submete avaliações individuais Profissionais como professores, psicólogos e assistentes sociais alimentam mensalmente o sistema com suas avaliações gerais sobre os alunos",
    },
    {
      icon: TrendingUp,
      title: "Bem-Estar Estudantil",
      description: "Promovemos uma gestão escolar mais empática e baseada em dados concretos.",
    },
  ]

  return (
    <section id="sobre" className="py-20 lg:py-32 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Sobre o <span className="text-primary">Projeto</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
            A saúde mental nas escolas públicas é um desafio crescente. O Vozes da Escola surge como uma solução
            inovadora que permite aos alunos registrarem semanalmente seus sentimentos e vivências escolares. Nossa
            plataforma utiliza Inteligência Artificial para analisar o bem-estar emocional e gerar relatórios para a
            equipe multidisciplinar da escola.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-8 h-full hover:shadow-xl transition-shadow duration-300 border-2 hover:border-primary/20">
                <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
