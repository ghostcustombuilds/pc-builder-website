"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Cpu,
  Monitor,
  HardDrive,
  MemoryStick,
  Power,
  Clapperboard as Motherboard,
  BookOpen,
  Lightbulb,
  TrendingUp,
  Zap,
  DollarSign,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  ArrowUp,
  Shield,
  Clock,
  LucideProps,
} from "lucide-react"
import React from "react"

interface GuideSection {
  id: string
  title: string
  icon: React.ComponentType<LucideProps>
  color: string
  description: string
  content: {
    overview: string
    performance: string
    recommendations: string[]
    compatibility: string
    upgradeAdvice: string
    beginnerTips: string[]
  }
}

const componentGuides: GuideSection[] = [
    {
    id: "cpu",
    title: "CPU (Processor)",
    icon: Cpu,
    color: "text-blue-600",
    description: "The brain of your computer that handles all calculations and processing",
    content: {
      overview:
        "The CPU (Central Processing Unit) is responsible for executing instructions and performing calculations. In gaming, it handles game logic, physics calculations, AI behavior, and coordinates with other components. Think of it as the conductor of an orchestra - it tells every other component what to do and when to do it.",
      performance:
        "CPU performance affects frame rates, especially in CPU-intensive games like strategy games, simulation games, and open-world titles. A faster CPU reduces stuttering and provides smoother gameplay. Modern games are becoming more CPU-dependent, so don't skimp on this component.",
      recommendations: [
        "For 1080p gaming: AMD Ryzen 5 7600X or Intel i5-13600K - perfect balance of price and performance",
        "For 1440p gaming: AMD Ryzen 7 7700X or Intel i7-13700K - handles high refresh rates smoothly",
        "For 4K gaming: Intel i9-14900K or AMD Ryzen 9 7900X - ensures no CPU bottlenecks",
        "Consider future-proofing with higher core counts for upcoming games that use more cores",
      ],
      compatibility:
        "CPUs must match your motherboard's socket type (AM5 for AMD Ryzen 7000 series, LGA1700 for Intel 12th/13th gen). Also ensure your motherboard supports the CPU's power requirements and has adequate cooling.",
      upgradeAdvice:
        "CPU upgrades typically last 4-6 years. When upgrading, you may need a new motherboard and RAM too. Signs you need an upgrade: consistent 100% CPU usage in games, stuttering in CPU-heavy titles, or slow performance in productivity tasks.",
      beginnerTips: [
        "More cores doesn't always mean better gaming performance - focus on single-core speed",
        "Stock coolers are usually adequate for non-overclocked CPUs",
        "AMD and Intel trade performance leadership regularly - both are excellent choices",
        "Don't pair a budget CPU with a high-end GPU or vice versa",
      ],
    },
  },
  {
    id: "gpu",
    title: "GPU (Graphics Card)",
    icon: Monitor,
    color: "text-green-600",
    description: "Renders all the visuals and determines your gaming performance",
    content: {
      overview:
        "The GPU (Graphics Processing Unit) is the most important component for gaming performance. It renders all visual elements, applies effects, and determines what resolution and frame rates you can achieve. This is where you should spend the most money if gaming is your priority.",
      performance:
        "GPU performance directly correlates with gaming experience. A more powerful GPU allows higher resolutions, better graphics settings, and higher frame rates. It's typically the biggest factor in gaming performance - often accounting for 60-80% of your gaming experience quality.",
      recommendations: [
        "For 1080p 60fps: RTX 4060 or RX 7600 - great for high settings gaming",
        "For 1080p 120fps: RTX 4070 or RX 7700 XT - perfect for competitive gaming",
        "For 1440p 60fps: RTX 4070 Super or RX 7800 XT - excellent high-resolution gaming",
        "For 4K gaming: RTX 4080 Super or RX 7900 XTX - premium 4K experience",
      ],
      compatibility:
        "Modern GPUs use PCIe x16 slots (available on all modern motherboards). Ensure your PSU has enough wattage and the required power connectors (6-pin, 8-pin, or 12-pin). Also check that the GPU physically fits in your case.",
      upgradeAdvice:
        "GPUs typically need upgrading every 3-4 years for cutting-edge performance, or 5-6 years for acceptable performance. Upgrade when you can't achieve your desired frame rate at your preferred settings. GPU upgrades are usually straightforward and don't require other component changes.",
      beginnerTips: [
        "VRAM (video memory) is crucial - 8GB minimum for modern games, 12GB+ for future-proofing",
        "Ray tracing looks amazing but significantly impacts performance",
        "DLSS (NVIDIA) and FSR (AMD) can boost performance significantly",
        "Used GPUs can be great value, but check their mining history",
      ],
    },
  },
  {
    id: "motherboard",
    title: "Motherboard",
    icon: Motherboard,
    color: "text-purple-600",
    description: "Connects all components together and provides expansion options",
    content: {
      overview:
        "The motherboard is the main circuit board that connects all components. It determines what CPU you can use, how much RAM you can install, and what expansion options you have. Think of it as the foundation of your house - everything else builds on top of it.",
      performance:
        "While motherboards don't directly affect gaming performance, they enable features like faster RAM speeds, multiple GPU support, and high-speed storage connections that can improve overall system performance. A good motherboard also ensures system stability.",
      recommendations: [
        "For AMD: B650 chipset for budget builds, X670E for high-end features and overclocking",
        "For Intel: B760 chipset for budget builds, Z790 for overclocking and premium features",
        "Ensure adequate VRM cooling for high-end CPUs - look for heatsinks on power delivery",
        "Consider future expansion needs (PCIe slots, M.2 slots, USB ports)",
      ],
      compatibility:
        "Must match your CPU socket (AM5 for AMD Ryzen 7000, LGA1700 for Intel 12th/13th gen). Also determines RAM type (DDR4 vs DDR5) and maximum supported speeds. Check the CPU support list before buying.",
      upgradeAdvice:
        "Motherboards rarely need upgrading unless you're changing CPU platforms. They typically last through multiple CPU generations. Upgrade when you need more features, better overclocking support, or when switching CPU brands.",
      beginnerTips: [
        "Don't overspend on features you won't use - focus on solid basics",
        "More expensive doesn't always mean better for your needs",
        "Built-in WiFi and Bluetooth are convenient but add to the cost",
        "ATX boards have more features, but mATX can be sufficient for most builds",
      ],
    },
  },
  {
    id: "ram",
    title: "RAM (Memory)",
    icon: MemoryStick,
    color: "text-accent",
    description: "Temporary storage for active programs and game data",
    content: {
      overview:
        "RAM (Random Access Memory) provides temporary storage for data that your CPU needs quick access to. Games load textures, models, and other assets into RAM for fast access during gameplay. It's like your computer's short-term memory - the more you have, the more things you can keep readily available.",
      performance:
        "Insufficient RAM causes stuttering and long loading times. Faster RAM speeds can improve performance in some games, especially with AMD CPUs. 16GB is the current sweet spot for gaming, but 32GB is becoming more common for future-proofing.",
      recommendations: [
        "Minimum: 16GB for modern gaming - this handles all current games comfortably",
        "Recommended: 32GB for future-proofing and multitasking while gaming",
        "Speed: DDR5-5600 for good price/performance balance with modern CPUs",
        "Timing: Lower latency (CL) numbers are better, but speed matters more than timings",
      ],
      compatibility:
        "Must match motherboard memory type (DDR4 or DDR5). Check motherboard QVL (Qualified Vendor List) for guaranteed compatibility at rated speeds. Mixing different RAM kits can cause stability issues.",
      upgradeAdvice:
        "RAM is one of the easiest upgrades. Add more sticks if you have free slots, or replace existing sticks with higher capacity ones. Upgrade when you consistently use 80%+ of your current RAM or experience stuttering in games.",
      beginnerTips: [
        "Buy RAM in matched kits (2x8GB rather than 1x16GB) for better performance",
        "Enable XMP/DOCP in BIOS to run RAM at rated speeds",
        "RGB RAM looks cool but costs more - prioritize capacity and speed first",
        "32GB is overkill for gaming alone but great if you stream or create content",
      ],
    },
  },
  {
    id: "storage",
    title: "Storage (SSD/HDD)",
    icon: HardDrive,
    color: "text-cyan-600",
    description: "Stores your operating system, games, and files",
    content: {
      overview:
        "Storage devices hold your operating system, games, and files. SSDs (Solid State Drives) are much faster than traditional HDDs (Hard Disk Drives) and significantly improve loading times. Modern gaming essentially requires an SSD for the best experience.",
      performance:
        "SSDs dramatically reduce game loading times, level transitions, and system boot times. NVMe SSDs are faster than SATA SSDs. Storage speed doesn't affect frame rates but improves overall experience and reduces waiting time.",
      recommendations: [
        "Primary: 1TB NVMe SSD for OS and main games - this is your speed priority",
        "Secondary: 2TB+ HDD for mass storage of older games and files (optional)",
        "Speed: PCIe 4.0 NVMe for fastest loading times, but PCIe 3.0 is still excellent",
        "Capacity: 500GB minimum, 1TB+ recommended as games are getting larger",
      ],
      compatibility:
        "Modern motherboards have M.2 slots for NVMe SSDs. SATA SSDs/HDDs connect via SATA cables. Check motherboard specifications for number of available slots and supported speeds.",
      upgradeAdvice:
        "Storage is easy to upgrade - just add more drives. Upgrade when you're running low on space or want faster loading times. Moving from HDD to SSD is one of the most noticeable upgrades you can make.",
      beginnerTips: [
        "Install your OS and most-played games on the fastest SSD",
        "1TB fills up faster than you think with modern games",
        "NVMe SSDs don't need cables - they plug directly into the motherboard",
        "Keep 10-15% of your SSD free for optimal performance",
      ],
    },
  },
  {
    id: "psu",
    title: "PSU (Power Supply)",
    icon: Power,
    color: "text-red-600",
    description: "Provides clean, stable power to all components",
    content: {
      overview:
        "The PSU (Power Supply Unit) converts AC power from your wall outlet to DC power that your components need. It must provide enough wattage and have the right connectors for your components. A quality PSU protects your expensive components and ensures system stability.",
      performance:
        "A quality PSU ensures stable power delivery, which prevents crashes and component damage. Insufficient wattage can cause system instability or prevent the system from running at all. Cheap PSUs can damage other components if they fail.",
      recommendations: [
        "Wattage: Calculate total system power + 20% headroom for efficiency and upgrades",
        "Efficiency: 80+ Gold rating for good efficiency and lower electricity bills",
        "Modularity: Fully modular for better cable management and airflow",
        "Brand: Stick to reputable manufacturers (Corsair, EVGA, Seasonic, be quiet!)",
      ],
      compatibility:
        "Check that PSU has required connectors: 24-pin motherboard, 8-pin CPU, PCIe connectors for GPU. Ensure PSU fits in your case (ATX, SFX, etc.) and has adequate cable length.",
      upgradeAdvice:
        "Quality PSUs can last 7-10 years or more. Upgrade when you need more wattage for new components, want better efficiency, or if your current PSU is making noise or showing instability. Never cheap out on the PSU.",
      beginnerTips: [
        "Never buy a no-name PSU - it can destroy your entire system",
        "Modular cables make building much easier and improve airflow",
        "80+ Gold is the sweet spot for efficiency vs cost",
        "Your PSU should be quiet - if it's loud, something might be wrong",
      ],
    },
  },
]

