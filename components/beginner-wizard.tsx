"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Wand2,
  DollarSign,
  Gamepad2,
  Palette,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Cpu,
  Monitor,
  MemoryStick,
  HardDrive,
  Power,
  Lightbulb,
  Star,
} from "lucide-react"

interface WizardData {
  budget: string
  games: string[]
  style: string
}

const budgetOptions = [
  { id: "500-800", label: "$500 - $800", description: "Entry-level gaming" },
  { id: "800-1200", label: "$800 - $1,200", description: "Solid 1080p gaming" },
  { id: "1200-1800", label: "$1,200 - $1,800", description: "High-end 1440p gaming" },
  { id: "1800+", label: "$1,800+", description: "Premium 4K gaming" },
]

const gameOptions = [
  { id: "competitive", label: "Competitive FPS", description: "Valorant, CS2, Overwatch", priority: "high-fps" },
  { id: "battle-royale", label: "Battle Royale", description: "Fortnite, Apex Legends, PUBG", priority: "balanced" },
  {
    id: "aaa-games",
    label: "AAA Single Player",
    description: "Cyberpunk, Starfield, Elden Ring",
    priority: "graphics",
  },
  { id: "mmo", label: "MMO Games", description: "World of Warcraft, Final Fantasy XIV", priority: "cpu-heavy" },
  { id: "strategy", label: "Strategy Games", description: "Civilization VI, Total War", priority: "cpu-heavy" },
  { id: "indie", label: "Indie Games", description: "Hades, Hollow Knight, Stardew Valley", priority: "budget" },
  { id: "racing", label: "Racing Games", description: "Forza Horizon, F1 23", priority: "graphics" },
  { id: "streaming", label: "Streaming/Content", description: "OBS, video editing", priority: "cpu-heavy" },
]

const styleOptions = [
  { id: "rgb", label: "RGB Gaming", description: "Colorful lights and gaming aesthetics", icon: "🌈" },
  { id: "minimalist", label: "Clean & Minimal", description: "Simple, professional look", icon: "⚪" },
  { id: "performance", label: "Performance First", description: "Best specs, looks don't matter", icon: "⚡" },
  { id: "budget", label: "Budget Focused", description: "Maximum performance per dollar", icon: "💰" },
]

