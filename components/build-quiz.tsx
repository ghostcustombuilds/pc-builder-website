"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Check, Zap, Gamepad2, Monitor, Palette, Cpu, HardDrive, MemoryStick, Copy, Wrench } from "lucide-react"
import Image from "next/image"

interface QuizStep {
  id: string
  title: string
  question: string
  options: {
    id: string
    label: string
    description: string
    icon: React.ComponentType<{ className?: string }>
  }[]
}

const quizSteps: QuizStep[] = [
  {
    id: "budget",
    title: "Budget Range",
    question: "What's your budget for this PC build?",
    options: [
      {
        id: "400-600",
        label: "$400 - $600",
        description: "Everyday essential builds for productivity",
        icon: Zap
      },
      {
        id: "500-800",
        label: "$500 - $800",
        description: "Budget-friendly builds for casual gaming",
        icon: Zap
      },
      {
        id: "800-1200",
        label: "$800 - $1,200",
        description: "Great performance for most games",
        icon: Gamepad2
      },
      {
        id: "1200-2000",
        label: "$1,200 - $2,000",
        description: "High-end gaming and content creation",
        icon: Monitor
      },
      {
        id: "2000+",
        label: "$2,000+",
        description: "Premium builds for enthusiasts",
        icon: Palette
      }
    ]
  },
  {
    id: "use",
    title: "Primary Use",
    question: "What will you primarily use this PC for?",
    options: [
      {
        id: "competitive",
        label: "Competitive Gaming",
        description: "Valorant, CS2, Overwatch 2 - high FPS needed",
        icon: Gamepad2
      },
      {
        id: "aaa",
        label: "AAA Gaming",
        description: "Cyberpunk, Starfield, latest blockbusters",
        icon: Monitor
      },
      {
        id: "streaming",
        label: "Streaming & Content Creation",
        description: "Recording, streaming, video editing",
        icon: Zap
      },
      {
        id: "general",
        label: "General Use",
        description: "Work, web browsing, light gaming",
        icon: Palette
      }
    ]
  },
  {
    id: "style",
    title: "Style Preference",
    question: "What's your preferred PC aesthetic?",
    options: [
      {
        id: "rgb",
        label: "RGB & Glass Panel",
        description: "Colorful lighting with tempered glass",
        icon: Zap
      },
      {
        id: "minimalist",
        label: "Sleek & Minimalist",
        description: "Clean, professional look",
        icon: Palette
      },
      {
        id: "compact",
        label: "Compact & Small Form Factor",
        description: "Space-saving mini-ITX builds",
        icon: Gamepad2
      }
    ]
  }
]

const buildRecommendations = {
  "400-600-competitive": "everyday",
  "400-600-aaa": "everyday",
  "400-600-streaming": "everyday",
  "400-600-general": "everyday",
  "500-800-competitive": "budget",
  "500-800-aaa": "budget",
  "500-800-streaming": "budget",
  "500-800-general": "budget",
  "800-1200-competitive": "esports",
  "800-1200-aaa": "basic",
  "800-1200-streaming": "basic",
  "800-1200-general": "basic",
  "1200-2000-competitive": "esports",
  "1200-2000-aaa": "advanced",
  "1200-2000-streaming": "creator",
  "1200-2000-general": "basic",
  "2000+-competitive": "advanced",
  "2000+-aaa": "master",
  "2000+-streaming": "creator",
  "2000+-general": "advanced"
}

