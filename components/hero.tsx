"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Star, Users, Award, HelpCircle } from "lucide-react"
import { BuildQuiz } from "@/components/build-quiz"
import { useState } from "react"

export function Hero() {
  const [isQuizOpen, setIsQuizOpen] = useState(false)
  
  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-background via-background to-muted/50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto text-center max-w-4xl relative">
        <div className="flex items-center justify-center gap-2 mb-6 animate-fade-in">
          <div className="relative">
            <Zap className="h-6 w-6 text-accent" />
            <div className="absolute inset-0 h-6 w-6 text-accent animate-ping opacity-20" />
          </div>
          <span className="text-accent font-medium">Build Your Dream PC</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance animate-fade-in-up">
          <span className="bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
            Custom PC Builds
          </span>
          <br />
          <span className="text-foreground">for Every Gamer</span>
        </h1>

        <p className="text-lg text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto animate-fade-in-up delay-200 font-normal">
          Create the perfect gaming setup with our intelligent build recommendations. From budget builds to high-end
          rigs, we&#39;ll help you run any game at your desired performance.
        </p>

        <div className="flex flex-wrap justify-center gap-8 mb-8 animate-fade-in-up delay-300">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4 text-accent" />
            <span>50K+ Builds Created</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="h-4 w-4 text-accent" />
            <span>4.9/5 Rating</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Award className="h-4 w-4 text-accent" />
            <span>Expert Recommended</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-400">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_25px_rgba(255,140,0,0.4)] hover:border-accent/50 transition-all duration-300 hover:scale-105 group"
          >
            Start Building Now
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent hover:shadow-[0_0_25px_rgba(255,140,0,0.4)] hover:border-accent/50 transition-all duration-300 hover:scale-105"
          >
            View Build Tiers
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => setIsQuizOpen(true)}
            className="border-accent text-accent hover:bg-accent/10 hover:text-accent bg-transparent hover:shadow-[0_0_25px_rgba(255,140,0,0.4)] hover:border-accent/50 transition-all duration-300 hover:scale-105"
          >
            <HelpCircle className="mr-2 h-5 w-5" />
            Recommend Me a Build
          </Button>
        </div>
      </div>
      
      <BuildQuiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </section>
  )
}
