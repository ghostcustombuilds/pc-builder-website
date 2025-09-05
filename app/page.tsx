"use client"

import { useState } from "react"
import { BuildTiers } from "@/components/build-tiers"
import { Hero } from "@/components/hero"
import { Navigation } from "@/components/navigation"
import { PCCustomizer } from "@/components/pc-customizer"
import { GameMatcher } from "@/components/game-matcher"
import { ComparisonTools } from "@/components/comparison-tools"
import { BeginnerWizard } from "@/components/beginner-wizard"
import { EducationalGuides } from "@/components/educational-guides"
import { Footer } from "@/components/footer"

export default function HomePage() {
  const [selectedBuilds, setSelectedBuilds] = useState<string[]>([])
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      
      {/* Section Separator */}
      <div className="border-t border-border/20"></div>
      
      <BuildTiers selectedBuilds={selectedBuilds} setSelectedBuilds={setSelectedBuilds} />
      
      {/* Section Separator */}
      <div className="border-t border-border/20"></div>
      
      <PCCustomizer />
      
      {/* Section Separator */}
      <div className="border-t border-border/20"></div>
      
      <GameMatcher />
      
      {/* Section Separator */}
      <div className="border-t border-border/20"></div>
      
      <ComparisonTools selectedBuilds={selectedBuilds} />
      
      {/* Section Separator */}
      <div className="border-t border-border/20"></div>
      
      <BeginnerWizard />
      
      {/* Section Separator */}
      <div className="border-t border-border/20"></div>
      
      <EducationalGuides />
      <Footer />
    </div>
  )
}