const buildTiers = {
  everyday: {
    name: "Everyday Essential",
    price: "$400 - $600",
    description: "Perfect for browsing, streaming, schoolwork, and home office tasks",
    specs: {
      cpu: "AMD Ryzen 5 5600G",
      gpu: "Integrated Graphics",
      ram: "16GB DDR4",
      storage: "500GB NVMe SSD",
      psu: "450W 80+ Bronze",
      motherboard: "ASUS A520M-A"
    },
    color: "text-slate-600",
    bgColor: "bg-slate-50"
  },
  budget: {
    name: "Budget Build",
    price: "$500 - $800",
    description: "Perfect for casual gaming and everyday tasks",
    specs: {
      cpu: "AMD Ryzen 5 5600G",
      gpu: "GTX 1660 Super",
      ram: "16GB DDR4",
      storage: "500GB NVMe SSD",
      psu: "650W 80+ Gold",
      motherboard: "B450 Gaming Plus"
    },
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  basic: {
    name: "Basic Build",
    price: "$800 - $1,200",
    description: "Great performance for popular games at 1080p",
    specs: {
      cpu: "AMD Ryzen 5 7600X",
      gpu: "RTX 4060",
      ram: "16GB DDR5",
      storage: "1TB NVMe SSD",
      psu: "750W 80+ Gold",
      motherboard: "B650 Gaming Plus"
    },
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  esports: {
    name: "Esports Build",
    price: "$1,000 - $1,400",
    description: "Optimized for competitive gaming with high refresh rates",
    specs: {
      cpu: "AMD Ryzen 5 7600",
      gpu: "RTX 4060 Ti",
      ram: "16GB DDR5",
      storage: "1TB NVMe SSD",
      psu: "750W 80+ Gold",
      motherboard: "B650 Gaming Plus"
    },
    color: "text-red-600",
    bgColor: "bg-red-50"
  },
  advanced: {
    name: "Advanced Build",
    price: "$1,200 - $2,000",
    description: "High-end gaming with 1440p capability",
    specs: {
      cpu: "Intel i7-13700K",
      gpu: "RTX 4070 Super",
      ram: "32GB DDR5",
      storage: "2TB NVMe SSD",
      psu: "850W 80+ Gold",
      motherboard: "Z790 Gaming Plus"
    },
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  creator: {
    name: "Creator's Workstation",
    price: "$1,800 - $2,500",
    description: "A powerhouse designed for streaming, video editing, and demanding creative software",
    specs: {
      cpu: "Intel Core i7-14700K",
      gpu: "RTX 4070 Super",
      ram: "32GB DDR5",
      storage: "2TB NVMe SSD",
      psu: "850W 80+ Gold",
      motherboard: "Z790 Gaming Plus"
    },
    color: "text-indigo-600",
    bgColor: "bg-indigo-50"
  },
  master: {
    name: "Master Build",
    price: "$2,000+",
    description: "Ultimate gaming experience with 4K capability",
    specs: {
      cpu: "Intel i9-14900K",
      gpu: "RTX 4080 Super",
      ram: "32GB DDR5",
      storage: "4TB NVMe SSD",
      psu: "1000W 80+ Platinum",
      motherboard: "Z790 Gaming Pro"
    },
    color: "text-accent",
    bgColor: "bg-accent/5"
  }
}

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

interface BuildQuizProps {
  isOpen: boolean
  onClose: () => void
}

export function BuildQuiz({ isOpen, onClose }: BuildQuizProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (stepId: string, answerId: string) => {
    setAnswers(prev => ({ ...prev, [stepId]: answerId }))
  }

  const handleNext = () => {
    if (currentStep < quizSteps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      setShowResults(true)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleRestart = () => {
    setCurrentStep(0)
    setAnswers({})
    setShowResults(false)
  }

  const getRecommendation = () => {
    const key = `${answers.budget}-${answers.use}`
    const buildId = buildRecommendations[key as keyof typeof buildRecommendations] || "basic"
    return buildTiers[buildId as keyof typeof buildTiers]
  }

  const progress = ((currentStep + 1) / quizSteps.length) * 100

  if (showResults) {
    const recommendation = getRecommendation()
    
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-teal-500">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center mb-4 text-white">
              Your Perfect Build Recommendation
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <Card className="bg-gray-800 border-teal-500 border-2">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-teal-400 mb-2">
                    {recommendation.name}
                  </h3>
                  <Badge className="text-lg px-4 py-2 bg-teal-600 text-white border-teal-500">
                    {recommendation.price}
                  </Badge>
                  <p className="text-gray-300 mt-2">
                    {recommendation.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg mb-3 text-white">Key Components</h4>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg border border-gray-600">
                        <div className="flex items-center gap-3">
                          <Cpu className="h-5 w-5 text-teal-400" />
                          <span className="font-medium text-white">{recommendation.specs.cpu}</span>
                        </div>
                        <PurchaseLinks component={recommendation.specs.cpu} />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg border border-gray-600">
                        <div className="flex items-center gap-3">
                          <Monitor className="h-5 w-5 text-teal-400" />
                          <span className="font-medium text-white">{recommendation.specs.gpu}</span>
                        </div>
                        <PurchaseLinks component={recommendation.specs.gpu} />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg border border-gray-600">
                        <div className="flex items-center gap-3">
                          <MemoryStick className="h-5 w-5 text-teal-400" />
                          <span className="font-medium text-white">{recommendation.specs.ram}</span>
                        </div>
                        <PurchaseLinks component={recommendation.specs.ram} />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg border border-gray-600">
                        <div className="flex items-center gap-3">
                          <HardDrive className="h-5 w-5 text-teal-400" />
                          <span className="font-medium text-white">{recommendation.specs.storage}</span>
                        </div>
                        <PurchaseLinks component={recommendation.specs.storage} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg mb-3 text-white">Additional Components</h4>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg border border-gray-600">
                        <span className="font-medium text-white">Power Supply: {recommendation.specs.psu}</span>
                        <PurchaseLinks component={recommendation.specs.psu} />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg border border-gray-600">
                        <span className="font-medium text-white">Motherboard: {recommendation.specs.motherboard}</span>
                        <PurchaseLinks component={recommendation.specs.motherboard} />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4 justify-center">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="border-teal-500 text-teal-400 hover:bg-teal-600 hover:text-white hover:shadow-[0_0_20px_rgba(20,184,166,0.4)] transition-all duration-300"
                    onClick={() => {
                      // Copy build list to clipboard
                      const buildList = `Build: ${recommendation.name}\nPrice: ${recommendation.price}\n\nComponents:\nCPU: ${recommendation.specs.cpu}\nGPU: ${recommendation.specs.gpu}\nRAM: ${recommendation.specs.ram}\nStorage: ${recommendation.specs.storage}\nPSU: ${recommendation.specs.psu}\nMotherboard: ${recommendation.specs.motherboard}`
                      navigator.clipboard.writeText(buildList)
                      alert("Build list copied to clipboard!")
                    }}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Buy Parts Yourself
                  </Button>
                  <Button
                    className="bg-accent hover:bg-accent/90 text-white hover:shadow-[0_0_20px_rgba(255,140,0,0.4)] transition-all duration-300"
                    onClick={() => {
                      window.open('/build-for-me', '_blank')
                      onClose()
                    }}
                  >
                    <Wrench className="h-4 w-4 mr-2" />
                    Build It For Me
                  </Button>
                </div>
                <div className="flex gap-3 justify-center">
                  <Button
                    onClick={handleRestart}
                    variant="outline"
                    className="border-teal-500 text-teal-400 hover:bg-teal-600 hover:text-white hover:shadow-[0_0_20px_rgba(20,184,166,0.4)] transition-all duration-300"
                  >
                    Take Quiz Again
                  </Button>
                  <Button
                    onClick={onClose}
                    className="bg-teal-600 hover:bg-teal-700 text-white hover:shadow-[0_0_20px_rgba(20,184,166,0.4)] transition-all duration-300"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const currentQuizStep = quizSteps[currentStep]
  const isAnswerSelected = answers[currentQuizStep.id]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gray-900 border-teal-500">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-white">
            {currentQuizStep.title}
          </DialogTitle>
          <p className="text-center text-gray-300">
            Step {currentStep + 1} of {quizSteps.length}
          </p>
        </DialogHeader>

        <div className="space-y-6">
          <Progress value={progress} className="w-full" />
          
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4 text-white">
              {currentQuizStep.question}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuizStep.options.map((option) => {
              const IconComponent = option.icon
              const isSelected = answers[currentQuizStep.id] === option.id
              
              return (
                <Card
                  key={option.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    isSelected 
                      ? 'ring-2 ring-teal-400 bg-teal-900/30 border-teal-500' 
                      : 'bg-gray-800 border-gray-600 hover:bg-gray-700'
                  }`}
                  onClick={() => handleAnswer(currentQuizStep.id, option.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-teal-600' : 'bg-gray-700'}`}>
                        <IconComponent className={`h-5 w-5 ${isSelected ? 'text-white' : 'text-gray-300'}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1 text-white">{option.label}</h4>
                        <p className="text-sm text-gray-300">{option.description}</p>
                      </div>
                      {isSelected && (
                        <Check className="h-5 w-5 text-teal-400" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="flex justify-between">
            <Button
              onClick={handleBack}
              disabled={currentStep === 0}
              variant="outline"
              className="border-teal-500 text-teal-400 hover:bg-teal-600 hover:text-white hover:shadow-[0_0_20px_rgba(20,184,166,0.4)] transition-all duration-300 disabled:opacity-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!isAnswerSelected}
              className="bg-teal-600 hover:bg-teal-700 text-white hover:shadow-[0_0_20px_rgba(20,184,166,0.4)] transition-all duration-300 disabled:opacity-50"
            >
              {currentStep === quizSteps.length - 1 ? 'Get Recommendation' : 'Next'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
