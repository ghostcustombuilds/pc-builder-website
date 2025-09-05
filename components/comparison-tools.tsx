"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import {
  Cpu,
  Monitor,
  HardDrive,
  MemoryStick,
  DollarSign,
  Gamepad2,
  TrendingUp,
  Zap,
  Star,
  Trophy,
  Crown,
  BarChart3,
} from "lucide-react"

const buildTiers = {
  budget: {
    name: "Budget Build",
    price: 650,
    priceRange: "$500 - $800",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-50",
    specs: {
      cpu: "AMD Ryzen 5 5600G",
      gpu: "GTX 1660 Super",
      ram: "16GB DDR4",
      storage: "500GB NVMe SSD",
      psu: "650W 80+ Gold",
      motherboard: "B450 Gaming Plus",
    },
    performance: {
      resolution: "1080p",
      targetFPS: "60 FPS",
      gameSettings: "Medium-High",
    },
    games: [
      { name: "Fortnite", fps: "60+ FPS" },
      { name: "Valorant", fps: "150+ FPS" },
      { name: "League of Legends", fps: "120+ FPS" },
      { name: "CS2", fps: "100+ FPS" },
      { name: "Minecraft", fps: "80+ FPS" },
    ],
  },
  basic: {
    name: "Basic Build",
    price: 950,
    priceRange: "$800 - $1,200",
    icon: Star,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    specs: {
      cpu: "AMD Ryzen 5 7600X",
      gpu: "RTX 4060",
      ram: "16GB DDR5",
      storage: "1TB NVMe SSD",
      psu: "750W 80+ Gold",
      motherboard: "B650 Gaming Plus",
    },
    performance: {
      resolution: "1080p",
      targetFPS: "120+ FPS",
      gameSettings: "High-Ultra",
    },
    games: [
      { name: "Call of Duty MW3", fps: "100+ FPS" },
      { name: "Apex Legends", fps: "100+ FPS" },
      { name: "Cyberpunk 2077", fps: "55+ FPS" },
      { name: "Elden Ring", fps: "60+ FPS" },
      { name: "Forza Horizon 5", fps: "85+ FPS" },
    ],
  },
  advanced: {
    name: "Advanced Build",
    price: 1600,
    priceRange: "$1,200 - $2,000",
    icon: Trophy,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    specs: {
      cpu: "Intel i7-13700K",
      gpu: "RTX 4070 Super",
      ram: "32GB DDR5",
      storage: "2TB NVMe SSD",
      psu: "850W 80+ Gold",
      motherboard: "Z790 Gaming Plus",
    },
    performance: {
      resolution: "1440p",
      targetFPS: "60+ FPS",
      gameSettings: "Ultra",
    },
    games: [
      { name: "Starfield", fps: "70+ FPS" },
      { name: "Baldur's Gate 3", fps: "70+ FPS" },
      { name: "Cyberpunk 2077", fps: "75+ FPS" },
      { name: "Red Dead Redemption 2", fps: "70+ FPS" },
      { name: "Alan Wake 2", fps: "50+ FPS" },
    ],
  },
  master: {
    name: "Master Build",
    price: 2400,
    priceRange: "$2,000+",
    icon: Crown,
    color: "text-accent",
    bgColor: "bg-accent/5",
    specs: {
      cpu: "Intel i9-14900K",
      gpu: "RTX 4080 Super",
      ram: "32GB DDR5",
      storage: "4TB NVMe SSD",
      psu: "1000W 80+ Gold",
      motherboard: "Z790-PRO",
    },
    performance: {
      resolution: "4K",
      targetFPS: "60+ FPS",
      gameSettings: "Ultra",
    },
    games: [
      { name: "Cyberpunk 2077", fps: "100+ FPS" },
      { name: "Microsoft Flight Sim", fps: "65+ FPS" },
      { name: "Alan Wake 2", fps: "85+ FPS" },
      { name: "The Witcher 3", fps: "130+ FPS" },
      { name: "Call of Duty MW3", fps: "180+ FPS" },
    ],
  },
}

const budgetBuilds = [
  { budget: 500, tier: "budget", build: "Entry Gaming", games: ["Valorant", "League of Legends", "CS2"] },
  { budget: 650, tier: "budget", build: "Budget Gaming", games: ["Fortnite", "Valorant", "Minecraft", "CS2"] },
  { budget: 800, tier: "basic", build: "Solid 1080p", games: ["Call of Duty", "Apex Legends", "Overwatch 2"] },
  { budget: 1000, tier: "basic", build: "High 1080p", games: ["Cyberpunk 2077", "Elden Ring", "Starfield"] },
  { budget: 1300, tier: "advanced", build: "Entry 1440p", games: ["All AAA games at 1440p 60fps"] },
  { budget: 1600, tier: "advanced", build: "High-End 1440p", games: ["All games at 1440p Ultra settings"] },
  { budget: 2000, tier: "master", build: "4K Ready", games: ["4K gaming for most titles"] },
  { budget: 2500, tier: "master", build: "Ultimate 4K", games: ["4K Ultra for all games"] },
]

