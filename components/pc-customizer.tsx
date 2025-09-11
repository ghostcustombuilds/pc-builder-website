"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"
import {
  Cpu,
  Monitor,
  HardDrive,
  MemoryStick,
  Power,
  Clapperboard as Motherboard,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Gamepad2,
  TrendingUp,
  Copy,
  Check,
  Box,
  Wrench,
} from "lucide-react"

interface PurchaseLinkProps {
  component: string
  className?: string
}

function PurchaseLinks({ component, className = "" }: PurchaseLinkProps) {
  const searchQuery = encodeURIComponent(component)
  
  return (
    <div className={`flex gap-2 group ${className}`}>
      <a
        href={`https://www.amazon.com/s?k=${searchQuery}&tag=ghostcustom12-20`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block p-1 hover:bg-accent/10 rounded transition-all duration-200 hover:scale-110 hover:brightness-110 cursor-pointer group-hover:opacity-50 hover:!opacity-100"
        title="Search on Amazon"
      >
        <Image src="/amazon-logo.svg" alt="Amazon" width={24} height={24} className="pointer-events-none text-white hover:text-accent" />
      </a>
      <a
        href={`https://www.newegg.com/p/pl?d=${searchQuery}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block p-1 hover:bg-accent/10 rounded transition-all duration-200 hover:scale-110 hover:brightness-110 cursor-pointer group-hover:opacity-50 hover:!opacity-100"
        title="Search on Newegg"
      >
        <Image src="/newegg-logo.svg" alt="Newegg" width={24} height={24} className="pointer-events-none text-white hover:text-accent" />
      </a>
      <a
        href={`https://www.bestbuy.com/site/searchpage.jsp?st=${searchQuery}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block p-1 hover:bg-accent/10 rounded transition-all duration-200 hover:scale-110 hover:brightness-110 cursor-pointer group-hover:opacity-50 hover:!opacity-100"
        title="Search on Best Buy"
      >
        <Image src="/bestbuy-logo.svg" alt="Best Buy" width={24} height={24} className="pointer-events-none text-white hover:text-accent" />
      </a>
    </div>
  )
}

interface CopyBuildModalProps {
  selectedComponents: { [key: string]: PCComponent | null }
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

function CopyBuildModal({ selectedComponents, isOpen, onOpenChange }: CopyBuildModalProps) {
  const [copied, setCopied] = useState(false)

  const generateBuildList = () => {
    const components = [
      { key: 'cpu', label: 'CPU', icon: Cpu },
      { key: 'gpu', label: 'GPU', icon: Monitor },
      { key: 'motherboard', label: 'Motherboard', icon: Motherboard },
      { key: 'ram', label: 'RAM', icon: MemoryStick },
      { key: 'storage', label: 'Storage', icon: HardDrive },
      { key: 'psu', label: 'PSU', icon: Power },
      { key: 'case', label: 'Case', icon: Box },
    ]

    return components
      .filter(comp => selectedComponents[comp.key])
      .map(comp => {
        const component = selectedComponents[comp.key]!
        return `${comp.label}: ${component.name} - $${component.price}`
      })
      .join('\n')
  }

  const handleCopyToClipboard = async () => {
    try {
      const buildList = generateBuildList()
      await navigator.clipboard.writeText(buildList)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
    }
  }

  const buildList = generateBuildList()

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Copy Build List</DialogTitle>
          <DialogDescription>
            Copy your selected components to share or save for later.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <pre className="text-sm whitespace-pre-wrap font-mono">
              {buildList || "No components selected"}
            </pre>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleCopyToClipboard}
            disabled={!buildList}
            className="w-full"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied to clipboard!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy to Clipboard
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

interface PCComponent {
  id: string
  name: string
  price: number
  category: string
  export function PCCustomizer() {
    const [selectedBuild, setSelectedBuild] = useState(presetBuilds.budget)
    const [activePreset, setActivePreset] = useState("budget")
    const [isCopyModalOpen, setIsCopyModalOpen] = useState(false)

    const getComponent = (category: string, id: string) => {
      return components[category]?.find((comp) => comp.id === id)
    }

    const calculatePerformanceTier = () => {
      const cpu = getComponent("cpu", selectedBuild.cpu)
      const gpu = getComponent("gpu", selectedBuild.gpu)

      if (!cpu || !gpu) return "budget"

      const gpuTier = gpu.performanceTier
      const cpuTier = cpu.performanceTier

      const tierValues = { everyday: 0, budget: 1, basic: 2, esports: 3, advanced: 4, creator: 5, master: 6 }
      const avgTier = Math.round(tierValues[gpuTier] * 0.7 + tierValues[cpuTier] * 0.3)

      const tierNames = ["everyday", "budget", "basic", "esports", "advanced", "creator", "master"]
      return tierNames[Math.max(0, Math.min(6, avgTier))] as "everyday" | "budget" | "basic" | "esports" | "advanced" | "creator" | "master"
    }

    const getGamePerformance = () => {
      const performanceTier = calculatePerformanceTier()
      const results = []

      for (const [game, tiers] of Object.entries(gamePerformanceDatabase)) {
        results.push({
          game,
          performance1080p: tiers[performanceTier]["1080p"],
          performance1440p: tiers[performanceTier]["1440p"],
        })
      }

      return results
    }

    const checkCompatibility = () => {
      const issues: string[] = []
            {/* Dynamic Copy Build List */}
            <CopyBuildList
              components={{
                cpu: getComponent("cpu", selectedBuild.cpu),
                gpu: getComponent("gpu", selectedBuild.gpu),
                motherboard: getComponent("motherboard", selectedBuild.motherboard),
                ram: getComponent("ram", selectedBuild.ram),
                storage: getComponent("storage", selectedBuild.storage),
                psu: getComponent("psu", selectedBuild.psu),
                case: getComponent("case", selectedBuild.case),
              }}
            />
      const cpu = getComponent("cpu", selectedBuild.cpu)
      const motherboard = getComponent("motherboard", selectedBuild.motherboard)
        return "Perfect for everyday tasks, browsing, and light productivity. Not designed for modern gaming - suitable only for light, older, or browser-based games."
      } else if (price >= 600 && price < 800) {
        return "This build may struggle with new AAA titles at high or ultra settings and is not recommended for 1440p gaming."
      } else if (price >= 800 && price < 1200) {
        return "Optimized for high-framerate 1080p gaming. May not achieve a consistent 60 FPS in the most demanding AAA titles at 1440p."
      } else if (price >= 1200 && price < 2000) {
        return "Excellent for 1440p gaming, but not powerful enough for a smooth, max-settings 4K gaming experience in most new titles."
      } else {
        return "This is a top-tier 4K gaming machine. However, the most graphically intense ray-traced games may still dip below 100 FPS at maximum settings."
      }
    }

    const updateComponent = (category: string, componentId: string) => {
      setSelectedBuild((prev) => ({
        ...prev,
        [category]: componentId,
      }))
      setActivePreset("custom")
    }

    const loadPreset = (preset: string) => {
      if (preset === "everyday") {
        setSelectedBuild(presetBuilds.everyday)
      } else if (preset === "budget") {
        setSelectedBuild(presetBuilds.budget)
      } else if (preset === "basic") {
        setSelectedBuild(presetBuilds.basic)
      } else if (preset === "advanced") {
        setSelectedBuild(presetBuilds.advanced)
      } else if (preset === "creator") {
        setSelectedBuild(presetBuilds.creator)
      } else if (preset === "master") {
        setSelectedBuild(presetBuilds.master)
      } else if (preset === "esports") {
        // If you have an esports preset, add it here
        // setSelectedBuild(presetBuilds.esports)
      }
      setActivePreset(preset)
    }

    const compatibility = checkCompatibility()
    const totalPrice = getTotalPrice()
    const performanceTier = calculatePerformanceTier()
    const gamePerformance = getGamePerformance()

    const componentIcons = {
      cpu: Cpu,
      gpu: Monitor,
      motherboard: Motherboard,
      ram: MemoryStick,
      storage: HardDrive,
      psu: Power,
      case: Box,
    }

    return (
      <section id="customizer" className="py-24 px-4 bg-muted/30">
        {/* ...existing code... */}
      </section>
    )
  }
      advanced: { "1080p": "165+ FPS", "1440p": "120+ FPS" },
      creator: { "1080p": "200+ FPS", "1440p": "150+ FPS" },
      master: { "1080p": "240+ FPS", "1440p": "165+ FPS" },
    },
    Valorant: {
      everyday: { "1080p": "80+ FPS", "1440p": "60+ FPS" },
      budget: { "1080p": "150+ FPS", "1440p": "100+ FPS" },
      basic: { "1080p": "200+ FPS", "1440p": "150+ FPS" },
      esports: { "1080p": "250+ FPS", "1440p": "180+ FPS" },
      advanced: { "1080p": "300+ FPS", "1440p": "200+ FPS" },
      creator: { "1080p": "350+ FPS", "1440p": "250+ FPS" },
      master: { "1080p": "400+ FPS", "1440p": "300+ FPS" },
    },
    "Cyberpunk 2077": {
      everyday: { "1080p": "20+ FPS", "1440p": "10+ FPS" },
      budget: { "1080p": "35+ FPS", "1440p": "25+ FPS" },
      basic: { "1080p": "55+ FPS", "1440p": "40+ FPS" },
      esports: { "1080p": "65+ FPS", "1440p": "50+ FPS" },
      advanced: { "1080p": "75+ FPS", "1440p": "55+ FPS" },
      creator: { "1080p": "85+ FPS", "1440p": "65+ FPS" },
      master: { "1080p": "100+ FPS", "1440p": "75+ FPS" },
    },
    "Call of Duty MW3": {
      everyday: { "1080p": "30+ FPS", "1440p": "20+ FPS" },
      budget: { "1080p": "65+ FPS", "1440p": "45+ FPS" },
      basic: { "1080p": "100+ FPS", "1440p": "70+ FPS" },
      esports: { "1080p": "120+ FPS", "1440p": "90+ FPS" },
      advanced: { "1080p": "140+ FPS", "1440p": "100+ FPS" },
      creator: { "1080p": "160+ FPS", "1440p": "120+ FPS" },
      master: { "1080p": "180+ FPS", "1440p": "140+ FPS" },
    },
    "Elden Ring": {
      everyday: { "1080p": "25+ FPS", "1440p": "15+ FPS" },
      budget: { "1080p": "45+ FPS", "1440p": "35+ FPS" },
      basic: { "1080p": "60+ FPS", "1440p": "45+ FPS" },
      esports: { "1080p": "60+ FPS", "1440p": "60+ FPS" },
      advanced: { "1080p": "60+ FPS", "1440p": "60+ FPS" },
      creator: { "1080p": "60+ FPS", "1440p": "60+ FPS" },
      master: { "1080p": "60+ FPS", "1440p": "60+ FPS" },
    },
    Starfield: {
      everyday: { "1080p": "20+ FPS", "1440p": "10+ FPS" },
      budget: { "1080p": "40+ FPS", "1440p": "30+ FPS" },
      basic: { "1080p": "55+ FPS", "1440p": "40+ FPS" },
      esports: { "1080p": "65+ FPS", "1440p": "50+ FPS" },
      advanced: { "1080p": "70+ FPS", "1440p": "55+ FPS" },
      creator: { "1080p": "80+ FPS", "1440p": "65+ FPS" },
      master: { "1080p": "90+ FPS", "1440p": "70+ FPS" },
    },
    "League of Legends": {
      everyday: { "1080p": "60+ FPS", "1440p": "40+ FPS" },
      budget: { "1080p": "120+ FPS", "1440p": "90+ FPS" },
      basic: { "1080p": "180+ FPS", "1440p": "140+ FPS" },
      esports: { "1080p": "220+ FPS", "1440p": "180+ FPS" },
      advanced: { "1080p": "240+ FPS", "1440p": "180+ FPS" },
      creator: { "1080p": "270+ FPS", "1440p": "210+ FPS" },
      master: { "1080p": "300+ FPS", "1440p": "240+ FPS" },
    },
    "Apex Legends": {
      everyday: { "1080p": "30+ FPS", "1440p": "20+ FPS" },
      budget: { "1080p": "60+ FPS", "1440p": "45+ FPS" },
      basic: { "1080p": "100+ FPS", "1440p": "75+ FPS" },
      esports: { "1080p": "120+ FPS", "1440p": "90+ FPS" },
      advanced: { "1080p": "140+ FPS", "1440p": "100+ FPS" },
      creator: { "1080p": "160+ FPS", "1440p": "120+ FPS" },
      master: { "1080p": "180+ FPS", "1440p": "140+ FPS" },
    },
  }

    const totalPower = Object.entries(selectedBuild).reduce((total, [category, id]) => {
      const component = getComponent(category, id)
      return total + (component?.power || 0)
    }, 0)

    if (psu && Math.abs(psu.power) < totalPower) {
      issues.push(`PSU insufficient: ${totalPower}W needed, ${Math.abs(psu.power)}W available`)
    }

    return { issues, totalPower, psuCapacity: psu ? Math.abs(psu.power) : 0 }
  }

  const getTotalPrice = () => {
    return Object.entries(selectedBuild).reduce((total, [category, id]) => {
      const component = getComponent(category, id)
      return total + (component?.price || 0)
    }, 0)
  }

  const getLimitations = () => {
    const price = getTotalPrice()
    
    if (price < 400) {
      return "This build is designed for basic computing tasks and light productivity. Not suitable for gaming or demanding applications."
    } else if (price >= 400 && price < 600) {
      return "Perfect for everyday tasks, browsing, and light productivity. Not designed for modern gaming - suitable only for light, older, or browser-based games."
    } else if (price >= 600 && price < 800) {
      return "This build may struggle with new AAA titles at high or ultra settings and is not recommended for 1440p gaming."
    } else if (price >= 800 && price < 1200) {
      return "Optimized for high-framerate 1080p gaming. May not achieve a consistent 60 FPS in the most demanding AAA titles at 1440p."
    } else if (price >= 1200 && price < 2000) {
      return "Excellent for 1440p gaming, but not powerful enough for a smooth, max-settings 4K gaming experience in most new titles."
    } else {
      return "This is a top-tier 4K gaming machine. However, the most graphically intense ray-traced games may still dip below 100 FPS at maximum settings."
    }
  }

  const updateComponent = (category: string, componentId: string) => {
    setSelectedBuild((prev) => ({
      ...prev,
      [category]: componentId,
    }))
    setActivePreset("custom")
  }

  const loadPreset = (preset: string) => {
    if (preset === "everyday") {
      setSelectedBuild(presetBuilds.everyday)
    } else if (preset === "budget") {
      setSelectedBuild(presetBuilds.budget)
    } else if (preset === "basic") {
      setSelectedBuild(presetBuilds.basic)
    } else if (preset === "advanced") {
      setSelectedBuild(presetBuilds.advanced)
    } else if (preset === "creator") {
      setSelectedBuild(presetBuilds.creator)
    } else if (preset === "master") {
      setSelectedBuild(presetBuilds.master)
    }
    setActivePreset(preset)
  }

  const compatibility = checkCompatibility()
  const totalPrice = getTotalPrice()
  const performanceTier = calculatePerformanceTier()
  const gamePerformance = getGamePerformance()

  const componentIcons = {
    cpu: Cpu,
    gpu: Monitor,
    motherboard: Motherboard,
    ram: MemoryStick,
    storage: HardDrive,
    psu: Power,
    case: Box,
  }

  return (
    <section id="customizer" className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">PC Build Customizer</h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto font-normal">
            Customize your build and see real-time performance estimates for popular games. We&apos;ll check compatibility,
            calculate power requirements, and show expected FPS.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Component Selection */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Select Components</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={activePreset === "everyday" ? "default" : "outline"}
                      onClick={() => loadPreset("everyday")}
                    >
                      Everyday
                    </Button>
                    <Button
                      size="sm"
                      variant={activePreset === "budget" ? "default" : "outline"}
                      onClick={() => loadPreset("budget")}
                    >
                      Budget
                    </Button>
                    <Button
                      size="sm"
                      variant={activePreset === "basic" ? "default" : "outline"}
                      onClick={() => loadPreset("basic")}
                    >
                      Basic
                    </Button>
                    <Button
                      size="sm"
                      variant={activePreset === "advanced" ? "default" : "outline"}
                      onClick={() => loadPreset("advanced")}
                    >
                      Advanced
                    </Button>
                    <Button
                      size="sm"
                      variant={activePreset === "creator" ? "default" : "outline"}
                      onClick={() => loadPreset("creator")}
                    >
                      Creator
                    </Button>
                    <Button
                      size="sm"
                      variant={activePreset === "master" ? "default" : "outline"}
                      onClick={() => loadPreset("master")}
                    >
                      Master
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(components).map(([category, categoryComponents]) => {
                    const IconComponent = componentIcons[category as keyof typeof componentIcons]
                    const selectedComponent = getComponent(
                      category,
                      selectedBuild[category as keyof typeof selectedBuild],
                    )

                    return (
                      <div key={category} className="space-y-3">
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-5 w-5 text-accent" />
                          <h3 className="font-semibold capitalize">{category}</h3>
                        </div>
                        <Select
                          value={selectedBuild[category as keyof typeof selectedBuild]}
                          onValueChange={(value) => updateComponent(category, value)}
                        >
                          <SelectTrigger>
                            <SelectValue>
                              {selectedComponent ? (
                                <div className="flex items-center justify-between w-full">
                                  <div className="flex items-center gap-2">
                                    <span>{selectedComponent.name}</span>
                                    <PurchaseLinks component={selectedComponent.name} />
                                  </div>
                                  <span className="text-accent font-medium">${selectedComponent.price}</span>
                                </div>
                              ) : (
                                "Select component"
                              )}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {categoryComponents.map((component) => (
                              <SelectItem key={component.id} value={component.id}>
                                <div className="flex items-center justify-between w-full">
                                  <span>{component.name}</span>
                                  <span className="text-accent font-medium ml-4">${component.price}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )
                  })}
                </div>
                
                {/* Compatibility Note */}
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Note:</strong> All recommended cases are compatible with the selected build. If choosing your own case, verify component dimensions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Build Summary */}
          <div className="space-y-6">
            {/* Performance Tier Indicator */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  Performance Tier
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <Badge
                    variant="secondary"
                    className={`text-lg px-4 py-2 mb-2 ${
                      performanceTier === "master"
                        ? "bg-accent/10 text-accent"
                        : performanceTier === "advanced"
                          ? "bg-purple-100 text-purple-800"
                          : performanceTier === "basic"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                    }`}
                  >
                    {performanceTier.charAt(0).toUpperCase() + performanceTier.slice(1)} Tier
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    {performanceTier === "master"
                      ? "Ultimate 4K gaming performance"
                      : performanceTier === "advanced"
                        ? "High-end 1440p gaming"
                        : performanceTier === "basic"
                          ? "Solid 1080p gaming"
                          : "Entry-level gaming performance"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Game Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gamepad2 className="h-5 w-5 text-accent" />
                  Expected Game Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="1080p" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="1080p">1080p</TabsTrigger>
                    <TabsTrigger value="1440p">1440p</TabsTrigger>
                  </TabsList>

                  <TabsContent value="1080p" className="mt-4">
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {gamePerformance.map((game, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{game.game}</span>
                          <span className="text-accent font-medium">{game.performance1080p}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="1440p" className="mt-4">
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {gamePerformance.map((game, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{game.game}</span>
                          <span className="text-accent font-medium">{game.performance1440p}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Potential Bottlenecks & Limitations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  Potential Bottlenecks & Limitations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200 font-medium">
                    {getLimitations()}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Compatibility Check */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {compatibility.issues.length === 0 ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                  )}
                  Compatibility
                </CardTitle>
              </CardHeader>
              <CardContent>
                {compatibility.issues.length === 0 ? (
                  <div className="text-green-600 text-sm">✓ All components are compatible</div>
                ) : (
                  <div className="space-y-2">
                    {compatibility.issues.map((issue, index) => (
                      <Alert key={index} variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription className="text-sm">{issue}</AlertDescription>
                      </Alert>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Power & Price Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-accent" />
                  Build Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Price</span>
                  <span className="text-2xl font-bold text-accent">${totalPrice.toLocaleString()}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Power Draw</span>
                    <span>{compatibility.totalPower}W</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">PSU Capacity</span>
                    <span>{compatibility.psuCapacity}W</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        compatibility.totalPower / compatibility.psuCapacity > 0.8
                          ? "bg-destructive"
                          : compatibility.totalPower / compatibility.psuCapacity > 0.6
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                      style={{
                        width: `${Math.min((compatibility.totalPower / compatibility.psuCapacity) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground text-center">
                    {Math.round((compatibility.totalPower / compatibility.psuCapacity) * 100)}% PSU utilization
                  </div>
                </div>

                {compatibility.issues.length > 0 ? (
                  <Button 
                    className="w-full mt-4 hover:shadow-[0_0_20px_rgba(255,140,0,0.3)] hover:border-accent/50 transition-all duration-300" 
                    disabled
                  >
                    Fix Compatibility Issues
                  </Button>
                ) : (
                  <div className="space-y-3 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Button 
                        variant="outline"
                        className="w-full hover:shadow-[0_0_20px_rgba(255,140,0,0.3)] hover:border-accent/50 transition-all duration-300"
                        onClick={() => setIsCopyModalOpen(true)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Buy Parts Yourself
                      </Button>
                      <Button 
                        className="w-full hover:shadow-[0_0_20px_rgba(255,140,0,0.3)] hover:border-accent/50 transition-all duration-300"
                        onClick={() => window.open('/build-for-me', '_blank')}
                      >
                        <Wrench className="h-4 w-4 mr-2" />
                        Build It For Me
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      Choose how you&apos;d like to proceed with your build
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Build Preset Badge */}
            {activePreset !== "custom" && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Badge variant="secondary" className="mb-2">
                      {activePreset.charAt(0).toUpperCase() + activePreset.slice(1)} Build
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      You&apos;re using a preset build. Modify any component to create a custom build.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Copy Build Modal */}
      <CopyBuildModal
        selectedComponents={{
          cpu: getComponent("cpu", selectedBuild.cpu) ?? null,
          gpu: getComponent("gpu", selectedBuild.gpu) ?? null,
          motherboard: getComponent("motherboard", selectedBuild.motherboard) ?? null,
          ram: getComponent("ram", selectedBuild.ram) ?? null,
          storage: getComponent("storage", selectedBuild.storage) ?? null,
          psu: getComponent("psu", selectedBuild.psu) ?? null,
          case: getComponent("case", selectedBuild.case) ?? null,
        }}
        isOpen={isCopyModalOpen}
        onOpenChange={setIsCopyModalOpen}
      />
    </section>
  )
import CopyBuildList from "@/components/CopyBuildList";

<CopyBuildList
  components={{
    cpu: {
      name: "AMD Ryzen 5 5600G",
      price: 159,
      link: "https://www.amazon.com/dp/B092L9GF5N?tag=ghostcustom12-20",
    },
    gpu: {
      name: "NVIDIA GTX 1660 Super",
      price: 229,
      link: "https://www.amazon.com/dp/B07Z8PWC6R?tag=ghostcustom12-20",
    },
    motherboard: {
      name: "MSI B450 Gaming Plus",
      price: 89,
      link: "https://www.amazon.com/s?k=msi+b450+gaming+plus&tag=ghostcustom12-20",
    },
    ram: {
      name: "16GB DDR4-3200",
      price: 59,
      link: "https://www.amazon.com/dp/B08C56GZGK?tag=ghostcustom12-20",
    },
    storage: {
      name: "500GB NVMe SSD",
      price: 59,
      link: "https://www.amazon.com/dp/B07YFF3JCN?tag=ghostcustom12-20",
    },
    psu: {
      name: "650W 80+ Gold PSU",
      price: 89,
      link: "https://www.amazon.com/s?k=650w+gold+psu&tag=ghostcustom12-20",
    },
    case: {
      name: "Corsair 4000D Airflow",
      price: 89,
      link: "https://www.amazon.com/dp/B08C7BGV3D?tag=ghostcustom12-20",
    },
  }}
/>

