"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

export function TeamSection() {
  const partners = [
    { name: "Prefeitura Municipal", logo: "/prefeitura.png" },
    { name: "Secretaria de Educação", logo: "/conecta.png" },
    ,
    ,
  ]

  return (
    <section id="equipe" className="py-20 lg:py-32 px-4 bg-muted/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Equipe e que podem ser<span className="text-primary"> Parceiras </span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
            Trabalhamos em conjunto com instituições comprometidas com a educação e o bem-estar dos estudantes.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-8 h-full flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                <img
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  className="w-full h-20 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Card className="p-8 lg:p-12 bg-primary text-primary-foreground">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">Quer fazer parte dessa transformação?</h3>
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              Entre em contato conosco e descubra como sua instituição pode participar do projeto Vozes da Escola.
            </p>
            <a
              href="#contato"
              className="inline-block px-8 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-semibold transition-colors"
            >
              Entre em Contato
            </a>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
