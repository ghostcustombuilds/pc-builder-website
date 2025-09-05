"use client"

import { Button } from "@/components/ui/button"
import { Monitor, Menu, X, HelpCircle } from "lucide-react"
import { useState } from "react"
import { BuildQuiz } from "@/components/build-quiz"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isQuizOpen, setIsQuizOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Monitor className="h-8 w-8 text-primary" />
            <div className="absolute inset-0 h-8 w-8 text-primary animate-pulse opacity-20" />
          </div>
          <span className="text-xl font-bold text-foreground bg-gradient-to-r from-foreground to-accent bg-clip-text">
            PC Builder Pro
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="#builds"
            className="text-muted-foreground hover:text-accent transition-all duration-300 hover:scale-105 relative group"
          >
            Build Tiers
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href="#customizer"
            className="text-muted-foreground hover:text-accent transition-all duration-300 hover:scale-105 relative group"
          >
            Customizer
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href="#games"
            className="text-muted-foreground hover:text-accent transition-all duration-300 hover:scale-105 relative group"
          >
            Game Matching
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href="#guides"
            className="text-muted-foreground hover:text-accent transition-all duration-300 hover:scale-105 relative group"
          >
            Guides
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href="/build-for-me"
            className="text-muted-foreground hover:text-accent transition-all duration-300 hover:scale-105 relative group"
          >
            Build It For Me
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
          </a>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            onClick={() => setIsQuizOpen(true)}
            variant="outline" 
            className="hidden sm:flex hover:shadow-[0_0_20px_rgba(255,140,0,0.3)] hover:border-accent/50 transition-all duration-300"
          >
            <HelpCircle className="h-4 w-4 mr-2" />
            Recommend Me a Build
          </Button>
          
          <Button className="hidden sm:flex bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105">
            Start Building
          </Button>

          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <a href="#builds" className="block text-muted-foreground hover:text-accent transition-colors">
              Build Tiers
            </a>
            <a href="#customizer" className="block text-muted-foreground hover:text-accent transition-colors">
              Customizer
            </a>
            <a href="#games" className="block text-muted-foreground hover:text-accent transition-colors">
              Game Matching
            </a>
            <a href="#guides" className="block text-muted-foreground hover:text-accent transition-colors">
              Guides
            </a>
            <a href="/build-for-me" className="block text-muted-foreground hover:text-accent transition-colors">
              Build It For Me
            </a>
            <Button 
              onClick={() => setIsQuizOpen(true)}
              variant="outline" 
              className="w-full hover:shadow-[0_0_20px_rgba(255,140,0,0.3)] hover:border-accent/50 transition-all duration-300"
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              Recommend Me a Build
            </Button>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Start Building</Button>
          </div>
        </div>
      )}
      
      <BuildQuiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </nav>
  )
}