const commonMistakes = [
  {
    title: "Skimping on the Power Supply",
    description: "Buying a cheap, low-quality PSU to save money",
    why: "A failing PSU can damage or destroy all your other components, potentially costing thousands in repairs.",
    solution:
      "Invest in a quality 80+ Gold rated PSU from reputable brands like Corsair, EVGA, or Seasonic. Calculate your system's power draw and add 20% headroom.",
    icon: AlertTriangle,
    severity: "Critical",
  },
  {
    title: "Unbalanced Component Selection",
    description: "Pairing a high-end GPU with a budget CPU or vice versa",
    why: "This creates bottlenecks where one component limits the performance of another, wasting money and performance.",
    solution:
      "Match your components appropriately. For gaming, spend 40-50% of your budget on the GPU, 20-25% on CPU. Use bottleneck calculators as a rough guide.",
    icon: AlertCircle,
    severity: "High",
  },
  {
    title: "Insufficient RAM for Modern Gaming",
    description: "Building with only 8GB of RAM or buying slow RAM speeds",
    why: "Modern games increasingly require 16GB+ RAM, and slow RAM can significantly impact performance, especially with AMD CPUs.",
    solution:
      "Start with 16GB of fast RAM (DDR4-3200+ or DDR5-5600+) in a 2x8GB kit. Enable XMP/DOCP in BIOS to run at rated speeds.",
    icon: MemoryStick,
    severity: "Medium",
  },
  {
    title: "Forgetting About Future Upgrades",
    description: "Not considering upgrade paths when selecting motherboard and PSU",
    why: "You might need to replace multiple components instead of just upgrading one, significantly increasing costs.",
    solution:
      "Choose a motherboard with extra RAM slots and PCIe slots. Buy a PSU with 20% more wattage than you currently need. Consider CPU upgrade paths within the same socket.",
    icon: TrendingUp,
    severity: "Medium",
  },
  {
    title: "Ignoring Case Airflow and Cooling",
    description: "Focusing only on components and neglecting proper cooling setup",
    why: "Poor cooling leads to thermal throttling, reducing performance and potentially shortening component lifespan.",
    solution:
      "Plan your airflow: intake fans at front/bottom, exhaust at rear/top. Ensure your CPU cooler is adequate for your processor. Monitor temperatures after building.",
    icon: Zap,
    severity: "Medium",
  },
]

