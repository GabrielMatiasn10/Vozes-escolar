"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { ImpactSection } from "@/components/impact-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { TeamSection } from "@/components/team-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { DemoModal } from "@/components/demo-modal"

export default function Home() {
  const [isDemoOpen, setIsDemoOpen] = useState(false)

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection onDemoClick={() => setIsDemoOpen(true)} />
      <AboutSection />
      <HowItWorksSection />
      <ImpactSection />
      <TestimonialsSection />
      <TeamSection />
      <ContactSection />
      <Footer />
      <DemoModal open={isDemoOpen} onOpenChange={setIsDemoOpen} />
    </main>
  )
}