const buildRecommendations = {
  "500-800": {
    competitive: {
      name: "Competitive Gaming Build",
      price: 650,
      explanation:
        "This build focuses on high frame rates for competitive gaming. The GTX 1660 Super and Ryzen 5 5600G provide excellent 1080p performance at 120+ FPS in esports titles.",
      specs: {
        cpu: { name: "AMD Ryzen 5 5600G", reason: "Great for gaming with built-in graphics backup" },
        gpu: { name: "GTX 1660 Super", reason: "Perfect for 1080p competitive gaming at high FPS" },
        ram: { name: "16GB DDR4-3200", reason: "Enough memory for gaming and multitasking" },
        storage: { name: "500GB NVMe SSD", reason: "Fast loading times for your favorite games" },
        motherboard: { name: "B450 Gaming Plus", reason: "Reliable foundation with room to upgrade" },
        psu: { name: "650W 80+ Gold", reason: "Efficient power with headroom for upgrades" },
      },
      performance: "Expect 120-200+ FPS in Valorant, CS2, and Overwatch at 1080p high settings.",
      upgradeNote: "Easy to upgrade the GPU later for even better performance in AAA games.",
    },
    "aaa-games": {
      name: "Budget AAA Gaming Build",
      price: 750,
      explanation:
        "This build balances price and performance for modern AAA games. You'll get solid 60 FPS at 1080p with medium-high settings in most games.",
      specs: {
        cpu: { name: "AMD Ryzen 5 7600X", reason: "Modern CPU that won't bottleneck your graphics card" },
        gpu: { name: "RTX 4060", reason: "Great 1080p performance with DLSS support for better FPS" },
        ram: { name: "16GB DDR5-5600", reason: "Fast memory that works great with modern CPUs" },
        storage: { name: "1TB NVMe SSD", reason: "Plenty of space for multiple large games" },
        motherboard: { name: "B650 Gaming Plus", reason: "Future-proof with DDR5 and PCIe 5.0 support" },
        psu: { name: "650W 80+ Gold", reason: "Clean power delivery for stable performance" },
      },
      performance: "Expect 60+ FPS in Cyberpunk 2077, Starfield, and Elden Ring at 1080p medium-high settings.",
      upgradeNote: "This build has a clear upgrade path to higher-end graphics cards.",
    },
  },
  "800-1200": {
    competitive: {
      name: "High-Performance Esports Build",
      price: 950,
      explanation:
        "Built for competitive gamers who need every advantage. This system delivers 200+ FPS in esports titles and can handle 1440p gaming too.",
      specs: {
        cpu: { name: "AMD Ryzen 5 7600X", reason: "Fast single-core performance for maximum FPS" },
        gpu: { name: "RTX 4060", reason: "Excellent for high refresh rate 1080p and solid 1440p gaming" },
        ram: { name: "16GB DDR5-6000", reason: "High-speed memory for the best gaming performance" },
        storage: { name: "1TB NVMe SSD", reason: "Fast loading and plenty of space for your game library" },
        motherboard: { name: "B650 Gaming Plus", reason: "Great features and future upgrade potential" },
        psu: { name: "750W 80+ Gold", reason: "Plenty of power for current and future upgrades" },
      },
      performance: "Expect 200+ FPS in Valorant/CS2, 150+ FPS in Overwatch, and 100+ FPS in Apex Legends.",
      upgradeNote: "Perfect foundation that can easily handle a GPU upgrade to RTX 4070 or better.",
    },
    "aaa-games": {
      name: "Solid 1080p Gaming Build",
      price: 1100,
      explanation:
        "This build handles all modern games at 1080p high-ultra settings with great performance. It's also capable of 1440p gaming in many titles.",
      specs: {
        cpu: { name: "Intel i5-13600K", reason: "Excellent gaming performance with great multitasking" },
        gpu: { name: "RTX 4070", reason: "Powerful GPU for 1080p ultra and 1440p high settings" },
        ram: { name: "32GB DDR5-5600", reason: "Plenty of memory for gaming, streaming, and multitasking" },
        storage: { name: "1TB NVMe SSD", reason: "Fast storage for quick game loading and system responsiveness" },
        motherboard: { name: "Z790 Gaming Plus", reason: "Premium features and excellent upgrade potential" },
        psu: { name: "750W 80+ Gold", reason: "Reliable power delivery with room for upgrades" },
      },
      performance: "Expect 80+ FPS in Cyberpunk 2077, 100+ FPS in most AAA games at 1080p ultra settings.",
      upgradeNote: "This system is ready for 1440p gaming and has room to grow with future GPU upgrades.",
    },
  },
  "1200-1800": {
    competitive: {
      name: "Pro Esports Powerhouse",
      price: 1400,
      explanation:
        "Built for professional-level competitive gaming. This system delivers maximum FPS at both 1080p and 1440p resolutions.",
      specs: {
        cpu: { name: "Intel i7-13700K", reason: "Top-tier gaming performance with excellent multitasking" },
        gpu: { name: "RTX 4070 Super", reason: "Exceptional performance for high refresh rate gaming" },
        ram: { name: "32GB DDR5-6000", reason: "High-speed memory for maximum performance" },
        storage: { name: "2TB NVMe SSD", reason: "Massive storage for your entire game library" },
        motherboard: { name: "Z790-PRO", reason: "Premium motherboard with all the features you need" },
        psu: { name: "850W 80+ Gold", reason: "Premium power supply for stable, efficient operation" },
      },
      performance: "Expect 300+ FPS in Valorant/CS2, 200+ FPS in Overwatch, and 150+ FPS in Apex Legends at 1440p.",
      upgradeNote: "This is a high-end system that will stay relevant for years to come.",
    },
    "aaa-games": {
      name: "Premium 1440p Gaming Build",
      price: 1600,
      explanation:
        "This high-end build delivers excellent 1440p gaming performance in all modern titles. You'll enjoy ultra settings with smooth frame rates.",
      specs: {
        cpu: { name: "Intel i7-13700K", reason: "Powerful CPU that handles any game or application" },
        gpu: { name: "RTX 4070 Super", reason: "Excellent 1440p performance with ray tracing support" },
        ram: { name: "32GB DDR5-6000", reason: "Plenty of fast memory for gaming and content creation" },
        storage: { name: "2TB NVMe SSD", reason: "Massive, fast storage for all your games and files" },
        motherboard: { name: "Z790-PRO", reason: "Premium features and excellent build quality" },
        psu: { name: "850W 80+ Gold", reason: "High-quality power supply with plenty of headroom" },
      },
      performance: "Expect 100+ FPS in Cyberpunk 2077, 120+ FPS in most AAA games at 1440p ultra settings.",
      upgradeNote: "This premium system is ready for 4K gaming and future GPU upgrades.",
    },
  },
  "1800+": {
    competitive: {
      name: "Ultimate Esports Machine",
      price: 2200,
      explanation:
        "The absolute best for competitive gaming. This system delivers maximum FPS at any resolution and is perfect for professional esports.",
      specs: {
        cpu: { name: "Intel i9-14900K", reason: "The fastest gaming CPU available" },
        gpu: { name: "RTX 4080 Super", reason: "Top-tier performance for any game at any resolution" },
        ram: { name: "32GB DDR5-6400", reason: "Ultra-fast memory for maximum performance" },
        storage: { name: "4TB NVMe SSD", reason: "Massive storage with the fastest loading times" },
        motherboard: { name: "Z790-PRO", reason: "Premium motherboard with all high-end features" },
        psu: { name: "1000W 80+ Gold", reason: "Premium power supply for the most demanding systems" },
      },
      performance: "Expect 400+ FPS in Valorant/CS2, 300+ FPS in Overwatch, and 200+ FPS in any competitive game.",
      upgradeNote: "This is a top-tier system that will dominate any game for years to come.",
    },
    "aaa-games": {
      name: "Ultimate 4K Gaming Build",
      price: 2400,
      explanation:
        "The ultimate gaming experience. This build handles 4K gaming with ray tracing and delivers the best possible performance in every game.",
      specs: {
        cpu: { name: "Intel i9-14900K", reason: "The most powerful gaming CPU for maximum performance" },
        gpu: { name: "RTX 4080 Super", reason: "Top-tier graphics card for 4K gaming with ray tracing" },
        ram: { name: "32GB DDR5-6400", reason: "Ultra-fast memory for the best gaming experience" },
        storage: { name: "4TB NVMe SSD", reason: "Massive, ultra-fast storage for everything you need" },
        motherboard: { name: "Z790-PRO", reason: "Premium motherboard with cutting-edge features" },
        psu: { name: "1000W 80+ Gold", reason: "Top-quality power supply for the most demanding builds" },
      },
      performance: "Expect 60+ FPS in any game at 4K ultra settings with ray tracing enabled.",
      upgradeNote: "This is the ultimate gaming system that will handle anything you throw at it.",
    },
  },
}