const upgradeGuide = [
  {
    component: "Graphics Card (GPU)",
    when: "When you can't achieve desired FPS at your preferred settings",
    difficulty: "Easy",
    cost: "$200-$1500",
    impact: "High",
    tips: "Usually the most impactful upgrade for gaming. Check PSU wattage requirements and physical clearance in your case.",
    icon: Monitor,
  },
  {
    component: "RAM (Memory)",
    when: "When you consistently use 80%+ of current RAM or experience stuttering",
    difficulty: "Very Easy",
    cost: "$50-$200",
    impact: "Medium",
    tips: "Easiest upgrade to perform. Add more sticks if you have free slots, or replace with higher capacity kits.",
    icon: MemoryStick,
  },
  {
    component: "Storage (SSD)",
    when: "When running low on space or want faster loading times",
    difficulty: "Easy",
    cost: "$50-$300",
    impact: "Medium",
    tips: "Adding an SSD is one of the most noticeable upgrades. Install OS and games on the fastest drive.",
    icon: HardDrive,
  },
  {
    component: "CPU (Processor)",
    when: "When CPU usage is consistently 100% in games or productivity tasks",
    difficulty: "Medium",
    cost: "$150-$600",
    impact: "High",
    tips: "May require motherboard and RAM upgrade too. Check socket compatibility before buying.",
    icon: Cpu,
  },
  {
    component: "Motherboard",
    when: "When upgrading to incompatible CPU or need more features",
    difficulty: "Hard",
    cost: "$100-$500",
    impact: "Low",
    tips: "Most complex upgrade requiring complete rebuild. Usually done when changing CPU platforms.",
    icon: Motherboard,
  },
  {
    component: "Power Supply (PSU)",
    when: "When upgrading to more power-hungry components or PSU is failing",
    difficulty: "Medium",
    cost: "$80-$300",
    impact: "Low",
    tips: "Essential for system stability. Never cheap out. Modular cables make installation much easier.",
    icon: Power,
  },
]

