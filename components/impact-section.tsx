"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { MessageCircle, AlertCircle, BarChart3, GraduationCap } from "lucide-react"

export function ImpactSection() {
  const impacts = [
    {
      icon: MessageCircle,
      title: "Escuta Estudantil Valorizada",
      description: "Cada voz é ouvida e considerada, criando um ambiente de confiança e respeito mútuo.",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: AlertCircle,
      title: "Detecção Precoce",
      description: "Identificação antecipada de problemas emocionais permite intervenções mais eficazes.",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: BarChart3,
      title: "Gestão Baseada em Dados",
      description: "Decisões escolares fundamentadas em análises concretas do bem-estar estudantil.",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: GraduationCap,
      title: "Redução da Evasão Escolar",
      description: "Alunos mais felizes e acolhidos permanecem engajados com seus estudos.",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ]

  return (
    <section id="impacto" className="py-20 lg:py-32 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Impacto <span className="text-primary">Social</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
            Transformando a educação através do cuidado com a saúde mental e o bem-estar emocional dos estudantes.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {impacts.map((impact, index) => (
            <motion.div
              key={impact.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/20">
                <div className={`w-14 h-14 ${impact.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                  <impact.icon className={`w-7 h-7 ${impact.color}`} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3 text-balance">{impact.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{impact.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid sm:grid-cols-3 gap-8"
        >
          {[
            { label: "Escolas Parceiras",  },
            { label: "Estudantes Apoiados",  },
            { label: "Intervenções Realizadas" },
           
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <motion.p
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="text-4xl lg:text-5xl font-bold text-primary mb-2"
              >
                {stat.label === "Escolas Parceiras"}
              </motion.p>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
