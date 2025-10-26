"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ]

  const contactInfo = [
    { icon: Mail, text: "contato@vozesdaescola.com.br" },
    { icon: Phone, text: "(81) 1234-5678" },
    { icon: MapPin, text: "Recife, PE - Brasil" },
  ]

  return (
    <footer id="contato" className="bg-card border-t border-border py-12 lg:py-16 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                VE
              </div>
              <span className="text-xl font-bold text-foreground">Vozes da Escola</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Promovendo saúde mental e bem-estar emocional nas escolas públicas através da tecnologia e escuta ativa.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-bold text-foreground mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              {["Início", "Sobre o Projeto", "Como Funciona", "Impacto Social", "Equipe"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold text-foreground mb-4">Contato</h3>
            <ul className="space-y-3">
              {contactInfo.map((info) => (
                <li key={info.text} className="flex items-start gap-3">
                  <info.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground text-sm">{info.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-bold text-foreground mb-4">Redes Sociais</h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-muted hover:bg-primary rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary-foreground transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-8 border-t border-border text-center text-sm text-muted-foreground"
        >
          <p>© {new Date().getFullYear()} Vozes da Escola. Todos os direitos reservados.</p>
        </motion.div>
      </div>
    </footer>
  )
}
