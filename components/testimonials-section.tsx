"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Maria Santos",
    role: "Diretora Escolar",
    school: "E.E. Paulo Freire",
    content:
      "O Vozes da Escola transformou nossa forma de cuidar dos alunos. Conseguimos identificar problemas emocionais antes que se tornassem críticos.",
    avatar: "MS",
  },
  {
    name: "João Silva",
    role: "Psicólogo Escolar",
    school: "E.E. Anísio Teixeira",
    content:
      "Os relatórios gerados pela IA são incrivelmente úteis. Economizamos tempo e conseguimos focar no que realmente importa: o bem-estar dos estudantes.",
    avatar: "JS",
  },
  {
    name: "Ana Costa",
    role: "Professora",
    school: "E.E. Cecília Meireles",
    content:
      "Finalmente temos dados concretos sobre como nossos alunos estão se sentindo. Isso mudou completamente nossa abordagem pedagógica.",
    avatar: "AC",
  },
]

export function TestimonialsSection() {
  return (
    <section id="depoimentos" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">O que dizem sobre nós</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Educadores de todo o país já estão transformando suas escolas com o Vozes da Escola
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Quote className="w-10 h-10 text-primary mb-4 opacity-50" />
                  <p className="text-gray-700 mb-6 leading-relaxed">{testimonial.content}</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-xs text-gray-500">{testimonial.school}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
