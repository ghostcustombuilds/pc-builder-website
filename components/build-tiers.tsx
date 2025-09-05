"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Cpu, HardDrive, Monitor, Zap, DollarSign, Star, Trophy, Crown, Gamepad2, AlertTriangle, Box, Briefcase, Video, CheckCircle } from "lucide-react"

interface PurchaseLinkProps {
  component: string
  className?: string
}

function PurchaseLinks({ component, className = "" }: PurchaseLinkProps) {
  const searchQuery = encodeURIComponent(component)
  
  return (
    <div className={`flex gap-2 group ${className}`}>
      <a
        href={`https://www.amazon.com/s?k=${searchQuery}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block p-1 hover:bg-accent/10 rounded transition-all duration-200 hover:scale-110 hover:brightness-110 cursor-pointer group-hover:opacity-50 hover:!opacity-100"
        title="Search on Amazon"
      >
        <img src="/amazon-logo.svg" alt="Amazon" className="w-6 h-6 pointer-events-none text-white hover:text-accent" />
      </a>
      <a
        href={`https://www.newegg.com/p/pl?d=${searchQuery}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block p-1 hover:bg-accent/10 rounded transition-all duration-200 hover:scale-110 hover:brightness-110 cursor-pointer group-hover:opacity-50 hover:!opacity-100"
        title="Search on Newegg"
      >
        <img src="/newegg-logo.svg" alt="Newegg" className="w-6 h-6 pointer-events-none text-white hover:text-accent" />
      </a>
      <a
        href={`https://www.bestbuy.com/site/searchpage.jsp?st=${searchQuery}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block p-1 hover:bg-accent/10 rounded transition-all duration-200 hover:scale-110 hover:brightness-110 cursor-pointer group-hover:opacity-50 hover:!opacity-100"
        title="Search on Best Buy"
      >
        <img src="/bestbuy-logo.svg" alt="Best Buy" className="w-6 h-6 pointer-events-none text-white hover:text-accent" />
      </a>
    </div>
  )
}

const gamePerformanceData = {
  everyday: [
    { name: "Minecraft", "1080p": { low: "60+ FPS", medium: "45+ FPS", high: "30+ FPS", ultra: "20+ FPS" }, "1440p": { low: "40+ FPS", medium: "30+ FPS", high: "20+ FPS", ultra: "15+ FPS" } },
    { name: "Among Us", "1080p": { low: "120+ FPS", medium: "100+ FPS", high: "80+ FPS", ultra: "60+ FPS" }, "1440p": { low: "80+ FPS", medium: "60+ FPS", high: "45+ FPS", ultra: "35+ FPS" } },
    { name: "Fall Guys", "1080p": { low: "45+ FPS", medium: "35+ FPS", high: "25+ FPS", ultra: "20+ FPS" }, "1440p": { low: "30+ FPS", medium: "25+ FPS", high: "20+ FPS", ultra: "15+ FPS" } },
    { name: "League of Legends", "1080p": { low: "80+ FPS", medium: "60+ FPS", high: "45+ FPS", ultra: "35+ FPS" }, "1440p": { low: "60+ FPS", medium: "45+ FPS", high: "35+ FPS", ultra: "25+ FPS" } },
    { name: "Dota 2", "1080p": { low: "60+ FPS", medium: "45+ FPS", high: "35+ FPS", ultra: "25+ FPS" }, "1440p": { low: "40+ FPS", medium: "30+ FPS", high: "25+ FPS", ultra: "20+ FPS" } },
    { name: "Hearthstone", "1080p": { low: "120+ FPS", medium: "100+ FPS", high: "80+ FPS", ultra: "60+ FPS" }, "1440p": { low: "80+ FPS", medium: "60+ FPS", high: "45+ FPS", ultra: "35+ FPS" } },
    { name: "Stardew Valley", "1080p": { low: "120+ FPS", medium: "100+ FPS", high: "80+ FPS", ultra: "60+ FPS" }, "1440p": { low: "80+ FPS", medium: "60+ FPS", high: "45+ FPS", ultra: "35+ FPS" } },
    { name: "Terraria", "1080p": { low: "100+ FPS", medium: "80+ FPS", high: "60+ FPS", ultra: "45+ FPS" }, "1440p": { low: "60+ FPS", medium: "45+ FPS", high: "35+ FPS", ultra: "25+ FPS" } },
    { name: "Rocket League", "1080p": { low: "60+ FPS", medium: "45+ FPS", high: "35+ FPS", ultra: "25+ FPS" }, "1440p": { low: "40+ FPS", medium: "30+ FPS", high: "25+ FPS", ultra: "20+ FPS" } },
    { name: "CS2", "1080p": { low: "45+ FPS", medium: "35+ FPS", high: "25+ FPS", ultra: "20+ FPS" }, "1440p": { low: "30+ FPS", medium: "25+ FPS", high: "20+ FPS", ultra: "15+ FPS" } },
  ],
  budget: [
    { name: "Fortnite", "1080p": { low: "90+ FPS", medium: "75+ FPS", high: "60+ FPS", ultra: "45+ FPS" }, "1440p": { low: "60+ FPS", medium: "50+ FPS", high: "40+ FPS", ultra: "30+ FPS" } },
    { name: "Valorant", "1080p": { low: "200+ FPS", medium: "180+ FPS", high: "150+ FPS", ultra: "120+ FPS" }, "1440p": { low: "150+ FPS", medium: "130+ FPS", high: "110+ FPS", ultra: "90+ FPS" } },
    { name: "Minecraft", "1080p": { low: "120+ FPS", medium: "100+ FPS", high: "80+ FPS", ultra: "60+ FPS" }, "1440p": { low: "80+ FPS", medium: "65+ FPS", high: "50+ FPS", ultra: "40+ FPS" } },
    { name: "CS2", "1080p": { low: "150+ FPS", medium: "120+ FPS", high: "100+ FPS", ultra: "80+ FPS" }, "1440p": { low: "100+ FPS", medium: "80+ FPS", high: "65+ FPS", ultra: "50+ FPS" } },
    { name: "Rocket League", "1080p": { low: "120+ FPS", medium: "100+ FPS", high: "80+ FPS", ultra: "65+ FPS" }, "1440p": { low: "80+ FPS", medium: "65+ FPS", high: "50+ FPS", ultra: "40+ FPS" } },
    { name: "Overwatch 2", "1080p": { low: "100+ FPS", medium: "85+ FPS", high: "70+ FPS", ultra: "55+ FPS" }, "1440p": { low: "70+ FPS", medium: "60+ FPS", high: "50+ FPS", ultra: "40+ FPS" } },
    { name: "Apex Legends", "1080p": { low: "90+ FPS", medium: "75+ FPS", high: "60+ FPS", ultra: "45+ FPS" }, "1440p": { low: "60+ FPS", medium: "50+ FPS", high: "40+ FPS", ultra: "30+ FPS" } },
    { name: "League of Legends", "1080p": { low: "200+ FPS", medium: "180+ FPS", high: "150+ FPS", ultra: "120+ FPS" }, "1440p": { low: "150+ FPS", medium: "130+ FPS", high: "110+ FPS", ultra: "90+ FPS" } },
    { name: "GTA V", "1080p": { low: "80+ FPS", medium: "65+ FPS", high: "50+ FPS", ultra: "40+ FPS" }, "1440p": { low: "55+ FPS", medium: "45+ FPS", high: "35+ FPS", ultra: "25+ FPS" } },
    { name: "Elden Ring", "1080p": { low: "60+ FPS", medium: "60+ FPS", high: "60+ FPS", ultra: "55+ FPS" }, "1440p": { low: "45+ FPS", medium: "45+ FPS", high: "45+ FPS", ultra: "40+ FPS" } },
    { name: "Minecraft Legends", "1080p": { low: "100+ FPS", medium: "85+ FPS", high: "70+ FPS", ultra: "55+ FPS" }, "1440p": { low: "70+ FPS", medium: "60+ FPS", high: "50+ FPS", ultra: "40+ FPS" } },
    { name: "World of Warcraft", "1080p": { low: "80+ FPS", medium: "65+ FPS", high: "50+ FPS", ultra: "40+ FPS" }, "1440p": { low: "55+ FPS", medium: "45+ FPS", high: "35+ FPS", ultra: "30+ FPS" } },
    { name: "Genshin Impact", "1080p": { low: "70+ FPS", medium: "55+ FPS", high: "45+ FPS", ultra: "35+ FPS" }, "1440p": { low: "50+ FPS", medium: "40+ FPS", high: "30+ FPS", ultra: "25+ FPS" } },
    { name: "Fall Guys", "1080p": { low: "120+ FPS", medium: "100+ FPS", high: "80+ FPS", ultra: "60+ FPS" }, "1440p": { low: "80+ FPS", medium: "65+ FPS", high: "50+ FPS", ultra: "40+ FPS" } },
    { name: "Among Us", "1080p": { low: "200+ FPS", medium: "200+ FPS", high: "180+ FPS", ultra: "150+ FPS" }, "1440p": { low: "150+ FPS", medium: "150+ FPS", high: "130+ FPS", ultra: "110+ FPS" } },
  ],
  basic: [
    { name: "Call of Duty MW3", "1080p": { low: "120+ FPS", medium: "100+ FPS", high: "80+ FPS", ultra: "65+ FPS" }, "1440p": { low: "80+ FPS", medium: "65+ FPS", high: "50+ FPS", ultra: "40+ FPS" } },
    { name: "Apex Legends", "1080p": { low: "140+ FPS", medium: "120+ FPS", high: "100+ FPS", ultra: "80+ FPS" }, "1440p": { low: "100+ FPS", medium: "85+ FPS", high: "70+ FPS", ultra: "55+ FPS" } },
    { name: "Cyberpunk 2077", "1080p": { low: "70+ FPS", medium: "55+ FPS", high: "45+ FPS", ultra: "35+ FPS" }, "1440p": { low: "50+ FPS", medium: "40+ FPS", high: "30+ FPS", ultra: "25+ FPS" } },
    { name: "Forza Horizon 5", "1080p": { low: "100+ FPS", medium: "85+ FPS", high: "70+ FPS", ultra: "55+ FPS" }, "1440p": { low: "70+ FPS", medium: "60+ FPS", high: "50+ FPS", ultra: "40+ FPS" } },
    { name: "Battlefield 2042", "1080p": { low: "90+ FPS", medium: "75+ FPS", high: "60+ FPS", ultra: "45+ FPS" }, "1440p": { low: "60+ FPS", medium: "50+ FPS", high: "40+ FPS", ultra: "30+ FPS" } },
    { name: "Assassin's Creed Valhalla", "1080p": { low: "80+ FPS", medium: "65+ FPS", high: "50+ FPS", ultra: "40+ FPS" }, "1440p": { low: "55+ FPS", medium: "45+ FPS", high: "35+ FPS", ultra: "30+ FPS" } },
    { name: "Spider-Man Remastered", "1080p": { low: "85+ FPS", medium: "70+ FPS", high: "55+ FPS", ultra: "45+ FPS" }, "1440p": { low: "60+ FPS", medium: "50+ FPS", high: "40+ FPS", ultra: "30+ FPS" } },
    { name: "Elden Ring", "1080p": { low: "60+ FPS", medium: "60+ FPS", high: "60+ FPS", ultra: "55+ FPS" }, "1440p": { low: "45+ FPS", medium: "45+ FPS", high: "45+ FPS", ultra: "40+ FPS" } },
    { name: "GTA V", "1080p": { low: "100+ FPS", medium: "85+ FPS", high: "70+ FPS", ultra: "55+ FPS" }, "1440p": { low: "70+ FPS", medium: "60+ FPS", high: "50+ FPS", ultra: "40+ FPS" } },
    { name: "League of Legends", "1080p": { low: "250+ FPS", medium: "220+ FPS", high: "190+ FPS", ultra: "160+ FPS" }, "1440p": { low: "180+ FPS", medium: "160+ FPS", high: "140+ FPS", ultra: "120+ FPS" } },
    { name: "Minecraft Legends", "1080p": { low: "120+ FPS", medium: "100+ FPS", high: "85+ FPS", ultra: "70+ FPS" }, "1440p": { low: "85+ FPS", medium: "70+ FPS", high: "60+ FPS", ultra: "50+ FPS" } },
    { name: "God of War", "1080p": { low: "90+ FPS", medium: "75+ FPS", high: "60+ FPS", ultra: "50+ FPS" }, "1440p": { low: "65+ FPS", medium: "55+ FPS", high: "45+ FPS", ultra: "35+ FPS" } },
    { name: "Horizon Zero Dawn", "1080p": { low: "95+ FPS", medium: "80+ FPS", high: "65+ FPS", ultra: "50+ FPS" }, "1440p": { low: "70+ FPS", medium: "60+ FPS", high: "50+ FPS", ultra: "40+ FPS" } },
    { name: "Red Dead Redemption 2", "1080p": { low: "75+ FPS", medium: "60+ FPS", high: "45+ FPS", ultra: "35+ FPS" }, "1440p": { low: "55+ FPS", medium: "45+ FPS", high: "35+ FPS", ultra: "25+ FPS" } },
    { name: "The Witcher 3", "1080p": { low: "100+ FPS", medium: "85+ FPS", high: "70+ FPS", ultra: "55+ FPS" }, "1440p": { low: "70+ FPS", medium: "60+ FPS", high: "50+ FPS", ultra: "40+ FPS" } },
  ],
  esports: [
    { name: "Valorant", "1080p": { low: "250+ FPS", medium: "220+ FPS", high: "200+ FPS", ultra: "180+ FPS" }, "1440p": { low: "180+ FPS", medium: "160+ FPS", high: "140+ FPS", ultra: "120+ FPS" } },
    { name: "CS2", "1080p": { low: "350+ FPS", medium: "320+ FPS", high: "300+ FPS", ultra: "280+ FPS" }, "1440p": { low: "250+ FPS", medium: "220+ FPS", high: "200+ FPS", ultra: "180+ FPS" } },
    { name: "Overwatch 2", "1080p": { low: "250+ FPS", medium: "230+ FPS", high: "200+ FPS", ultra: "180+ FPS" }, "1440p": { low: "180+ FPS", medium: "160+ FPS", high: "140+ FPS", ultra: "120+ FPS" } },
    { name: "Apex Legends", "1080p": { low: "180+ FPS", medium: "160+ FPS", high: "140+ FPS", ultra: "120+ FPS" }, "1440p": { low: "130+ FPS", medium: "115+ FPS", high: "100+ FPS", ultra: "85+ FPS" } },
    { name: "Fortnite", "1080p": { low: "200+ FPS", medium: "180+ FPS", high: "160+ FPS", ultra: "140+ FPS" }, "1440p": { low: "140+ FPS", medium: "125+ FPS", high: "110+ FPS", ultra: "95+ FPS" } },
    { name: "Rocket League", "1080p": { low: "300+ FPS", medium: "280+ FPS", high: "260+ FPS", ultra: "240+ FPS" }, "1440p": { low: "220+ FPS", medium: "200+ FPS", high: "180+ FPS", ultra: "160+ FPS" } },
    { name: "League of Legends", "1080p": { low: "300+ FPS", medium: "280+ FPS", high: "260+ FPS", ultra: "240+ FPS" }, "1440p": { low: "220+ FPS", medium: "200+ FPS", high: "180+ FPS", ultra: "160+ FPS" } },
    { name: "GTA V", "1080p": { low: "140+ FPS", medium: "120+ FPS", high: "100+ FPS", ultra: "85+ FPS" }, "1440p": { low: "100+ FPS", medium: "85+ FPS", high: "70+ FPS", ultra: "60+ FPS" } },
    { name: "Elden Ring", "1080p": { low: "60+ FPS", medium: "60+ FPS", high: "60+ FPS", ultra: "60+ FPS" }, "1440p": { low: "60+ FPS", medium: "60+ FPS", high: "60+ FPS", ultra: "55+ FPS" } },
    { name: "Minecraft Legends", "1080p": { low: "150+ FPS", medium: "130+ FPS", high: "110+ FPS", ultra: "95+ FPS" }, "1440p": { low: "110+ FPS", medium: "95+ FPS", high: "80+ FPS", ultra: "70+ FPS" } },
    { name: "Call of Duty MW3", "1080p": { low: "180+ FPS", medium: "160+ FPS", high: "140+ FPS", ultra: "120+ FPS" }, "1440p": { low: "130+ FPS", medium: "115+ FPS", high: "100+ FPS", ultra: "85+ FPS" } },
    { name: "PUBG", "1080p": { low: "160+ FPS", medium: "140+ FPS", high: "120+ FPS", ultra: "100+ FPS" }, "1440p": { low: "115+ FPS", medium: "100+ FPS", high: "85+ FPS", ultra: "70+ FPS" } },
    { name: "Rainbow Six Siege", "1080p": { low: "200+ FPS", medium: "180+ FPS", high: "160+ FPS", ultra: "140+ FPS" }, "1440p": { low: "140+ FPS", medium: "125+ FPS", high: "110+ FPS", ultra: "95+ FPS" } },
    { name: "Dota 2", "1080p": { low: "250+ FPS", medium: "230+ FPS", high: "210+ FPS", ultra: "190+ FPS" }, "1440p": { low: "180+ FPS", medium: "160+ FPS", high: "140+ FPS", ultra: "120+ FPS" } },
    { name: "Counter-Strike 2", "1080p": { low: "350+ FPS", medium: "320+ FPS", high: "300+ FPS", ultra: "280+ FPS" }, "1440p": { low: "250+ FPS", medium: "220+ FPS", high: "200+ FPS", ultra: "180+ FPS" } },
  ],
  advanced: [
    { name: "Starfield", "1080p": { low: "90+ FPS", medium: "75+ FPS", high: "60+ FPS", ultra: "50+ FPS" }, "1440p": { low: "70+ FPS", medium: "60+ FPS", high: "50+ FPS", ultra: "40+ FPS" } },
    { name: "Baldur's Gate 3", "1080p": { low: "100+ FPS", medium: "85+ FPS", high: "70+ FPS", ultra: "60+ FPS" }, "1440p": { low: "80+ FPS", medium: "70+ FPS", high: "60+ FPS", ultra: "50+ FPS" } },
    { name: "Elden Ring", "1080p": { low: "60+ FPS", medium: "60+ FPS", high: "60+ FPS", ultra: "60+ FPS" }, "1440p": { low: "60+ FPS", medium: "60+ FPS", high: "60+ FPS", ultra: "60+ FPS" } },
    { name: "Red Dead Redemption 2", "1080p": { low: "100+ FPS", medium: "85+ FPS", high: "70+ FPS", ultra: "55+ FPS" }, "1440p": { low: "80+ FPS", medium: "70+ FPS", high: "60+ FPS", ultra: "45+ FPS" } },
    { name: "Cyberpunk 2077", "1080p": { low: "100+ FPS", medium: "85+ FPS", high: "70+ FPS", ultra: "55+ FPS" }, "1440p": { low: "80+ FPS", medium: "70+ FPS", high: "60+ FPS", ultra: "45+ FPS" } },
    { name: "GTA V", "1080p": { low: "160+ FPS", medium: "140+ FPS", high: "120+ FPS", ultra: "100+ FPS" }, "1440p": { low: "120+ FPS", medium: "100+ FPS", high: "85+ FPS", ultra: "70+ FPS" } },
    { name: "League of Legends", "1080p": { low: "300+ FPS", medium: "280+ FPS", high: "260+ FPS", ultra: "240+ FPS" }, "1440p": { low: "220+ FPS", medium: "200+ FPS", high: "180+ FPS", ultra: "160+ FPS" } },
    { name: "Minecraft Legends", "1080p": { low: "180+ FPS", medium: "160+ FPS", high: "140+ FPS", ultra: "120+ FPS" }, "1440p": { low: "130+ FPS", medium: "115+ FPS", high: "100+ FPS", ultra: "85+ FPS" } },
    { name: "Alan Wake 2", "1080p": { low: "80+ FPS", medium: "65+ FPS", high: "50+ FPS", ultra: "40+ FPS" }, "1440p": { low: "60+ FPS", medium: "50+ FPS", high: "40+ FPS", ultra: "30+ FPS" } },
    { name: "Spider-Man Remastered", "1080p": { low: "120+ FPS", medium: "100+ FPS", high: "85+ FPS", ultra: "70+ FPS" }, "1440p": { low: "90+ FPS", medium: "75+ FPS", high: "65+ FPS", ultra: "55+ FPS" } },
    { name: "Hogwarts Legacy", "1080p": { low: "90+ FPS", medium: "75+ FPS", high: "60+ FPS", ultra: "50+ FPS" }, "1440p": { low: "70+ FPS", medium: "60+ FPS", high: "50+ FPS", ultra: "40+ FPS" } },
    { name: "Diablo IV", "1080p": { low: "120+ FPS", medium: "100+ FPS", high: "85+ FPS", ultra: "70+ FPS" }, "1440p": { low: "90+ FPS", medium: "75+ FPS", high: "65+ FPS", ultra: "55+ FPS" } },
    { name: "Street Fighter 6", "1080p": { low: "60+ FPS", medium: "60+ FPS", high: "60+ FPS", ultra: "60+ FPS" }, "1440p": { low: "60+ FPS", medium: "60+ FPS", high: "60+ FPS", ultra: "60+ FPS" } },
    { name: "Resident Evil 4", "1080p": { low: "100+ FPS", medium: "85+ FPS", high: "70+ FPS", ultra: "60+ FPS" }, "1440p": { low: "80+ FPS", medium: "70+ FPS", high: "60+ FPS", ultra: "50+ FPS" } },
    { name: "Forza Motorsport", "1080p": { low: "120+ FPS", medium: "100+ FPS", high: "85+ FPS", ultra: "70+ FPS" }, "1440p": { low: "90+ FPS", medium: "75+ FPS", high: "65+ FPS", ultra: "55+ FPS" } },
  ],
  master: [
    { name: "Cyberpunk 2077", "1080p": { low: "120+ FPS", medium: "100+ FPS", high: "85+ FPS", ultra: "70+ FPS" }, "1440p": { low: "100+ FPS", medium: "85+ FPS", high: "70+ FPS", ultra: "60+ FPS" } },
    { name: "Microsoft Flight Sim", "1080p": { low: "80+ FPS", medium: "65+ FPS", high: "50+ FPS", ultra: "40+ FPS" }, "1440p": { low: "60+ FPS", medium: "50+ FPS", high: "40+ FPS", ultra: "30+ FPS" } },
    { name: "Alan Wake 2", "1080p": { low: "100+ FPS", medium: "85+ FPS", high: "70+ FPS", ultra: "60+ FPS" }, "1440p": { low: "80+ FPS", medium: "70+ FPS", high: "60+ FPS", ultra: "50+ FPS" } },
    { name: "The Witcher 3", "1080p": { low: "150+ FPS", medium: "130+ FPS", high: "110+ FPS", ultra: "90+ FPS" }, "1440p": { low: "120+ FPS", medium: "100+ FPS", high: "85+ FPS", ultra: "70+ FPS" } },
    { name: "Red Dead Redemption 2", "1080p": { low: "120+ FPS", medium: "100+ FPS", high: "85+ FPS", ultra: "70+ FPS" }, "1440p": { low: "100+ FPS", medium: "85+ FPS", high: "70+ FPS", ultra: "60+ FPS" } },
    { name: "Starfield", "1080p": { low: "120+ FPS", medium: "100+ FPS", high: "85+ FPS", ultra: "70+ FPS" }, "1440p": { low: "100+ FPS", medium: "85+ FPS", high: "70+ FPS", ultra: "60+ FPS" } },
    { name: "GTA V", "1080p": { low: "200+ FPS", medium: "180+ FPS", high: "160+ FPS", ultra: "140+ FPS" }, "1440p": { low: "150+ FPS", medium: "130+ FPS", high: "110+ FPS", ultra: "95+ FPS" } },
    { name: "League of Legends", "1080p": { low: "400+ FPS", medium: "380+ FPS", high: "360+ FPS", ultra: "340+ FPS" }, "1440p": { low: "300+ FPS", medium: "280+ FPS", high: "260+ FPS", ultra: "240+ FPS" } },
    { name: "Elden Ring", "1080p": { low: "60+ FPS", medium: "60+ FPS", high: "60+ FPS", ultra: "60+ FPS" }, "1440p": { low: "60+ FPS", medium: "60+ FPS", high: "60+ FPS", ultra: "60+ FPS" } },
    { name: "Minecraft Legends", "1080p": { low: "240+ FPS", medium: "220+ FPS", high: "200+ FPS", ultra: "180+ FPS" }, "1440p": { low: "180+ FPS", medium: "160+ FPS", high: "140+ FPS", ultra: "120+ FPS" } },
    { name: "Call of Duty MW3", "1080p": { low: "200+ FPS", medium: "180+ FPS", high: "150+ FPS", ultra: "120+ FPS" }, "1440p": { low: "150+ FPS", medium: "130+ FPS", high: "110+ FPS", ultra: "90+ FPS" } },
    { name: "Baldur's Gate 3", "1080p": { low: "140+ FPS", medium: "120+ FPS", high: "100+ FPS", ultra: "85+ FPS" }, "1440p": { low: "110+ FPS", medium: "95+ FPS", high: "80+ FPS", ultra: "70+ FPS" } },
    { name: "Hogwarts Legacy", "1080p": { low: "120+ FPS", medium: "100+ FPS", high: "85+ FPS", ultra: "70+ FPS" }, "1440p": { low: "100+ FPS", medium: "85+ FPS", high: "70+ FPS", ultra: "60+ FPS" } },
    { name: "Spider-Man Remastered", "1080p": { low: "180+ FPS", medium: "150+ FPS", high: "120+ FPS", ultra: "100+ FPS" }, "1440p": { low: "140+ FPS", medium: "120+ FPS", high: "100+ FPS", ultra: "85+ FPS" } },
    { name: "Assassin's Creed Mirage", "1080p": { low: "130+ FPS", medium: "110+ FPS", high: "90+ FPS", ultra: "75+ FPS" }, "1440p": { low: "100+ FPS", medium: "85+ FPS", high: "70+ FPS", ultra: "60+ FPS" } },
    { name: "Forza Motorsport", "1080p": { low: "180+ FPS", medium: "150+ FPS", high: "120+ FPS", ultra: "100+ FPS" }, "1440p": { low: "140+ FPS", medium: "120+ FPS", high: "100+ FPS", ultra: "85+ FPS" } },
  ],
  creator: [
    { name: "Cyberpunk 2077", "1080p": { low: "140+ FPS", medium: "120+ FPS", high: "100+ FPS", ultra: "85+ FPS" }, "1440p": { low: "120+ FPS", medium: "100+ FPS", high: "85+ FPS", ultra: "70+ FPS" }, "4K": { low: "60+ FPS", medium: "50+ FPS", high: "40+ FPS", ultra: "35+ FPS" } },
    { name: "Microsoft Flight Sim", "1080p": { low: "100+ FPS", medium: "85+ FPS", high: "70+ FPS", ultra: "60+ FPS" }, "1440p": { low: "80+ FPS", medium: "70+ FPS", high: "60+ FPS", ultra: "50+ FPS" }, "4K": { low: "45+ FPS", medium: "40+ FPS", high: "35+ FPS", ultra: "30+ FPS" } },
    { name: "Alan Wake 2", "1080p": { low: "120+ FPS", medium: "100+ FPS", high: "85+ FPS", ultra: "70+ FPS" }, "1440p": { low: "100+ FPS", medium: "85+ FPS", high: "70+ FPS", ultra: "60+ FPS" }, "4K": { low: "50+ FPS", medium: "45+ FPS", high: "40+ FPS", ultra: "35+ FPS" } },
    { name: "The Witcher 3", "1080p": { low: "180+ FPS", medium: "160+ FPS", high: "140+ FPS", ultra: "120+ FPS" }, "1440p": { low: "150+ FPS", medium: "130+ FPS", high: "110+ FPS", ultra: "95+ FPS" }, "4K": { low: "80+ FPS", medium: "70+ FPS", high: "60+ FPS", ultra: "50+ FPS" } },
    { name: "Red Dead Redemption 2", "1080p": { low: "140+ FPS", medium: "120+ FPS", high: "100+ FPS", ultra: "85+ FPS" }, "1440p": { low: "120+ FPS", medium: "100+ FPS", high: "85+ FPS", ultra: "70+ FPS" }, "4K": { low: "60+ FPS", medium: "50+ FPS", high: "45+ FPS", ultra: "40+ FPS" } },
    { name: "Starfield", "1080p": { low: "140+ FPS", medium: "120+ FPS", high: "100+ FPS", ultra: "85+ FPS" }, "1440p": { low: "120+ FPS", medium: "100+ FPS", high: "85+ FPS", ultra: "70+ FPS" }, "4K": { low: "60+ FPS", medium: "50+ FPS", high: "45+ FPS", ultra: "40+ FPS" } },
    { name: "GTA V", "1080p": { low: "240+ FPS", medium: "220+ FPS", high: "200+ FPS", ultra: "180+ FPS" }, "1440p": { low: "180+ FPS", medium: "160+ FPS", high: "140+ FPS", ultra: "120+ FPS" }, "4K": { low: "100+ FPS", medium: "90+ FPS", high: "80+ FPS", ultra: "70+ FPS" } },
    { name: "League of Legends", "1080p": { low: "500+ FPS", medium: "480+ FPS", high: "460+ FPS", ultra: "440+ FPS" }, "1440p": { low: "400+ FPS", medium: "380+ FPS", high: "360+ FPS", ultra: "340+ FPS" }, "4K": { low: "300+ FPS", medium: "280+ FPS", high: "260+ FPS", ultra: "240+ FPS" } },
    { name: "Elden Ring", "1080p": { low: "60+ FPS", medium: "60+ FPS", high: "60+ FPS", ultra: "60+ FPS" }, "1440p": { low: "60+ FPS", medium: "60+ FPS", high: "60+ FPS", ultra: "60+ FPS" }, "4K": { low: "60+ FPS", medium: "60+ FPS", high: "60+ FPS", ultra: "60+ FPS" } },
    { name: "Call of Duty MW3", "1080p": { low: "240+ FPS", medium: "220+ FPS", high: "190+ FPS", ultra: "160+ FPS" }, "1440p": { low: "180+ FPS", medium: "160+ FPS", high: "140+ FPS", ultra: "120+ FPS" }, "4K": { low: "100+ FPS", medium: "90+ FPS", high: "80+ FPS", ultra: "70+ FPS" } },
    { name: "Baldur's Gate 3", "1080p": { low: "160+ FPS", medium: "140+ FPS", high: "120+ FPS", ultra: "100+ FPS" }, "1440p": { low: "130+ FPS", medium: "110+ FPS", high: "95+ FPS", ultra: "80+ FPS" }, "4K": { low: "70+ FPS", medium: "60+ FPS", high: "50+ FPS", ultra: "45+ FPS" } },
    { name: "Hogwarts Legacy", "1080p": { low: "140+ FPS", medium: "120+ FPS", high: "100+ FPS", ultra: "85+ FPS" }, "1440p": { low: "120+ FPS", medium: "100+ FPS", high: "85+ FPS", ultra: "70+ FPS" }, "4K": { low: "60+ FPS", medium: "50+ FPS", high: "45+ FPS", ultra: "40+ FPS" } },
    { name: "Spider-Man Remastered", "1080p": { low: "200+ FPS", medium: "180+ FPS", high: "150+ FPS", ultra: "130+ FPS" }, "1440p": { low: "160+ FPS", medium: "140+ FPS", high: "120+ FPS", ultra: "100+ FPS" }, "4K": { low: "80+ FPS", medium: "70+ FPS", high: "60+ FPS", ultra: "50+ FPS" } },
    { name: "Assassin's Creed Mirage", "1080p": { low: "150+ FPS", medium: "130+ FPS", high: "110+ FPS", ultra: "95+ FPS" }, "1440p": { low: "120+ FPS", medium: "100+ FPS", high: "85+ FPS", ultra: "70+ FPS" }, "4K": { low: "60+ FPS", medium: "50+ FPS", high: "45+ FPS", ultra: "40+ FPS" } },
    { name: "Forza Motorsport", "1080p": { low: "200+ FPS", medium: "180+ FPS", high: "150+ FPS", ultra: "130+ FPS" }, "1440p": { low: "160+ FPS", medium: "140+ FPS", high: "120+ FPS", ultra: "100+ FPS" }, "4K": { low: "80+ FPS", medium: "70+ FPS", high: "60+ FPS", ultra: "50+ FPS" } },
  ],
}

const buildTiers = [
  {
    id: "everyday",
    name: "Everyday Essential",
    price: "$400 - $600",
    icon: Briefcase,
    color: "text-slate-600",
    bgColor: "bg-gradient-to-br from-slate-100 to-slate-200",
    iconColor: "text-slate-600",
    description: "Perfect for browsing, streaming, schoolwork, and home office tasks",
    resolution: "General Use",
    specs: {
      cpu: "AMD Ryzen 5 5600G",
      gpu: "Integrated Graphics",
      ram: "16GB DDR4",
      storage: "500GB NVMe SSD",
      case: "Fractal Design Core 1100",
    },
    games: gamePerformanceData.everyday,
    limitations: "Does not include a dedicated graphics card and cannot play demanding 3D games.",
  },
  {
    id: "budget",
    name: "Budget Build",
    price: "$500 - $800",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-gradient-to-br from-green-100 to-green-200",
    iconColor: "text-green-600",
    description: "Perfect for casual gaming and everyday tasks",
    resolution: "1080p",
    specs: {
      cpu: "AMD Ryzen 5 5600G",
      gpu: "GTX 1660 Super",
      ram: "16GB DDR4",
      storage: "500GB NVMe SSD",
      case: "Corsair 4000D Airflow",
    },
    games: gamePerformanceData.budget,
    limitations: "May struggle with new AAA titles at high settings (e.g., Alan Wake 2).",
  },
  {
    id: "basic",
    name: "Basic Build",
    price: "$800 - $1,200",
    icon: Star,
    color: "text-blue-600",
    bgColor: "bg-gradient-to-br from-blue-100 to-blue-200",
    iconColor: "text-blue-600",
    description: "Great performance for popular games at 1080p",
    resolution: "1080p",
    specs: {
      cpu: "AMD Ryzen 5 7600X",
      gpu: "RTX 4060",
      ram: "16GB DDR5",
      storage: "1TB NVMe SSD",
      case: "Lian Li Lancool 215",
    },
    games: gamePerformanceData.basic,
    limitations: "Not ideal for 1440p gaming in graphically intense titles.",
  },
  {
    id: "esports",
    name: "Esports Build",
    price: "$1,000 - $1,400",
    icon: Gamepad2,
    color: "text-red-600",
    bgColor: "bg-gradient-to-br from-red-100 to-red-200",
    iconColor: "text-red-600",
    description: "Optimized for competitive gaming with high refresh rates",
    resolution: "1080p",
    specs: {
      cpu: "AMD Ryzen 5 7600",
      gpu: "RTX 4060 Ti",
      ram: "16GB DDR5",
      storage: "1TB NVMe SSD",
      case: "NZXT H5 Flow",
    },
    games: gamePerformanceData.esports,
    limitations: "Lower performance in graphics-heavy AAA games compared to the Advanced build.",
  },
  {
    id: "advanced",
    name: "Advanced Build",
    price: "$1,200 - $2,000",
    icon: Trophy,
    color: "text-purple-600",
    bgColor: "bg-gradient-to-br from-purple-100 to-purple-200",
    iconColor: "text-purple-600",
    description: "High-end gaming with 1440p capability",
    resolution: "1440p",
    specs: {
      cpu: "Intel i7-13700K",
      gpu: "RTX 4070 Super",
      ram: "32GB DDR5",
      storage: "2TB NVMe SSD",
      case: "Fractal Design Pop Air",
    },
    games: gamePerformanceData.advanced,
    limitations: "Not recommended for smooth 4K gaming on max settings.",
  },
  {
    id: "creator",
    name: "Creator's Workstation",
    price: "$1,800 - $2,500",
    icon: Video,
    color: "text-indigo-600",
    bgColor: "bg-gradient-to-br from-indigo-100 to-indigo-200",
    iconColor: "text-indigo-600",
    description: "A powerhouse designed for streaming, video editing, and demanding creative software",
    resolution: "1440p/4K",
    specs: {
      cpu: "Intel Core i7-14700K",
      gpu: "RTX 4070 Super",
      ram: "32GB DDR5",
      storage: "2TB NVMe SSD",
      case: "Fractal Design North",
    },
    games: gamePerformanceData.creator,
    limitations: "While a top-tier performer, professional studios with extreme rendering needs might opt for even more specialized Threadripper or Xeon CPUs.",
  },
  {
    id: "master",
    name: "Master Build",
    price: "$2,000+",
    icon: Crown,
    color: "text-accent",
    bgColor: "bg-gradient-to-br from-accent/10 to-accent/20",
    iconColor: "text-accent",
    description: "Ultimate gaming experience with 4K capability",
    resolution: "4K",
    specs: {
      cpu: "Intel i9-14900K",
      gpu: "RTX 4080 Super",
      ram: "32GB DDR5",
      storage: "4TB NVMe SSD",
      case: "Hyte Y60",
    },
    games: gamePerformanceData.master,
    limitations: "May not consistently exceed 100 FPS in the most demanding 4K ray-traced games.",
  },
]

interface BuildTiersProps {
  selectedBuilds: string[]
  setSelectedBuilds: (builds: string[]) => void
}

export function BuildTiers({ selectedBuilds, setSelectedBuilds }: BuildTiersProps) {
  const handleBuildToggle = (buildId: string) => {
    setSelectedBuilds(prev => {
      if (prev.includes(buildId)) {
        return prev.filter(id => id !== buildId)
      } else if (prev.length < 4) {
        return [...prev, buildId]
      }
      return prev
    })
  }

  return (
    <section id="builds" className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Choose Your Build Tier</h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto font-normal">
            Each tier is carefully crafted to deliver the best gaming experience within your budget, with detailed FPS
            benchmarks across all quality settings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sticky top-20 z-10 bg-background/95 backdrop-blur-sm">
          {buildTiers.map((tier) => {
            const IconComponent = tier.icon
            return (
              <Card key={tier.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`absolute top-0 left-0 right-0 h-2 ${tier.bgColor}`} />
                
                {/* Compare Checkbox */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`compare-${tier.id}`}
                      checked={selectedBuilds.includes(tier.id)}
                      onCheckedChange={() => handleBuildToggle(tier.id)}
                      disabled={!selectedBuilds.includes(tier.id) && selectedBuilds.length >= 4}
                    />
                    <label
                      htmlFor={`compare-${tier.id}`}
                      className="text-xs font-medium text-muted-foreground cursor-pointer"
                    >
                      Compare
                    </label>
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-3 rounded-lg ${tier.bgColor} shadow-lg border border-white/20`}>
                      <IconComponent className={`h-7 w-7 ${tier.iconColor} drop-shadow-sm`} />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{tier.name}</CardTitle>
                      <Badge variant="secondary" className="text-sm font-medium">
                        {tier.price}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription className="text-base font-normal">{tier.description}</CardDescription>
                  <Badge variant="outline" className="w-fit">
                    Optimized for {tier.resolution}
                  </Badge>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-foreground">Key Components</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Cpu className="h-4 w-4" />
                          <span>{tier.specs.cpu}</span>
                        </div>
                        <PurchaseLinks component={tier.specs.cpu} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Monitor className="h-4 w-4" />
                          <span>{tier.specs.gpu}</span>
                        </div>
                        <PurchaseLinks component={tier.specs.gpu} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          <span>{tier.specs.ram}</span>
                        </div>
                        <PurchaseLinks component={tier.specs.ram} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <HardDrive className="h-4 w-4" />
                          <span>{tier.specs.storage}</span>
                        </div>
                        <PurchaseLinks component={tier.specs.storage} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Box className="h-4 w-4" />
                          <span>{tier.specs.case}</span>
                        </div>
                        <PurchaseLinks component={tier.specs.case} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-base text-foreground flex items-center gap-2">
                      <Gamepad2 className="h-4 w-4" />
                      Game Performance
                    </h4>

                    <Tabs defaultValue="1080p" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 h-8 mb-3">
                        <TabsTrigger value="1080p" className="text-sm">
                          1080p
                        </TabsTrigger>
                        <TabsTrigger value="1440p" className="text-sm">
                          1440p
                        </TabsTrigger>
                      </TabsList>

                      {["1080p", "1440p"].map((resolution) => (
                        <TabsContent key={resolution} value={resolution} className="mt-2">
                          <Tabs defaultValue="high" className="w-full">
                            <TabsList className="grid w-full grid-cols-4 h-8">
                              <TabsTrigger value="low" className="text-xs">
                                Low
                              </TabsTrigger>
                              <TabsTrigger value="medium" className="text-xs">
                                Med
                              </TabsTrigger>
                              <TabsTrigger value="high" className="text-xs">
                                High
                              </TabsTrigger>
                              <TabsTrigger value="ultra" className="text-xs">
                                Ultra
                              </TabsTrigger>
                            </TabsList>

                            {["low", "medium", "high", "ultra"].map((setting) => (
                              <TabsContent key={setting} value={setting} className="mt-2">
                                <div className="space-y-1 max-h-32 overflow-y-auto">
                                  {tier.games.slice(0, 6).map((game, index) => (
                                    <div key={index} className="flex justify-between text-sm">
                                      <span className="text-muted-foreground truncate">{game.name}</span>
                                      <span className="text-accent font-medium ml-2 flex-shrink-0">
                                        {game[resolution as keyof typeof game] && typeof game[resolution as keyof typeof game] === 'object' 
                                          ? (game[resolution as keyof typeof game] as any)[setting] 
                                          : ''}
                                      </span>
                                    </div>
                                  ))}
                                  {tier.games.length > 6 && (
                                    <div className="text-sm text-muted-foreground text-center pt-1">
                                      +{tier.games.length - 6} more games
                                    </div>
                                  )}
                                </div>
                              </TabsContent>
                            ))}
                          </Tabs>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </div>

                  {tier.id === "creator" && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-base text-foreground flex items-center gap-2">
                        <Video className="h-4 w-4 text-indigo-500" />
                        Productivity Performance
                      </h4>
                      <div className="bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-3">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-indigo-800 dark:text-indigo-200 font-medium">Excellent for 4K video editing</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-indigo-800 dark:text-indigo-200 font-medium">Smooth high-bitrate streaming via NVENC</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-indigo-800 dark:text-indigo-200 font-medium">Fast 3D rendering times</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-indigo-800 dark:text-indigo-200 font-medium">Multi-core productivity optimized</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <h4 className="font-semibold text-base text-foreground flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      Limitations & Weaknesses
                    </h4>
                    <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                      <p className="text-sm text-yellow-800 dark:text-yellow-200 font-medium">
                        {tier.limitations}
                      </p>
                    </div>
                  </div>

                  <Button 
                    className="w-full mt-4 hover:shadow-[0_0_20px_rgba(255,140,0,0.3)] hover:border-accent/50 transition-all duration-300" 
                    variant={tier.id === "advanced" ? "default" : "outline"}
                  >
                    Customize Build
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
