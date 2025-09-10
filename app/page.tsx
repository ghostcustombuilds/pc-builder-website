"use client"

import { Hero } from "@/components/hero"
import { BuildTiers } from "@/components/build-tiers"
import { PCCustomizer } from "@/components/pc-customizer"
import { GameMatcher } from "@/components/game-matcher"
import { EducationalGuides } from "@/components/educational-guides"
import { ComparisonTools } from "@/components/comparison-tools"
import { BeginnerWizard } from "@/components/beginner-wizard"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useState } from "react"

export default function HomePage() {
  const [selectedBuilds, setSelectedBuilds] = useState<string[]>([])

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <Hero />

        <div className="border-t border-border/20"></div>
        <BuildTiers selectedBuilds={selectedBuilds} setSelectedBuilds={setSelectedBuilds} />

        <div className="border-t border-border/20"></div>
        <ComparisonTools selectedBuilds={selectedBuilds} />
        
        <div className="border-t border-border/20"></div>
        <PCCustomizer />

        <div className="border-t border-border/20"></div>
        <GameMatcher />

        <div className="border-t border-border/20"></div>
        <EducationalGuides />

        <div className="border-t border-border/20"></div>
        <BeginnerWizard />
      </main>
      <Footer />
    </>
  )
}