interface ComparisonToolsProps {
  selectedBuilds: string[]
}

export function ComparisonTools({ selectedBuilds }: ComparisonToolsProps) {
  const [budgetValue, setBudgetValue] = useState([1000])
  const [activeTab, setActiveTab] = useState("comparison")

  const getBudgetRecommendation = (budget: number) => {
    const recommendation = budgetBuilds.filter((build) => build.budget <= budget).sort((a, b) => b.budget - a.budget)[0]

    return recommendation || budgetBuilds[0]
  }

  const budgetRecommendation = getBudgetRecommendation(budgetValue[0])
  const recommendedTier = buildTiers[budgetRecommendation.tier as keyof typeof buildTiers]

  return (
    <section id="comparison" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Compare Builds & Budget Tools</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Compare all build tiers side-by-side or use our budget slider to find the perfect PC for your price range
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="comparison">Build Comparison</TabsTrigger>
            <TabsTrigger value="budget">Budget Finder</TabsTrigger>
          </TabsList>

          <TabsContent value="comparison" className="space-y-8">
            {selectedBuilds.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Select Builds to Compare</h3>
                  <p className="text-muted-foreground">
                    Select up to 4 builds above to compare them side-by-side and see their key differences.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="overflow-x-auto">
                <div className="min-w-[600px]">
                  <div className={`grid gap-4`} style={{ gridTemplateColumns: `200px repeat(${selectedBuilds.length}, 1fr)` }}>
                    {/* Header Row */}
                    <div className="font-semibold text-muted-foreground">
                      <div className="h-12 flex items-center">
                        <BarChart3 className="h-5 w-5 mr-2" />
                        Specifications
                      </div>
                    </div>
                    {selectedBuilds.map((buildId) => {
                      const tier = buildTiers[buildId as keyof typeof buildTiers]
                      if (!tier) return null
                      const IconComponent = tier.icon
                      return (
                        <Card key={buildId} className="relative overflow-hidden">
                          <div className={`absolute top-0 left-0 right-0 h-1 ${tier.bgColor}`} />
                          <CardHeader className="pb-3">
                            <div className="flex items-center gap-2">
                              <IconComponent className={`h-5 w-5 ${tier.color}`} />
                              <div>
                                <CardTitle className="text-lg">{tier.name}</CardTitle>
                                <Badge variant="secondary" className="text-xs">
                                  {tier.priceRange}
                                </Badge>
                              </div>
                            </div>
                          </CardHeader>
                        </Card>
                      )
                    })}

                    {/* Price Row */}
                    <div className="font-medium text-sm flex items-center">Total Price</div>
                    {(() => {
                      const prices = selectedBuilds.map(id => buildTiers[id as keyof typeof buildTiers]?.price || 0)
                      const minPrice = Math.min(...prices)
                      return selectedBuilds.map((buildId) => {
                        const tier = buildTiers[buildId as keyof typeof buildTiers]
                        if (!tier) return null
                        const isLowest = tier.price === minPrice
                        return (
                          <Card key={`${buildId}-price`} className={isLowest ? "ring-2 ring-green-500 bg-green-50 dark:bg-green-950/20" : ""}>
                            <CardContent className="pt-4">
                              <div className="text-2xl font-bold text-accent">${tier.price.toLocaleString()}</div>
                              {isLowest && (
                                <div className="text-xs text-green-600 dark:text-green-400 font-medium mt-1">
                                  Best Value
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        )
                      })
                    })()}

                    {/* Performance Row */}
                    <div className="font-medium text-sm flex items-center">Performance Target</div>
                    {selectedBuilds.map((buildId) => {
                      const tier = buildTiers[buildId as keyof typeof buildTiers]
                      if (!tier) return null
                      return (
                        <Card key={`${buildId}-performance`}>
                          <CardContent className="pt-4">
                            <div className="space-y-1">
                              <div className="font-semibold">{tier.performance.resolution}</div>
                              <div className="text-sm text-muted-foreground">{tier.performance.targetFPS}</div>
                              <Badge variant="outline" className="text-xs">
                                {tier.performance.gameSettings}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}

                    {/* CPU Row */}
                    <div className="font-medium text-sm flex items-center">
                      <Cpu className="h-4 w-4 mr-2" />
                      Processor
                    </div>
                    {(() => {
                      const cpuTiers = selectedBuilds.map(id => {
                        const tier = buildTiers[id as keyof typeof buildTiers]
                        return { id, cpu: tier?.specs.cpu || "", tier: tier?.name || "" }
                      })
                      // Simple CPU ranking based on common patterns
                      const cpuRanking = ["i9", "i7", "i5", "Ryzen 7", "Ryzen 5", "Ryzen 3"]
                      const bestCpu = cpuTiers.reduce((best, current) => {
                        const bestRank = cpuRanking.findIndex(cpu => best.cpu.includes(cpu))
                        const currentRank = cpuRanking.findIndex(cpu => current.cpu.includes(cpu))
                        return currentRank < bestRank ? current : best
                      })
                      
                      return selectedBuilds.map((buildId) => {
                        const tier = buildTiers[buildId as keyof typeof buildTiers]
                        if (!tier) return null
                        const isBest = tier.specs.cpu === bestCpu.cpu
                        return (
                          <Card key={`${buildId}-cpu`} className={isBest ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950/20" : ""}>
                            <CardContent className="pt-4">
                              <div className="text-sm">{tier.specs.cpu}</div>
                              {isBest && (
                                <div className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-1">
                                  Most Powerful
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        )
                      })
                    })()}

                    {/* GPU Row */}
                    <div className="font-medium text-sm flex items-center">
                      <Monitor className="h-4 w-4 mr-2" />
                      Graphics Card
                    </div>
                    {(() => {
                      const gpuTiers = selectedBuilds.map(id => {
                        const tier = buildTiers[id as keyof typeof buildTiers]
                        return { id, gpu: tier?.specs.gpu || "", tier: tier?.name || "" }
                      })
                      // Simple GPU ranking
                      const gpuRanking = ["RTX 4090", "RTX 4080", "RTX 4070", "RTX 4060", "RTX 3060", "GTX 1660", "Integrated"]
                      const bestGpu = gpuTiers.reduce((best, current) => {
                        const bestRank = gpuRanking.findIndex(gpu => best.gpu.includes(gpu))
                        const currentRank = gpuRanking.findIndex(gpu => current.gpu.includes(gpu))
                        return currentRank < bestRank ? current : best
                      })
                      
                      return selectedBuilds.map((buildId) => {
                        const tier = buildTiers[buildId as keyof typeof buildTiers]
                        if (!tier) return null
                        const isBest = tier.specs.gpu === bestGpu.gpu
                        return (
                          <Card key={`${buildId}-gpu`} className={isBest ? "ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-950/20" : ""}>
                            <CardContent className="pt-4">
                              <div className="text-sm">{tier.specs.gpu}</div>
                              {isBest && (
                                <div className="text-xs text-purple-600 dark:text-purple-400 font-medium mt-1">
                                  Best Graphics
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        )
                      })
                    })()}

                    {/* RAM Row */}
                    <div className="font-medium text-sm flex items-center">
                      <MemoryStick className="h-4 w-4 mr-2" />
                      Memory
                    </div>
                    {(() => {
                      const ramTiers = selectedBuilds.map(id => {
                        const tier = buildTiers[id as keyof typeof buildTiers]
                        const ram = tier?.specs.ram || ""
                        const gb = parseInt(ram.match(/\d+/)?.[0] || "0")
                        return { id, ram, gb, tier: tier?.name || "" }
                      })
                      const maxRam = Math.max(...ramTiers.map(r => r.gb))
                      const bestRam = ramTiers.find(r => r.gb === maxRam)
                      
                      return selectedBuilds.map((buildId) => {
                        const tier = buildTiers[buildId as keyof typeof buildTiers]
                        if (!tier) return null
                        const isBest = tier.specs.ram === bestRam?.ram
                        return (
                          <Card key={`${buildId}-ram`} className={isBest ? "ring-2 ring-orange-500 bg-orange-50 dark:bg-orange-950/20" : ""}>
                            <CardContent className="pt-4">
                              <div className="text-sm">{tier.specs.ram}</div>
                              {isBest && (
                                <div className="text-xs text-orange-600 dark:text-orange-400 font-medium mt-1">
                                  Most RAM
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        )
                      })
                    })()}

                    {/* Storage Row */}
                    <div className="font-medium text-sm flex items-center">
                      <HardDrive className="h-4 w-4 mr-2" />
                      Storage
                    </div>
                    {(() => {
                      const storageTiers = selectedBuilds.map(id => {
                        const tier = buildTiers[id as keyof typeof buildTiers]
                        const storage = tier?.specs.storage || ""
                        const gb = parseInt(storage.match(/\d+/)?.[0] || "0")
                        return { id, storage, gb, tier: tier?.name || "" }
                      })
                      const maxStorage = Math.max(...storageTiers.map(s => s.gb))
                      const bestStorage = storageTiers.find(s => s.gb === maxStorage)
                      
                      return selectedBuilds.map((buildId) => {
                        const tier = buildTiers[buildId as keyof typeof buildTiers]
                        if (!tier) return null
                        const isBest = tier.specs.storage === bestStorage?.storage
                        return (
                          <Card key={`${buildId}-storage`} className={isBest ? "ring-2 ring-teal-500 bg-teal-50 dark:bg-teal-950/20" : ""}>
                            <CardContent className="pt-4">
                              <div className="text-sm">{tier.specs.storage}</div>
                              {isBest && (
                                <div className="text-xs text-teal-600 dark:text-teal-400 font-medium mt-1">
                                  Most Storage
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        )
                      })
                    })()}

                    {/* Sample Games Row */}
                    <div className="font-medium text-sm flex items-center">
                      <Gamepad2 className="h-4 w-4 mr-2" />
                      Sample Games
                    </div>
                    {selectedBuilds.map((buildId) => {
                      const tier = buildTiers[buildId as keyof typeof buildTiers]
                      if (!tier) return null
                      return (
                        <Card key={`${buildId}-games`}>
                          <CardContent className="pt-4">
                            <div className="space-y-1">
                              {tier.games.slice(0, 3).map((game, index) => (
                                <div key={index} className="flex justify-between text-xs">
                                  <span className="text-muted-foreground truncate">{game.name}</span>
                                  <span className="text-accent font-medium ml-2">{game.fps}</span>
                                </div>
                              ))}
                              {tier.games.length > 3 && (
                                <div className="text-xs text-muted-foreground">+{tier.games.length - 3} more</div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="budget" className="space-y-8">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-accent" />
                    Budget Finder Tool
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Drag the slider to set your budget and see the best PC build and gaming performance you can get
                  </p>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Your Budget</label>
                      <div className="text-2xl font-bold text-accent">${budgetValue[0].toLocaleString()}</div>
                    </div>
                    <Slider
                      value={budgetValue}
                      onValueChange={setBudgetValue}
                      max={3000}
                      min={500}
                      step={50}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>$500</span>
                      <span>$1,500</span>
                      <span>$3,000+</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recommended Build */}
                    <Card className="relative overflow-hidden">
                      <div className={`absolute top-0 left-0 right-0 h-1 ${recommendedTier.bgColor}`} />
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-accent" />
                          Recommended Build
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${recommendedTier.bgColor}`}>
                            <recommendedTier.icon className={`h-6 w-6 ${recommendedTier.color}`} />
                          </div>
                          <div>
                            <div className="font-semibold">{budgetRecommendation.build}</div>
                            <Badge variant="secondary" className="text-xs">
                              {recommendedTier.name}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">Key Components</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">CPU</span>
                              <span>{recommendedTier.specs.cpu}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">GPU</span>
                              <span>{recommendedTier.specs.gpu}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">RAM</span>
                              <span>{recommendedTier.specs.ram}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Storage</span>
                              <span>{recommendedTier.specs.storage}</span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t">
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Estimated Price</span>
                            <span className="text-xl font-bold text-accent">
                              ${recommendedTier.price.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Gaming Performance */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Gamepad2 className="h-5 w-5 text-accent" />
                          Gaming Performance
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center p-4 bg-accent/10 rounded-lg">
                          <div className="font-bold text-lg mb-2">{recommendedTier.performance.resolution}</div>
                          <div className="flex items-center justify-center gap-4 text-sm">
                            <span className="flex items-center gap-1">
                              <Zap className="h-4 w-4" />
                              {recommendedTier.performance.targetFPS}
                            </span>
                            <Badge variant="secondary">{recommendedTier.performance.gameSettings}</Badge>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">Games You Can Play</h4>
                          <div className="space-y-1">
                            {budgetRecommendation.games.map((game, index) => (
                              <div key={index} className="text-sm text-muted-foreground">
                                • {game}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">Sample FPS</h4>
                          <div className="space-y-1">
                            {recommendedTier.games.slice(0, 4).map((game, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span className="text-muted-foreground">{game.name}</span>
                                <span className="text-accent font-medium">{game.fps}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="text-center">
                    <Button 
                      size="lg" 
                      className="w-full md:w-auto hover:shadow-[0_0_25px_rgba(255,140,0,0.4)] hover:border-accent/50 transition-all duration-300"
                    >
                      Build This PC for ${budgetValue[0].toLocaleString()}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