const buildingTips = [
  {
    title: "Start with Your Budget",
    description:
      "Determine your total budget first, then allocate roughly 40-50% to GPU, 20-25% to CPU, and distribute the rest among other components.",
    icon: DollarSign,
  },
  {
    title: "GPU is King for Gaming",
    description:
      "Your graphics card has the biggest impact on gaming performance. Prioritize a good GPU over other components if you're primarily gaming.",
    icon: TrendingUp,
  },
  {
    title: "Don't Bottleneck",
    description:
      "Balance your components. Pairing a high-end GPU with a weak CPU (or vice versa) creates bottlenecks that limit performance.",
    icon: AlertCircle,
  },
  {
    title: "Future-Proofing",
    description:
      "Consider buying slightly more powerful components than you need now. This extends your PC's useful life and delays the need for upgrades.",
    icon: Lightbulb,
  },
]

export function EducationalGuides() {
  const [activeGuide, setActiveGuide] = useState("overview")

  return (
    <section id="guides" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Complete PC Building Guide</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know to build your perfect gaming PC with confidence. From components to common
            mistakes, we&apos;ve got you covered.
          </p>
        </div>

        <Tabs value={activeGuide} onValueChange={setActiveGuide} className="w-full">
          <TabsList className="grid w-full grid-cols-5 max-w-2xl mx-auto mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="mistakes">Mistakes</TabsTrigger>
            <TabsTrigger value="upgrades">Upgrades</TabsTrigger>
            <TabsTrigger value="tips">Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-accent" />
                    PC Building Fundamentals
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground mb-4">
                    Building a PC might seem intimidating, but it&apos;s essentially like assembling a high-tech puzzle. Each
                    component has a specific role, and understanding these roles helps you make informed decisions about
                    your build. Don&apos;t worry - thousands of people build their first PC every day, and with the right
                    guidance, you can too!
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-foreground">Performance Hierarchy</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span>
                            <strong>GPU:</strong> Biggest impact on gaming performance (60-80% of gaming experience)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span>
                            <strong>CPU:</strong> Important for frame consistency and high refresh rates
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-accent rounded-full"></div>
                          <span>
                            <strong>RAM:</strong> Prevents stuttering, 16GB minimum for modern games
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                          <span>
                            <strong>Storage:</strong> Affects loading times, not FPS (SSD is essential)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 text-foreground">Budget Allocation Guide</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Graphics Card (GPU)</span>
                          <Badge variant="secondary">40-50%</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Processor (CPU)</span>
                          <Badge variant="secondary">20-25%</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Motherboard + RAM</span>
                          <Badge variant="secondary">15-20%</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Storage + PSU + Case</span>
                          <Badge variant="secondary">15-20%</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                    <h4 className="font-semibold mb-2 text-green-800 dark:text-green-200 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Confidence Booster
                    </h4>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Remember: PC building is much easier than it looks. Components only fit one way, and modern parts
                      are designed to be user-friendly. Take your time, follow guides, and don&apos;t be afraid to ask for
                      help. You&apos;ve got this!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="components" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {componentGuides.map((guide) => {
                const IconComponent = guide.icon
                return (
                  <Card key={guide.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-muted`}>
                          <IconComponent className={`h-6 w-6 ${guide.color}`} />
                        </div>
                        <div>
                          <div>{guide.title}</div>
                          <div className="text-sm font-normal text-muted-foreground">{guide.description}</div>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="overview">
                          <AccordionTrigger className="text-sm">What does it do?</AccordionTrigger>
                          <AccordionContent className="text-sm text-muted-foreground">
                            {guide.content.overview}
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="performance">
                          <AccordionTrigger className="text-sm">How does it affect gaming?</AccordionTrigger>
                          <AccordionContent className="text-sm text-muted-foreground">
                            {guide.content.performance}
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="recommendations">
                          <AccordionTrigger className="text-sm">Recommendations</AccordionTrigger>
                          <AccordionContent>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              {guide.content.recommendations.map((rec, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                                  <span>{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="compatibility">
                          <AccordionTrigger className="text-sm">Compatibility Notes</AccordionTrigger>
                          <AccordionContent className="text-sm text-muted-foreground">
                            {guide.content.compatibility}
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="upgrade">
                          <AccordionTrigger className="text-sm">Upgrade Advice</AccordionTrigger>
                          <AccordionContent className="text-sm text-muted-foreground">
                            {guide.content.upgradeAdvice}
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="tips">
                          <AccordionTrigger className="text-sm">Beginner Tips</AccordionTrigger>
                          <AccordionContent>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              {guide.content.beginnerTips.map((tip, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <Lightbulb className="h-3 w-3 text-accent mt-1 flex-shrink-0" />
                                  <span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="mistakes" className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">Top 5 Mistakes New PC Builders Make</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Learn from others&apos; mistakes! These are the most common errors that can cost you money, performance, or
                even damage your components.
              </p>
            </div>

            <div className="space-y-6">
              {commonMistakes.map((mistake, index) => {
                const IconComponent = mistake.icon
                return (
                  <Card key={index} className="relative overflow-hidden">
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 ${
                        mistake.severity === "Critical"
                          ? "bg-red-500"
                          : mistake.severity === "High"
                            ? "bg-accent"
                            : "bg-yellow-500"
                      }`}
                    />
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            mistake.severity === "Critical"
                              ? "bg-red-50 dark:bg-red-950"
                              : mistake.severity === "High"
                                ? "bg-accent/5 dark:bg-accent/10"
                                : "bg-yellow-50 dark:bg-yellow-950"
                          }`}
                        >
                          <IconComponent
                            className={`h-6 w-6 ${
                              mistake.severity === "Critical"
                                ? "text-red-600"
                                : mistake.severity === "High"
                                  ? "text-accent"
                                  : "text-yellow-600"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span>
                              #{index + 1}: {mistake.title}
                            </span>
                            <Badge
                              variant={mistake.severity === "Critical" ? "destructive" : "secondary"}
                              className="text-xs"
                            >
                              {mistake.severity}
                            </Badge>
                          </div>
                          <div className="text-sm font-normal text-muted-foreground">{mistake.description}</div>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-destructive" />
                          Why This Is a Problem
                        </h4>
                        <p className="text-sm text-muted-foreground">{mistake.why}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          How to Avoid It
                        </h4>
                        <p className="text-sm text-muted-foreground">{mistake.solution}</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Pro Tip: Take Your Time</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      The biggest mistake is rushing. PC building should be enjoyable, not stressful. Research your
                      components, watch build guides, and don&apos;t hesitate to double-check compatibility. A few extra
                      hours of planning can save you hundreds of dollars and lots of frustration.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upgrades" className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">Smart Upgrade Guide</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Know when and how to upgrade your PC components for maximum impact. Prioritize upgrades based on your
                needs and budget.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upgradeGuide.map((upgrade, index) => {
                const IconComponent = upgrade.icon
                return (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <IconComponent className="h-6 w-6 text-accent" />
                        <div>
                          <div>{upgrade.component}</div>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {upgrade.difficulty}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {upgrade.impact} Impact
                            </Badge>
                          </div>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          When to Upgrade
                        </h4>
                        <p className="text-sm text-muted-foreground">{upgrade.when}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          Typical Cost
                        </h4>
                        <p className="text-sm text-muted-foreground">{upgrade.cost}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
                          <Lightbulb className="h-4 w-4" />
                          Pro Tips
                        </h4>
                        <p className="text-sm text-muted-foreground">{upgrade.tips}</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowUp className="h-5 w-5 text-accent" />
                  Upgrade Priority Order
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-green-600">High Priority (Big Impact)</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• GPU upgrade for better gaming performance</li>
                        <li>• HDD to SSD for dramatically faster loading</li>
                        <li>• RAM upgrade if you have less than 16GB</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-accent">Medium Priority</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• CPU upgrade if bottlenecking GPU</li>
                        <li>• More storage when running low on space</li>
                        <li>• Better cooling for lower temperatures</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-blue-600">Low Priority</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Motherboard (unless changing platforms)</li>
                        <li>• PSU (unless insufficient or failing)</li>
                        <li>• Case (unless aesthetics or space issues)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tips" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {buildingTips.map((tip, index) => {
                const IconComponent = tip.icon
                return (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <IconComponent className="h-6 w-6 text-accent" />
                        {tip.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{tip.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-accent" />
                  Quick Reference: Performance Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-green-600">High Impact on Gaming</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Graphics Card (GPU) - 60-80% of gaming performance</li>
                      <li>• CPU (for high refresh rates and CPU-heavy games)</li>
                      <li>• RAM amount (16GB+ needed for modern games)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-accent">Medium Impact</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• RAM speed (especially important for AMD CPUs)</li>
                      <li>• CPU cooling (affects boost clocks and stability)</li>
                      <li>• Power supply quality (affects system stability)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-blue-600">Low Impact on FPS</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Storage speed (affects loading, not frame rates)</li>
                      <li>• Motherboard features (unless enabling faster RAM)</li>
                      <li>• Case and aesthetics (important for temps/noise)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}