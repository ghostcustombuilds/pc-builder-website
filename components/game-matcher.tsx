"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Gamepad2, Monitor, Zap, Star, Trophy, Search, Filter } from "lucide-react"

interface Game {
  id: string
  name: string
  genre: string
  image: string
  popularity: "high" | "medium" | "low"
  requirements: {
    [key: string]: {
      cpu: string
      gpu: string
      ram: string
      storage: string
      fps: string
      resolution: string
      settings: string
      estimatedPrice: number
    }
  }
}

const games: Game[] = [
  // FPS Games
  {
    id: "valorant",
    name: "Valorant",
    genre: "FPS",
    popularity: "high",
    image: "/valorant-game-screenshot.png",
    requirements: {
      "1080p-60fps": {
        cpu: "AMD Ryzen 5 5600G",
        gpu: "GTX 1650",
        ram: "16GB DDR4",
        storage: "500GB SSD",
        fps: "60+ FPS",
        resolution: "1080p",
        settings: "High",
        estimatedPrice: 550,
      },
      "1080p-120fps": {
        cpu: "AMD Ryzen 5 7600X",
        gpu: "RTX 4060",
        ram: "16GB DDR5",
        storage: "500GB SSD",
        fps: "120+ FPS",
        resolution: "1080p",
        settings: "High",
        estimatedPrice: 800,
      },
      "1440p-60fps": {
        cpu: "Intel i5-13600K",
        gpu: "RTX 4060",
        ram: "16GB DDR5",
        storage: "1TB SSD",
        fps: "60+ FPS",
        resolution: "1440p",
        settings: "Ultra",
        estimatedPrice: 1000,
      },
    },
  },
  {
    id: "callofduty",
    name: "Call of Duty: MW3",
    genre: "FPS",
    popularity: "high",
    image: "/call-of-duty-modern-warfare-game-screenshot.jpg",
    requirements: {
      "1080p-60fps": {
        cpu: "AMD Ryzen 5 7600X",
        gpu: "RTX 4060",
        ram: "16GB DDR5",
        storage: "1TB SSD",
        fps: "60+ FPS",
        resolution: "1080p",
        settings: "High",
        estimatedPrice: 900,
      },
      "1080p-120fps": {
        cpu: "Intel i7-13700K",
        gpu: "RTX 4070 Super",
        ram: "32GB DDR5",
        storage: "1TB SSD",
        fps: "120+ FPS",
        resolution: "1080p",
        settings: "Ultra",
        estimatedPrice: 1500,
      },
      "1440p-60fps": {
        cpu: "Intel i7-13700K",
        gpu: "RTX 4070 Super",
        ram: "32GB DDR5",
        storage: "2TB SSD",
        fps: "60+ FPS",
        resolution: "1440p",
        settings: "Ultra",
        estimatedPrice: 1700,
      },
    },
  },
  {
    id: "cs2",
    name: "Counter-Strike 2",
    genre: "FPS",
    popularity: "high",
    image: "/counter-strike-2-gameplay.jpg",
    requirements: {
      "1080p-60fps": {
        cpu: "AMD Ryzen 5 5600G",
        gpu: "GTX 1660 Super",
        ram: "16GB DDR4",
        storage: "500GB SSD",
        fps: "60+ FPS",
        resolution: "1080p",
        settings: "High",
        estimatedPrice: 650,
      },
      "1080p-120fps": {
        cpu: "AMD Ryzen 5 7600X",
        gpu: "RTX 4060",
        ram: "16GB DDR5",
        storage: "1TB SSD",
        fps: "120+ FPS",
        resolution: "1080p",
        settings: "Ultra",
        estimatedPrice: 900,
      },
      "1440p-60fps": {
        cpu: "Intel i5-13600K",
        gpu: "RTX 4070",
        ram: "32GB DDR5",
        storage: "1TB SSD",
        fps: "60+ FPS",
        resolution: "1440p",
        settings: "Ultra",
        estimatedPrice: 1300,
      },
    },
  },
  {
    id: "overwatch2",
    name: "Overwatch 2",
    genre: "FPS",
    popularity: "high",
    image: "/overwatch-2-hero-gameplay.jpg",
    requirements: {
      "1080p-60fps": {
        cpu: "AMD Ryzen 5 5600G",
        gpu: "GTX 1660 Super",
        ram: "16GB DDR4",
        storage: "500GB SSD",
        fps: "60+ FPS",
        resolution: "1080p",
        settings: "High",
        estimatedPrice: 650,
      },
      "1080p-120fps": {
        cpu: "AMD Ryzen 5 7600X",
        gpu: "RTX 4060",
        ram: "16GB DDR5",
        storage: "1TB SSD",
        fps: "120+ FPS",
        resolution: "1080p",
        settings: "Ultra",
        estimatedPrice: 900,
      },
      "1440p-60fps": {
        cpu: "Intel i5-13600K",
        gpu: "RTX 4070",
        ram: "32GB DDR5",
        storage: "1TB SSD",
        fps: "60+ FPS",
        resolution: "1440p",
        settings: "Ultra",
        estimatedPrice: 1300,
      },
    },
  },
  {
    id: "apexlegends",
    name: "Apex Legends",
    genre: "FPS",
    popularity: "high",
    image: "/apex-legends-battle-royale.jpg",
    requirements: {
      "1080p-60fps": {
        cpu: "AMD Ryzen 5 7600X",
        gpu: "RTX 4060",
        ram: "16GB DDR5",
        storage: "1TB SSD",
        fps: "60+ FPS",
        resolution: "1080p",
        settings: "High",
        estimatedPrice: 900,
      },
      "1080p-120fps": {
        cpu: "Intel i7-13700K",
        gpu: "RTX 4070",
        ram: "32GB DDR5",
        storage: "1TB SSD",
        fps: "120+ FPS",
        resolution: "1080p",
        settings: "Ultra",
        estimatedPrice: 1400,
      },
      "1440p-60fps": {
        cpu: "Intel i7-13700K",
        gpu: "RTX 4070 Super",
        ram: "32GB DDR5",
        storage: "2TB SSD",
        fps: "60+ FPS",
        resolution: "1440p",
        settings: "Ultra",
        estimatedPrice: 1600,
      },
    },
  },

  // Battle Royale
  {
    id: "fortnite",
    name: "Fortnite",
    genre: "Battle Royale",
    popularity: "high",
    image: "/fortnite-game-screenshot.jpg",
    requirements: {
      "1080p-60fps": {
        cpu: "AMD Ryzen 5 5600G",
        gpu: "GTX 1660 Super",
        ram: "16GB DDR4",
        storage: "500GB SSD",
        fps: "60+ FPS",
        resolution: "1080p",
        settings: "Medium-High",
        estimatedPrice: 650,
      },
      "1080p-120fps": {
        cpu: "AMD Ryzen 5 7600X",
        gpu: "RTX 4060",
        ram: "16GB DDR5",
        storage: "1TB SSD",
        fps: "120+ FPS",
        resolution: "1080p",
        settings: "High",
        estimatedPrice: 900,
      },
      "1440p-60fps": {
        cpu: "Intel i5-13600K",
        gpu: "RTX 4070",
        ram: "32GB DDR5",
        storage: "1TB SSD",
        fps: "60+ FPS",
        resolution: "1440p",
        settings: "Ultra",
        estimatedPrice: 1400,
      },
    },
  },
  {
    id: "pubg",
    name: "PUBG: Battlegrounds",
    genre: "Battle Royale",
    popularity: "medium",
    image: "/pubg-battlegrounds-gameplay.jpg",
    requirements: {
      "1080p-60fps": {
        cpu: "AMD Ryzen 5 7600X",
        gpu: "RTX 4060",
        ram: "16GB DDR5",
        storage: "1TB SSD",
        fps: "60+ FPS",
        resolution: "1080p",
        settings: "High",
        estimatedPrice: 900,
      },
      "1080p-120fps": {
        cpu: "Intel i7-13700K",
        gpu: "RTX 4070",
        ram: "32GB DDR5",
        storage: "1TB SSD",
        fps: "120+ FPS",
        resolution: "1080p",
        settings: "Ultra",
        estimatedPrice: 1400,
      },
      "1440p-60fps": {
        cpu: "Intel i7-13700K",
        gpu: "RTX 4070 Super",
        ram: "32GB DDR5",
        storage: "2TB SSD",
        fps: "60+ FPS",
        resolution: "1440p",
        settings: "Ultra",
        estimatedPrice: 1600,
      },
    },
  },

  // RPG Games
  {
    id: "cyberpunk2077",
    name: "Cyberpunk 2077",
    genre: "RPG",
    popularity: "high",
    image: "/cyberpunk-street-scene.png",
    requirements: {
      "1080p-60fps": {
        cpu: "AMD Ryzen 7 7700X",
        gpu: "RTX 4070",
        ram: "32GB DDR5",
        storage: "2TB SSD",
        fps: "60+ FPS",
        resolution: "1080p",
        settings: "High",
        estimatedPrice: 1200,
      },
      "1080p-120fps": {
        cpu: "Intel i7-13700K",
        gpu: "RTX 4070 Super",
        ram: "32GB DDR5",
        storage: "2TB SSD",
        fps: "120+ FPS",
        resolution: "1080p",
        settings: "Ultra",
        estimatedPrice: 1600,
      },
      "1440p-60fps": {
        cpu: "Intel i7-13700K",
        gpu: "RTX 4080 Super",
        ram: "32GB DDR5",
        storage: "2TB SSD",
        fps: "60+ FPS",
        resolution: "1440p",
        settings: "Ultra",
        estimatedPrice: 2200,
      },
    },
  },
  {
    id: "starfield",
    name: "Starfield",
    genre: "RPG",
    popularity: "high",
    image: "/starfield-game-screenshot.jpg",
    requirements: {
      "1080p-60fps": {
        cpu: "Intel i7-13700K",
        gpu: "RTX 4070",
        ram: "32GB DDR5",
        storage: "2TB SSD",
        fps: "60+ FPS",
        resolution: "1080p",
        settings: "High",
        estimatedPrice: 1500,
      },
      "1080p-120fps": {
        cpu: "Intel i9-14900K",
        gpu: "RTX 4080 Super",
        ram: "32GB DDR5",
        storage: "2TB SSD",
        fps: "120+ FPS",
        resolution: "1080p",
        settings: "Ultra",
        estimatedPrice: 2400,
      },
      "1440p-60fps": {
        cpu: "Intel i9-14900K",
        gpu: "RTX 4080 Super",
        ram: "32GB DDR5",
        storage: "4TB SSD",
        fps: "60+ FPS",
        resolution: "1440p",
        settings: "Ultra",
        estimatedPrice: 2800,
      },
    },
  },
  {
    id: "eldenring",
    name: "Elden Ring",
    genre: "Action RPG",
    popularity: "high",
    image: "/elden-ring-screenshot.png",
    requirements: {
      "1080p-60fps": {
        cpu: "AMD Ryzen 5 7600X",
        gpu: "RTX 4060",
        ram: "16GB DDR5",
        storage: "1TB SSD",
        fps: "60+ FPS",
        resolution: "1080p",
        settings: "High",
        estimatedPrice: 900,
      },
      "1080p-120fps": {
        cpu: "Intel i7-13700K",
        gpu: "RTX 4070",
        ram: "32GB DDR5",
        storage: "1TB SSD",
        fps: "120+ FPS",
        resolution: "1080p",
        settings: "Ultra",
        estimatedPrice: 1400,
      },
      "1440p-60fps": {
        cpu: "Intel i7-13700K",
        gpu: "RTX 4070 Super",
        ram: "32GB DDR5",
        storage: "2TB SSD",
        fps: "60+ FPS",
        resolution: "1440p",
        settings: "Ultra",
        estimatedPrice: 1600,
      },
    },
  },
  {
    id: "baldursgate3",
    name: "Baldur's Gate 3",
    genre: "RPG",
    popularity: "high",
    image: "/baldurs-gate-3-fantasy-adventure.jpg",
    requirements: {
      "1080p-60fps": {
        cpu: "AMD Ryzen 5 7600X",
        gpu: "RTX 4060",
        ram: "16GB DDR5",
        storage: "1TB SSD",
        fps: "60+ FPS",
        resolution: "1080p",
        settings: "High",
        estimatedPrice: 900,
      },
      "1080p-120fps": {
        cpu: "Intel i7-13700K",
        gpu: "RTX 4070",
        ram: "32GB DDR5",
        storage: "2TB SSD",
        fps: "120+ FPS",
        resolution: "1080p",
        settings: "Ultra",
        estimatedPrice: 1400,
      },
      "1440p-60fps": {
        cpu: "Intel i7-13700K",
        gpu: "RTX 4070 Super",
        ram: "32GB DDR5",
        storage: "2TB SSD",
        fps: "60+ FPS",
        resolution: "1440p",
        settings: "Ultra",
        estimatedPrice: 1600,
      },
    },
  },
  {
    id: "witcher3",
    name: "The Witcher 3",
    genre: "RPG",
    popularity: "high",
    image: "/the-witcher-3-fantasy-world.jpg",
    requirements: {
      "1080p-60fps": {
        cpu: "AMD Ryzen 5 7600X",
        gpu: "RTX 4060",
        ram: "16GB DDR5",
        storage: "1TB SSD",
        fps: "60+ FPS",
        resolution: "1080p",
        settings: "High",
        estimatedPrice: 900,
      },
      "1080p-120fps": {
        cpu: "Intel i7-13700K",
        gpu: "RTX 4070",
        ram: "32GB DDR5",
        storage: "1TB SSD",
        fps: "120+ FPS",
        resolution: "1080p",
        settings: "Ultra",
        estimatedPrice: 1400,
      },
      "1440p-60fps": {
        cpu: "Intel i7-13700K",
        gpu: "RTX 4070 Super",
        ram: "32GB DDR5",
        storage: "2TB SSD",
        fps: "60+ FPS",
        resolution: "1440p",
        settings: "Ultra",
        estimatedPrice: 1600,
      },
    },
  },

  // Strategy Games
  {
    id: "civilization6",
    name: "Civilization VI",
    genre: "Strategy",
    popularity: "medium",
    image: "/civilization-6-strategy-game.jpg",
    requirements: {
      "1080p-60fps": {
        cpu: "AMD Ryzen 5 7600X",
        gpu: "RTX 4060",
        ram: "16GB DDR5",
        storage: "1TB SSD",
        fps: "60+ FPS",
        resolution: "1080p",
        settings: "High",
        estimatedPrice: 900,
      },
      "1080p-120fps": {
        cpu: "Intel i7-13700K",
        gpu: "RTX 4070",
        ram: "32GB DDR5",
        storage: "1TB SSD",
        fps: "120+ FPS",
        resolution: "1080p",
        settings: "Ultra",
        estimatedPrice: 1400,
      },
      "1440p-60fps": {
        cpu: "Intel i7-13700K",
        gpu: "RTX 4070",
        ram: "32GB DDR5",
        storage: "2TB SSD",
        fps: "60+ FPS",
        resolution: "1440p",
        settings: "Ultra",
        estimatedPrice: 1500,
      },
    },
  },
  {
    id: "ageofempires4",
    name: "Age of Empires IV",
    genre: "Strategy",
    popularity: "medium",
    image: "/age-of-empires-4-medieval-strategy.jpg",
    requirements: {
      "1080p-60fps": {
        cpu: "AMD Ryzen 5 7600X",
        gpu: "RTX 4060",
        ram: "16GB DDR5",
        storage: "1TB SSD",
        fps: "60+ FPS",
        resolution: "1080p",
        settings: "High",
        estimatedPrice: 900,
      },
      "1080p-120fps": {
        cpu: "Intel i7-13700K",
        gpu: "RTX 4070",
        ram: "32GB DDR5",
        storage: "1TB SSD",
        fps: "120+ FPS",
        resolution: "1080p",
        settings: "Ultra",
        estimatedPrice: 1400,
      },
      "1440p-60fps": {
        cpu: "Intel i7-13700K",
        gpu: "RTX 4070",
        ram: "32GB DDR5",
        storage: "2TB SSD",
        fps: "60+ FPS",
        resolution: "1440p",
        settings: "Ultra",
        estimatedPrice: 1500,
      },
    },
  },
  {
    id: "totalwar3",
    name: "Total War: Warhammer III",
    genre: "Strategy",
    popularity: "medium",
    image: "/total-war-warhammer-3-fantasy-battles.jpg",
    requirements: {
      "1080p-60fps": {
        cpu: "Intel i7-13700K",
        gpu: "RTX 4070 Super",
        ram: "32GB DDR5",
        storage: "2TB SSD",
        fps: "60+ FPS",
        resolution: "1080p",
        settings: "High",
        estimatedPrice: 1600,
      },
      "1080p-120fps": {
        cpu: "Intel i9-14900K",
        gpu: "RTX 4080 Super",
        ram: "32GB DDR5",
        storage: "4TB SSD",
        fps: "120+ FPS",
        resolution: "1080p",
        settings: "Ultra",
        estimatedPrice: 2400,
      },
      "1440p-60fps": {
        cpu: "Intel i9-14900K",
        gpu: "RTX 4080 Super",
        ram: "32GB DDR5",
        storage: "4TB SSD",
        fps: "60+ FPS",
        resolution: "1440p",
        settings: "Ultra",
        estimatedPrice: 2600,
      },
    },
  },

  // MMO Games
  {
    id: "worldofwarcraft",
    name: "World of Warcraft",
    genre: "MMO",
    popularity: "high",
    image: "/world-of-warcraft-fantasy-mmo.jpg",
    requirements: {
      "1080p-60fps": {
        cpu: "AMD Ryzen 5 7600X",
        gpu: "RTX 4060",
        ram: "16GB DDR5",
        storage: "1TB SSD",
        fps: "60+ FPS",
        resolution: "1080p",
        settings: "High",
        estimatedPrice: 900,
      },
      "1080p-120fps": {
        cpu: "Intel i7-13700K",
        gpu: "RTX 4070",
        ram: "32GB DDR5",
        storage: "1TB SSD",
        fps: "120+ FPS",
        resolution: "1080p",
        settings: "Ultra",
        estimatedPrice: 1400,
      },
      "1440p-60fps": {
        cpu: "Intel i7-13700K",
        gpu: "RTX 4070",
        ram: "32GB DDR5",
        storage: "2TB SSD",
        fps: "60+ FPS",
        resolution: "1440p",
        settings: "Ultra",
        estimatedPrice: 1500,
      },
    },
  },
  {
    id: "finalfantasy14",
    name: "Final Fantasy XIV",
    genre: "MMO",
    popularity: "high",
    image: "/final-fantasy-14-mmo-adventure.jpg",
    requirements: {
      "1080p-60fps": {
        cpu: "AMD Ryzen 5 7600X",
        gpu: "RTX 4060",
        ram: "16GB DDR5",
        storage: "1TB SSD",
        fps: "60+ FPS",
        resolution: "1080p",
        settings: "High",
        estimatedPrice: 900,
      },
      "1080p-120fps": {
        cpu: "Intel i7-13700K",
        gpu: "RTX 4070",
        ram: "32GB DDR5",
        storage: "1TB SSD",
        fps: "120+ FPS",
        resolution: "1080p",
        settings: "Ultra",
        estimatedPrice: 1400,
      },
      "1440p-60fps": {
        cpu: "Intel i7-13700K",
        gpu: "RTX 4070",
        ram: "32GB DDR5",
        storage: "2TB SSD",
        fps: "60+ FPS",
        resolution: "1440p",
        settings: "Ultra",
        estimatedPrice: 1500,
      },
    },
  },
  {
    id: "guildwars2",
    name: "Guild Wars 2",
    genre: "MMO",
    popularity: "medium",
    image: "/guild-wars-2-fantasy-mmo.jpg",
    requirements: {
      "1080p-60fps": {
        cpu: "AMD Ryzen 5 7600X",
        gpu: "RTX 4060",
        ram: "16GB DDR5",
        storage: "1TB SSD",
        fps: "60+ FPS",
        resolution: "1080p",
        settings: "High",
        estimatedPrice: 900,
      },
      "1080p-120fps": {
        cpu: "Intel i7-13700K",
        gpu: "RTX 4070",
        ram: "32GB DDR5",
        storage: "1TB SSD",
        fps: "120+ FPS",
        resolution: "1080p",
        settings: "Ultra",
        estimatedPrice: 1400,
      },
      "1440p-60fps": {
        cpu: "Intel i7-13700K",
        gpu: "RTX 4070",
        ram: "32GB DDR5",
        storage: "2TB SSD",
        fps: "60+ FPS",
        resolution: "1440p",
        settings: "Ultra",
        estimatedPrice: 1500,
      },
    },
  },

  // Racing Games
  {
    id: "forzahorizon5",
    name: "Forza Horizon 5",
    genre: "Racing",
    popularity: "high",
    image: "/forza-horizon-5-racing-cars.jpg",
    requirements: {
      "1080p-60fps": {
        cpu: "AMD Ryzen 5 7600X",
        gpu: "RTX 4060",
        ram: "16GB DDR5",
        storage: "1TB SSD",
        fps: "60+ FPS",
        resolution: "1080p",
        settings: "High",
        estimatedPrice: 900,
      },
      "1080p-120fps": {
        cpu: "Intel i7-13700K",
        gpu: "RTX 4070",
        ram: "32GB DDR5",
        storage: "1TB SSD",
        fps: "120+ FPS",
        resolution: "1080p",
        settings: "Ultra",
        estimatedPrice: 1400,
      },
      "1440p-60fps": {
        cpu: "Intel i7-13700K",
        gpu: "RTX 4070 Super",
        ram: "32GB DDR5",
        storage: "2TB SSD",
        fps: "60+ FPS",
        resolution: "1440p",
        settings: "Ultra",
        estimatedPrice: 1600,
      },
    },
  },
  {
    id: "f1-23",
    name: "F1 23",
    genre: "Racing",
    popularity: "medium",
    image: "/f1-23-formula-racing.jpg",
    requirements: {
      "1080p-60fps": {
        cpu: "AMD Ryzen 5 7600X",
        gpu: "RTX 4060",
        ram: "16GB DDR5",
        storage: "1TB SSD",
        fps: "60+ FPS",
        resolution: "1080p",
        settings: "High",
        estimatedPrice: 900,
      },
      "1080p-120fps": {
        cpu: "Intel i7-13700K",
        gpu: "RTX 4070",
        ram: "32GB DDR5",
        storage: "1TB SSD",
        fps: "120+ FPS",
        resolution: "1080p",
        settings: "Ultra",
        estimatedPrice: 1400,
      },
      "1440p-60fps": {
        cpu: "Intel i7-13700K",
        gpu: "RTX 4070",
        ram: "32GB DDR5",
        storage: "2TB SSD",
        fps: "60+ FPS",
        resolution: "1440p",
        settings: "Ultra",
        estimatedPrice: 1500,
      },
    },
  },

  // Indie Games
  {
    id: "hades",
    name: "Hades",
    genre: "Indie",
    popularity: "high",
    image: "/hades-indie-roguelike-game.jpg",
    requirements: {
      "1080p-60fps": {
        cpu: "AMD Ryzen 5 5600G",
        gpu: "GTX 1650",
        ram: "16GB DDR4",
        storage: "500GB SSD",
        fps: "60+ FPS",
        resolution: "1080p",
        settings: "Ultra",
        estimatedPrice: 550,
      },
      "1080p-120fps": {
        cpu: "AMD Ryzen 5 7600X",
        gpu: "RTX 4060",
        ram: "16GB DDR5",
        storage: "500GB SSD",
        fps: "120+ FPS",
        resolution: "1080p",
        settings: "Ultra",
        estimatedPrice: 800,
      },
      "1440p-60fps": {
        cpu: "Intel i5-13600K",
        gpu: "RTX 4060",
        ram: "16GB DDR5",
        storage: "1TB SSD",
        fps: "60+ FPS",
        resolution: "1440p",
        settings: "Ultra",
        estimatedPrice: 1000,
      },
    },
  },
  {
    id: "hollowknight",
    name: "Hollow Knight",
    genre: "Indie",
    popularity: "high",
    image: "/placeholder.svg?height=200&width=300",
    requirements: {
      "1080p-60fps": {
        cpu: "AMD Ryzen 5 5600G",
        gpu: "GTX 1650",
        ram: "16GB DDR4",
        storage: "500GB SSD",
        fps: "60+ FPS",
        resolution: "1080p",
        settings: "Ultra",
        estimatedPrice: 550,
      },
      "1080p-120fps": {
        cpu: "AMD Ryzen 5 7600X",
        gpu: "RTX 4060",
        ram: "16GB DDR5",
        storage: "500GB SSD",
        fps: "120+ FPS",
        resolution: "1080p",
        settings: "Ultra",
        estimatedPrice: 800,
      },
      "1440p-60fps": {
        cpu: "Intel i5-13600K",
        gpu: "RTX 4060",
        ram: "16GB DDR5",
        storage: "1TB SSD",
        fps: "60+ FPS",
        resolution: "1440p",
        settings: "Ultra",
        estimatedPrice: 1000,
      },
    },
  },
  {
    id: "stardewvalley",
    name: "Stardew Valley",
    genre: "Indie",
    popularity: "high",
    image: "/placeholder.svg?height=200&width=300",
    requirements: {
      "1080p-60fps": {
        cpu: "AMD Ryzen 5 5600G",
        gpu: "GTX 1650",
        ram: "16GB DDR4",
        storage: "500GB SSD",
        fps: "60+ FPS",
        resolution: "1080p",
        settings: "Ultra",
        estimatedPrice: 550,
      },
      "1080p-120fps": {
        cpu: "AMD Ryzen 5 7600X",
        gpu: "RTX 4060",
        ram: "16GB DDR5",
        storage: "500GB SSD",
        fps: "120+ FPS",
        resolution: "1080p",
        settings: "Ultra",
        estimatedPrice: 800,
      },
      "1440p-60fps": {
        cpu: "Intel i5-13600K",
        gpu: "RTX 4060",
        ram: "16GB DDR5",
        storage: "1TB SSD",
        fps: "60+ FPS",
        resolution: "1440p",
        settings: "Ultra",
        estimatedPrice: 1000,
      },
    },
  },

  // Simulation Games
  {
    id: "msflightsim",
    name: "Microsoft Flight Simulator",
    genre: "Simulation",
    popularity: "medium",
    image: "/placeholder.svg?height=200&width=300",
    requirements: {
      "1080p-60fps": {
        cpu: "Intel i7-13700K",
        gpu: "RTX 4070 Super",
        ram: "32GB DDR5",
        storage: "2TB SSD",
        fps: "60+ FPS",
        resolution: "1080p",
        settings: "High",
        estimatedPrice: 1600,
      },
      "1080p-120fps": {
        cpu: "Intel i9-14900K",
        gpu: "RTX 4080 Super",
        ram: "32GB DDR5",
        storage: "4TB SSD",
        fps: "120+ FPS",
        resolution: "1080p",
        settings: "Ultra",
        estimatedPrice: 2400,
      },
      "1440p-60fps": {
        cpu: "Intel i9-14900K",
        gpu: "RTX 4080 Super",
        ram: "32GB DDR5",
        storage: "4TB SSD",
        fps: "60+ FPS",
        resolution: "1440p",
        settings: "Ultra",
        estimatedPrice: 2600,
      },
    },
  },
  {
    id: "citiesskylines",
    name: "Cities: Skylines",
    genre: "Simulation",
    popularity: "medium",
    image: "/placeholder.svg?height=200&width=300",
    requirements: {
      "1080p-60fps": {
        cpu: "AMD Ryzen 5 7600X",
        gpu: "RTX 4060",
        ram: "16GB DDR5",
        storage: "1TB SSD",
        fps: "60+ FPS",
        resolution: "1080p",
        settings: "High",
        estimatedPrice: 900,
      },
      "1080p-120fps": {
        cpu: "Intel i7-13700K",
        gpu: "RTX 4070",
        ram: "32GB DDR5",
        storage: "1TB SSD",
        fps: "120+ FPS",
        resolution: "1080p",
        settings: "Ultra",
        estimatedPrice: 1400,
      },
      "1440p-60fps": {
        cpu: "Intel i7-13700K",
        gpu: "RTX 4070",
        ram: "32GB DDR5",
        storage: "2TB SSD",
        fps: "60+ FPS",
        resolution: "1440p",
        settings: "Ultra",
        estimatedPrice: 1500,
      },
    },
  },

  // MOBA Games
  {
    id: "leagueoflegends",
    name: "League of Legends",
    genre: "MOBA",
    popularity: "high",
    image: "/placeholder.svg?height=200&width=300",
    requirements: {
      "1080p-60fps": {
        cpu: "AMD Ryzen 5 5600G",
        gpu: "GTX 1650",
        ram: "16GB DDR4",
        storage: "500GB SSD",
        fps: "60+ FPS",
        resolution: "1080p",
        settings: "High",
        estimatedPrice: 550,
      },
      "1080p-120fps": {
        cpu: "AMD Ryzen 5 7600X",
        gpu: "RTX 4060",
        ram: "16GB DDR5",
        storage: "500GB SSD",
        fps: "120+ FPS",
        resolution: "1080p",
        settings: "Ultra",
        estimatedPrice: 800,
      },
      "1440p-60fps": {
        cpu: "Intel i5-13600K",
        gpu: "RTX 4060",
        ram: "16GB DDR5",
        storage: "1TB SSD",
        fps: "60+ FPS",
        resolution: "1440p",
        settings: "Ultra",
        estimatedPrice: 1000,
      },
    },
  },
  {
    id: "dota2",
    name: "Dota 2",
    genre: "MOBA",
    popularity: "high",
    image: "/placeholder.svg?height=200&width=300",
    requirements: {
      "1080p-60fps": {
        cpu: "AMD Ryzen 5 5600G",
        gpu: "GTX 1650",
        ram: "16GB DDR4",
        storage: "500GB SSD",
        fps: "60+ FPS",
        resolution: "1080p",
        settings: "High",
        estimatedPrice: 550,
      },
      "1080p-120fps": {
        cpu: "AMD Ryzen 5 7600X",
        gpu: "RTX 4060",
        ram: "16GB DDR5",
        storage: "500GB SSD",
        fps: "120+ FPS",
        resolution: "1080p",
        settings: "Ultra",
        estimatedPrice: 800,
      },
      "1440p-60fps": {
        cpu: "Intel i5-13600K",
        gpu: "RTX 4060",
        ram: "16GB DDR5",
        storage: "1TB SSD",
        fps: "60+ FPS",
        resolution: "1440p",
        settings: "Ultra",
        estimatedPrice: 1000,
      },
    },
  },

  // Horror Games
  {
    id: "residentevil4",
    name: "Resident Evil 4",
    genre: "Horror",
    popularity: "high",
    image: "/placeholder.svg?height=200&width=300",
    requirements: {
      "1080p-60fps": {
        cpu: "AMD Ryzen 5 7600X",
        gpu: "RTX 4060",
        ram: "16GB DDR5",
        storage: "1TB SSD",
        fps: "60+ FPS",
        resolution: "1080p",
        settings: "High",
        estimatedPrice: 900,
      },
      "1080p-120fps": {
        cpu: "Intel i7-13700K",
        gpu: "RTX 4070",
        ram: "32GB DDR5",
        storage: "1TB SSD",
        fps: "120+ FPS",
        resolution: "1080p",
        settings: "Ultra",
        estimatedPrice: 1400,
      },
      "1440p-60fps": {
        cpu: "Intel i7-13700K",
        gpu: "RTX 4070 Super",
        ram: "32GB DDR5",
        storage: "2TB SSD",
        fps: "60+ FPS",
        resolution: "1440p",
        settings: "Ultra",
        estimatedPrice: 1600,
      },
    },
  },

  // Sports Games
  {
    id: "fifa24",
    name: "EA Sports FC 24",
    genre: "Sports",
    popularity: "high",
    image: "/placeholder.svg?height=200&width=300",
    requirements: {
      "1080p-60fps": {
        cpu: "AMD Ryzen 5 7600X",
        gpu: "RTX 4060",
        ram: "16GB DDR5",
        storage: "1TB SSD",
        fps: "60+ FPS",
        resolution: "1080p",
        settings: "High",
        estimatedPrice: 900,
      },
      "1080p-120fps": {
        cpu: "Intel i7-13700K",
        gpu: "RTX 4070",
        ram: "32GB DDR5",
        storage: "1TB SSD",
        fps: "120+ FPS",
        resolution: "1080p",
        settings: "Ultra",
        estimatedPrice: 1400,
      },
      "1440p-60fps": {
        cpu: "Intel i7-13700K",
        gpu: "RTX 4070",
        ram: "32GB DDR5",
        storage: "2TB SSD",
        fps: "60+ FPS",
        resolution: "1440p",
        settings: "Ultra",
        estimatedPrice: 1500,
      },
    },
  },
]