export function BeginnerWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [wizardData, setWizardData] = useState<WizardData>({
    budget: "",
    games: [],
    style: "",
  })
  const [showResults, setShowResults] = useState(false)

  const steps = [
    { title: "Budget", icon: DollarSign },
    { title: "Games", icon: Gamepad2 },
    { title: "Style", icon: Palette },
  ]

  const progress = ((currentStep + 1) / steps.length) * 100

  const handleBudgetSelect = (budget: string) => {
    setWizardData((prev) => ({ ...prev, budget }))
  }

  const handleGameToggle = (gameId: string) => {
    setWizardData((prev) => ({
      ...prev,
      games: prev.games.includes(gameId)
        ? prev.games.filter((id) => id !== gameId)
        : prev.games.length < 2
          ? [...prev.games, gameId]
          : [prev.games[1], gameId],
    }))
  }

  const handleStyleSelect = (style: string) => {
    setWizardData((prev) => ({ ...prev, style }))
  }

  const getRecommendation = () => {
    const { budget, games } = wizardData
    const primaryGame = games[0] || "competitive"

    const budgetKey = budget as keyof typeof buildRecommendations
    const gameKey = primaryGame as keyof (typeof buildRecommendations)[typeof budgetKey]

    return buildRecommendations[budgetKey]?.[gameKey] || buildRecommendations["800-1200"]["competitive"]
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowResults(true)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const resetWizard = () => {
    setCurrentStep(0)
    setWizardData({ budget: "", games: [], style: "" })
    setShowResults(false)
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return wizardData.budget !== ""
      case 1:
        return wizardData.games.length > 0
      case 2:
        return wizardData.style !== ""
      default:
        return false
    }
  }

  if (showResults) {
    const recommendation = getRecommendation()
    return (
      <section id="wizard" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <h2 className="text-3xl font-bold text-foreground">Your Perfect PC Build</h2>
            </div>
            <p className="text-lg text-muted-foreground">
              Based on your preferences, here's the ideal PC build for you
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Build Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-accent" />
                  {recommendation.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-4 bg-accent/10 rounded-lg">
                  <div className="text-3xl font-bold text-accent mb-2">${recommendation.price.toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground">Total estimated price</p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Why This Build?
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{recommendation.explanation}</p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Expected Performance</h4>
                  <p className="text-sm text-muted-foreground">{recommendation.performance}</p>
                </div>

                <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Upgrade Tip:</strong> {recommendation.upgradeNote}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Component Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Component Breakdown</CardTitle>
                <p className="text-sm text-muted-foreground">Each part explained in simple terms</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(recommendation.specs).map(([key, spec]) => {
                  const icons = {
                    cpu: Cpu,
                    gpu: Monitor,
                    ram: MemoryStick,
                    storage: HardDrive,
                    motherboard: Cpu,
                    psu: Power,
                  }
                  const IconComponent = icons[key as keyof typeof icons] || Cpu

                  return (
                    <div key={key} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-4 w-4 text-accent" />
                        <span className="font-medium capitalize">{key === "psu" ? "Power Supply" : key}</span>
                      </div>
                      <div className="ml-6 space-y-1">
                        <div className="font-medium text-sm">{spec.name}</div>
                        <div className="text-xs text-muted-foreground">{spec.reason}</div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8 space-y-4">
            <Button size="lg" className="mr-4">
              Build This PC Now
            </Button>
            <Button variant="outline" onClick={resetWizard}>
              Start Over
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="wizard" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Wand2 className="h-8 w-8 text-accent" />
            <h2 className="text-3xl font-bold text-foreground">PC Building Wizard</h2>
          </div>
          <p className="text-lg text-muted-foreground">
            Answer 3 quick questions and we'll recommend the perfect PC build for you
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                {steps.map((step, index) => {
                  const IconComponent = step.icon
                  return (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className={`p-2 rounded-full ${
                          index <= currentStep ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          index <= currentStep ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {step.title}
                      </span>
                      {index < steps.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground ml-2" />}
                    </div>
                  )
                })}
              </div>
            </div>
            <Progress value={progress} className="w-full" />
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Budget */}
            {currentStep === 0 && (
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">What's your budget?</h3>
                  <p className="text-muted-foreground">This helps us recommend the right components for your needs</p>
                </div>
                <RadioGroup value={wizardData.budget} onValueChange={handleBudgetSelect}>
                  {budgetOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                        <div className="font-medium">{option.label}</div>
                        <div className="text-sm text-muted-foreground">{option.description}</div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* Step 2: Games */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">What games do you play?</h3>
                  <p className="text-muted-foreground">Select up to 2 game types that matter most to you</p>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {gameOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        wizardData.games.includes(option.id)
                          ? "border-accent bg-accent/10"
                          : "border-border hover:bg-muted"
                      }`}
                      onClick={() => handleGameToggle(option.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-sm text-muted-foreground">{option.description}</div>
                        </div>
                        {wizardData.games.includes(option.id) && <CheckCircle className="h-5 w-5 text-accent" />}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center text-sm text-muted-foreground">Selected: {wizardData.games.length}/2</div>
              </div>
            )}

            {/* Step 3: Style */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">What's your style preference?</h3>
                  <p className="text-muted-foreground">This helps us choose the right case and components</p>
                </div>
                <RadioGroup value={wizardData.style} onValueChange={handleStyleSelect}>
                  {styleOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{option.icon}</span>
                          <div>
                            <div className="font-medium">{option.label}</div>
                            <div className="text-sm text-muted-foreground">{option.description}</div>
                          </div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
          </CardContent>

          <div className="flex justify-between p-6 pt-0">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button onClick={nextStep} disabled={!canProceed()}>
              {currentStep === steps.length - 1 ? "Get My Build" : "Next"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </section>
  )
}