const performanceTargets = [
  {
    id: "1080p-60fps",
    name: "1080p @ 60 FPS",
    description: "Smooth gaming experience",
    icon: Star,
    color: "text-green-600",
  },
  {
    id: "1080p-120fps",
    name: "1080p @ 120+ FPS",
    description: "Competitive gaming",
    icon: Zap,
    color: "text-blue-600",
  },
  {
    id: "1440p-60fps",
    name: "1440p @ 60+ FPS",
    description: "High resolution gaming",
    icon: Trophy,
    color: "text-purple-600",
  },
]

const genres = [
  "All",
  "FPS",
  "Battle Royale",
  "RPG",
  "Action RPG",
  "Strategy",
  "MMO",
  "Racing",
  "Indie",
  "Simulation",
  "MOBA",
  "Horror",
  "Sports",
]

export function GameMatcher() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const [selectedTarget, setSelectedTarget] = useState("1080p-60fps")
  const [activeTab, setActiveTab] = useState("browse")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("All")

  const getRecommendation = () => {
    if (!selectedGame) return null
    return selectedGame.requirements[selectedTarget]
  }

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGenre = selectedGenre === "All" || game.genre === selectedGenre
    return matchesSearch && matchesGenre
  })

  const recommendation = getRecommendation()

  return (
    <section id="games" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Game-Based PC Recommendations</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our library of 30+ popular games or get personalized PC build recommendations for your favorite
            titles
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="browse">Browse Games</TabsTrigger>
            <TabsTrigger value="recommend">Get Recommendation</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-8">
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by genre" />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="text-center text-sm text-muted-foreground mb-6">
              Showing {filteredGames.length} of {games.length} games
              {selectedGenre !== "All" && ` in ${selectedGenre}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map((game) => (
                <Card
                  key={game.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedGame?.id === game.id ? "ring-2 ring-accent" : ""
                  }`}
                  onClick={() => setSelectedGame(game)}
                >
                  <CardHeader className="pb-3">
                    <img
                      src={game.image || "/placeholder.svg"}
                      alt={game.name}
                      className="w-full h-32 object-cover rounded-md mb-3"
                    />
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{game.name}</CardTitle>
                      <div className="flex gap-2">
                        <Badge variant="secondary">{game.genre}</Badge>
                        {game.popularity === "high" && (
                          <Badge variant="outline" className="text-xs">
                            Popular
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Performance Targets</h4>
                      <div className="grid grid-cols-1 gap-1 text-xs">
                        {Object.entries(game.requirements).map(([target, req]) => (
                          <div key={target} className="flex justify-between">
                            <span className="text-muted-foreground">
                              {target === "1080p-60fps"
                                ? "1080p @ 60 FPS"
                                : target === "1080p-120fps"
                                  ? "1080p @ 120+ FPS"
                                  : "1440p @ 60+ FPS"}
                            </span>
                            <span className="text-accent font-medium">${req.estimatedPrice}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredGames.length === 0 && (
              <div className="text-center py-12">
                <Gamepad2 className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No games found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="recommend" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Game & Target Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gamepad2 className="h-5 w-5 text-accent" />
                    Select Your Game & Target
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Choose Game</label>
                    <Select
                      value={selectedGame?.id || ""}
                      onValueChange={(value) => {
                        const game = games.find((g) => g.id === value)
                        setSelectedGame(game || null)
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a game">
                          {selectedGame ? (
                            <div className="flex items-center gap-2">
                              <span>{selectedGame.name}</span>
                              <Badge variant="secondary" className="text-xs">
                                {selectedGame.genre}
                              </Badge>
                            </div>
                          ) : (
                            "Select a game"
                          )}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {games.map((game) => (
                          <SelectItem key={game.id} value={game.id}>
                            <div className="flex items-center gap-2">
                              <span>{game.name}</span>
                              <Badge variant="secondary" className="text-xs">
                                {game.genre}
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium">Performance Target</label>
                    <div className="grid grid-cols-1 gap-3">
                      {performanceTargets.map((target) => {
                        const IconComponent = target.icon
                        return (
                          <div
                            key={target.id}
                            className={`p-3 rounded-lg border cursor-pointer transition-all ${
                              selectedTarget === target.id
                                ? "border-accent bg-accent/10"
                                : "border-border hover:border-accent/50"
                            }`}
                            onClick={() => setSelectedTarget(target.id)}
                          >
                            <div className="flex items-center gap-3">
                              <IconComponent className={`h-5 w-5 ${target.color}`} />
                              <div>
                                <div className="font-medium">{target.name}</div>
                                <div className="text-sm text-muted-foreground">{target.description}</div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recommendation Result */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="h-5 w-5 text-accent" />
                    Recommended Build
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {recommendation && selectedGame ? (
                    <div className="space-y-6">
                      <div className="text-center p-4 bg-accent/10 rounded-lg">
                        <h3 className="font-bold text-lg mb-2">{selectedGame.name}</h3>
                        <div className="flex items-center justify-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Monitor className="h-4 w-4" />
                            {recommendation.resolution}
                          </span>
                          <span className="flex items-center gap-1">
                            <Zap className="h-4 w-4" />
                            {recommendation.fps}
                          </span>
                          <Badge variant="secondary">{recommendation.settings}</Badge>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold">Recommended Components</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">CPU</span>
                            <span>{recommendation.cpu}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">GPU</span>
                            <span>{recommendation.gpu}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">RAM</span>
                            <span>{recommendation.ram}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Storage</span>
                            <span>{recommendation.storage}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-muted-foreground">Estimated Price</span>
                          <span className="text-2xl font-bold text-accent">
                            ${recommendation.estimatedPrice.toLocaleString()}
                          </span>
                        </div>
                        <Button className="w-full">Build This PC</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Gamepad2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Select a game and performance target to see our recommendation</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
