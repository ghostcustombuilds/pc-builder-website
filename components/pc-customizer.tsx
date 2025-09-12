"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import {
  Cpu,
  Monitor,
  HardDrive,
  MemoryStick,
  Power,
  Clapperboard as Motherboard,
  Box,
  Copy,
  Check,
} from "lucide-react"
import Link from "next/link"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"

interface PCComponent {
  id: string
  name: string
  price: number
  category: string
  compatibility: string[]
  power: number
  performanceTier: "everyday" | "budget" | "basic" | "esports" | "advanced" | "creator" | "master"
}

const components: Record<string, PCComponent[]> = {
  cpu: [
    { id: "ryzen5-5600g", name: "AMD Ryzen 5 5600G", price: 159, category: "cpu", compatibility: ["am4"], power: 65, performanceTier: "budget" },
    { id: "ryzen5-7600x", name: "AMD Ryzen 5 7600X", price: 229, category: "cpu", compatibility: ["am5"], power: 105, performanceTier: "basic" },
    { id: "i7-14700k", name: "Intel Core i7-14700K", price: 399, category: "cpu", compatibility: ["lga1700"], power: 125, performanceTier: "creator" },
    { id: "i9-14900k", name: "Intel Core i9-14900K", price: 589, category: "cpu", compatibility: ["lga1700"], power: 125, performanceTier: "master" },
  ],
  gpu: [
    { id: "gtx1660s", name: "NVIDIA GTX 1660 Super", price: 229, category: "gpu", compatibility: ["pcie4"], power: 125, performanceTier: "budget" },
    { id: "rtx4060", name: "NVIDIA RTX 4060", price: 299, category: "gpu", compatibility: ["pcie4"], power: 115, performanceTier: "basic" },
    { id: "rtx4070s", name: "NVIDIA RTX 4070 Super", price: 699, category: "gpu", compatibility: ["pcie4"], power: 220, performanceTier: "advanced" },
    { id: "rtx4080s", name: "NVIDIA RTX 4080 Super", price: 999, category: "gpu", compatibility: ["pcie4"], power: 320, performanceTier: "master" },
  ],
  motherboard: [
    { id: "a520m", name: "ASUS A520M-A", price: 69, category: "motherboard", compatibility: ["am4", "ddr4"], power: 0, performanceTier: "everyday" },
    { id: "b450-gaming", name: "MSI B450 Gaming Plus", price: 89, category: "motherboard", compatibility: ["am4", "ddr4"], power: 0, performanceTier: "budget" },
    { id: "b650-gaming", name: "MSI B650 Gaming Plus", price: 179, category: "motherboard", compatibility: ["am5", "ddr5"], power: 0, performanceTier: "basic" },
    { id: "z790-gaming", name: "MSI Z790 Gaming Pro", price: 219, category: "motherboard", compatibility: ["lga1700", "ddr5"], power: 0, performanceTier: "advanced" },
  ],
  ram: [
    { id: "ddr4-16gb", name: "16GB DDR4-3200", price: 59, category: "ram", compatibility: ["ddr4"], power: 8, performanceTier: "budget" },
    { id: "ddr5-16gb", name: "16GB DDR5-5600", price: 89, category: "ram", compatibility: ["ddr5"], power: 10, performanceTier: "basic" },
    { id: "ddr5-32gb", name: "32GB DDR5-6000", price: 179, category: "ram", compatibility: ["ddr5"], power: 15, performanceTier: "advanced" },
  ],
  storage: [
    { id: "nvme-500gb", name: "500GB NVMe SSD", price: 59, category: "storage", compatibility: ["nvme"], power: 5, performanceTier: "budget" },
    { id: "nvme-1tb", name: "1TB NVMe SSD", price: 89, category: "storage", compatibility: ["nvme"], power: 7, performanceTier: "basic" },
    { id: "nvme-2tb", name: "2TB NVMe SSD", price: 179, category: "storage", compatibility: ["nvme"], power: 8, performanceTier: "advanced" },
    { id: "nvme-4tb", name: "4TB NVMe SSD", price: 399, category: "storage", compatibility: ["nvme"], power: 10, performanceTier: "master" },
  ],
  psu: [
    { id: "psu-450w", name: "450W 80+ Bronze", price: 59, category: "psu", compatibility: ["atx"], power: -450, performanceTier: "everyday" },
    { id: "psu-650w", name: "650W 80+ Gold", price: 89, category: "psu", compatibility: ["atx"], power: -650, performanceTier: "budget" },
    { id: "psu-850w", name: "850W 80+ Gold", price: 149, category: "psu", compatibility: ["atx"], power: -850, performanceTier: "advanced" },
    { id: "psu-1000w", name: "1000W 80+ Gold", price: 199, category: "psu", compatibility: ["atx"], power: -1000, performanceTier: "master" },
  ],
  case: [
    { id: "case-core-1100", name: "Fractal Design Core 1100", price: 49, category: "case", compatibility: ["atx"], power: 0, performanceTier: "everyday" },
    { id: "case-4000d", name: "Corsair 4000D Airflow", price: 89, category: "case", compatibility: ["atx"], power: 0, performanceTier: "budget" },
    { id: "case-h5-flow", name: "NZXT H5 Flow", price: 99, category: "case", compatibility: ["atx"], power: 0, performanceTier: "esports" },
    { id: "case-north", name: "Fractal Design North", price: 149, category: "case", compatibility: ["atx"], power: 0, performanceTier: "creator" },
  ],
}

const gamePerformanceDatabase: Record<string, Record<string, Record<string, string>>> = {
  Fortnite: {
    everyday: { "1080p": "30+ FPS", "1440p": "20+ FPS" },
    budget: { "1080p": "60+ FPS", "1440p": "45+ FPS" },
    basic: { "1080p": "120+ FPS", "1440p": "75+ FPS" },
    esports: { "1080p": "140+ FPS", "1440p": "100+ FPS" },
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
}

const presetBuilds: Record<string, Record<string, string>> = {
  everyday: { cpu: "ryzen5-5600g", gpu: "", motherboard: "a520m", ram: "ddr4-16gb", storage: "nvme-500gb", psu: "psu-450w", case: "case-core-1100" },
  budget: { cpu: "ryzen5-5600g", gpu: "gtx1660s", motherboard: "b450-gaming", ram: "ddr4-16gb", storage: "nvme-500gb", psu: "psu-650w", case: "case-4000d" },
  basic: { cpu: "ryzen5-7600x", gpu: "rtx4060", motherboard: "b650-gaming", ram: "ddr5-16gb", storage: "nvme-1tb", psu: "psu-850w", case: "case-h5-flow" },
  esports: { cpu: "ryzen5-7600x", gpu: "rtx4060", motherboard: "b650-gaming", ram: "ddr5-16gb", storage: "nvme-1tb", psu: "psu-850w", case: "case-h5-flow" },
  advanced: { cpu: "i7-14700k", gpu: "rtx4070s", motherboard: "z790-gaming", ram: "ddr5-32gb", storage: "nvme-2tb", psu: "psu-850w", case: "case-north" },
  creator: { cpu: "i7-14700k", gpu: "rtx4070s", motherboard: "z790-gaming", ram: "ddr5-32gb", storage: "nvme-2tb", psu: "psu-850w", case: "case-north" },
  master: { cpu: "i9-14900k", gpu: "rtx4080s", motherboard: "z790-gaming", ram: "ddr5-32gb", storage: "nvme-4tb", psu: "psu-1000w", case: "case-north" },
}

interface RetailerLinksProps {
  componentName: string
}

/* Brand SVGs (single source) */
const AmazonSvg = (p:{className?:string}) => (
  <svg viewBox="0 0 512 512" className={p.className}><path fill="#111" d="M204 223c0-18 2-33 0-54-2-31-20-58-61-56-17 1-32 5-45 11-7 3-8 8-8 15l1 37c0 9 9 11 13 5 8-33 18-49 33-52 17-3 25 10 26 32l1 18c-20 5-66 12-85 36-6 8-11 18-11 32 0 29 16 47 37 47 28 0 41-20 61-43 1 16 1 23 7 37 2 6 5 8 11 8h34c7 0 9-3 7-10-6-16-7-37-7-67zm-45 25c-8 15-20 30-32 30-8 0-13-6-13-17 0-24 26-32 45-38 0 9 0 17 0 25zM352 254c-7 12-16 24-27 24-12 0-18-9-18-27 0-41 21-56 35-56 12 0 17 8 17 25 0 15-2 23-7 34zm97 26c-3-2-5-2-8-1-10 11-17 15-24 15-8 0-11-6-11-19v-96c0-5-2-8-6-8h-37c-4 0-6 3-6 7v10c-12-12-25-18-40-18-38 0-72 35-72 90 0 40 20 63 50 63 17 0 32-8 46-25 4 17 16 25 33 25 15 0 26-6 38-19 1 15 8 19 17 19h31c5 0 7-3 5-8-6-9-8-18-8-32v-44c0-34-12-53-43-53-18 0-33 6-50 24v-14c0-4-2-7-6-7h-33c-5 0-7 3-7 7v124c-7 8-14 12-21 12-13 0-21-10-21-34 0-46 22-63 37-63 6 0 10 2 14 5 5 4 11 0 11-6v-31c0-4-1-7-4-9-7-5-19-9-34-9-44 0-86 40-86 102 0 47 25 74 63 74 17 0 32-7 46-20 6 14 19 20 37 20 18 0 33-7 46-21 3 14 14 21 30 21 13 0 25-5 38-18 4-4 3-9 0-12l-19-21z"/><path fill="#FF9900" d="M472 320c-55 41-135 64-216 64-82 0-162-23-217-64-11-8-2-19 10-13 62 36 140 55 207 55 66 0 143-17 206-55 13-6 22 5 10 13z"/><path fill="#FF9900" d="M438 284c-8-10-53-12-79-9-6 1-7 6-1 10 53 36 125 26 80-1z"/></svg>
)
const NeweggSvg = (p:{className?:string}) => (
  <svg viewBox="0 0 64 64" className={p.className}><ellipse cx="30" cy="32" rx="22" ry="20" fill="#fff"/><ellipse cx="40" cy="32" rx="16" ry="16" fill="#FFA640"/><path fill="#0F61A8" d="M45 19c3 3 5 7 5 13 0 11-7 19-19 19-8 0-14-3-18-8 4 3 10 5 16 5 14 0 23-9 23-21 0-3-1-6-2-8z"/></svg>
)
const BestBuySvg = (p:{className?:string}) => (
  <svg viewBox="0 0 120 80" className={p.className}><path fill="#FFD400" d="M0 10h90l30 30-30 30H0z"/><text x="14" y="52" fontFamily="Arial Black, Arial" fontSize="30" fill="#000">BB</text></svg>
)

/* Bright solid buttons */
function RetailerLinks({ componentName }: RetailerLinksProps) {
  const q = encodeURIComponent(componentName)
  const links = [
    { name:"Amazon", href:`https://www.amazon.com/s?k=${q}&tag=ghostcustom12-20`, Icon:AmazonSvg, cls:"bg-[#FF9900] hover:bg-[#ffad33] text-[#111]" },
    { name:"Newegg", href:`https://www.newegg.com/p/pl?d=${q}`, Icon:NeweggSvg, cls:"bg-[#1d6fe5] hover:bg-[#3788ff] text-white" },
    { name:"Best Buy", href:`https://www.bestbuy.com/site/searchpage.jsp?st=${q}`, Icon:BestBuySvg, cls:"bg-[#ffe000] hover:bg-[#ffec4d] text-black" },
  ]
  return (
    <div className="flex gap-2">
      {links.map(({name,href,Icon,cls})=>(
        <a key={name}
           href={href}
           target="_blank"
           rel="noopener noreferrer"
           aria-label={name}
           className={`w-12 h-12 rounded-md flex items-center justify-center shadow border border-black/10 ${cls}
                      transition focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-1 focus:ring-offset-background active:scale-[0.95]`}>
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  )
}

interface PurchaseLinksModalProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  selectedComponents: { [key: string]: PCComponent | undefined }
}

function PurchaseLinksModal({ isOpen, onOpenChange, selectedComponents }: PurchaseLinksModalProps) {
  const [copied, setCopied] = useState(false)

  const componentsList = [
    { key: "cpu", label: "CPU", icon: Cpu },
    { key: "gpu", label: "GPU", icon: Monitor },
    { key: "motherboard", label: "Motherboard", icon: Motherboard },
    { key: "ram", label: "RAM", icon: MemoryStick },
    { key: "storage", label: "Storage", icon: HardDrive },
    { key: "psu", label: "PSU", icon: Power },
    { key: "case", label: "Case", icon: Box },
  ]

  const generateBuildList = () =>
    componentsList
      .filter(c => selectedComponents[c.key])
      .map(c => {
        const component = selectedComponents[c.key]!
        return `${c.label}: ${component.name} - $${component.price}`
      })
      .join("\n")

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateBuildList())
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-card border-border p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle>Your Custom Build Parts List</DialogTitle>
          <DialogDescription>
            Click a retailer logo to search for that exact component.
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-4 max-h-[55vh] overflow-y-auto">
          <div className="divide-y divide-border border border-border/50 rounded-md">
            {componentsList.map(c => {
              const component = selectedComponents[c.key]
              if (!component) return null
              const Icon = c.icon
              return (
                <div
                  key={c.key}
                  className="flex items-center gap-4 px-4 py-3 bg-background/40 hover:bg-accent/5 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/40 bg-background">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                    </span>
                    <div className="min-w-0">
                      <div className="font-medium text-foreground truncate">{component.name}</div>
                      <div className="text-xs text-muted-foreground">${component.price}</div>
                    </div>
                  </div>
                  <RetailerLinks componentName={component.name} />
                </div>
              )
            })}
          </div>
        </div>

        <DialogFooter className="flex-col gap-3 px-6 pb-6 pt-2">
          <Button
            variant="outline"
            className="w-full justify-center h-10 rounded-md font-medium"
            onClick={handleCopyToClipboard}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy Plain Text List
              </>
            )}
          </Button>
          <p className="text-[11px] leading-snug text-muted-foreground text-center">
            As an Amazon Associate I earn from qualifying purchases. This helps support the site at no extra cost to you.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

interface CheckoutModalProps {
  open: boolean
  onOpenChange: (v:boolean)=>void
  selected: { [k:string]: PCComponent | undefined }
  total: number
}

const CheckoutModal = ({ open, onOpenChange, selected, total }: CheckoutModalProps) => {
  const items = Object.entries(selected).filter(([,v])=>v)
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle>Review & Purchase</DialogTitle>
          <DialogDescription>Select a retailer to buy each part.</DialogDescription>
        </DialogHeader>
        <div className="px-6 max-h-[55vh] overflow-y-auto pb-4">
          <div className="divide-y border rounded-md">
            {items.map(([key, comp])=>{
              if(!comp) return null
              return (
                <div key={key} className="flex items-center gap-4 px-4 py-3 bg-background/40">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{comp.name}</div>
                    <div className="text-xs text-muted-foreground">${comp.price}</div>
                  </div>
                  <RetailerLinks componentName={comp.name} />
                </div>
              )
            })}
          </div>
          <div className="mt-4 flex justify-between text-sm font-medium">
            <span>Subtotal</span>
            <span>${total}</span>
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground leading-snug">
            As an Amazon Associate I earn from qualifying purchases. Retail purchases complete on external retailer sites.
          </p>
        </div>
        <DialogFooter className="px-6 pb-6">
          <Button className="w-full" onClick={()=>onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

interface QuoteRequestModalProps {
  open: boolean
  onOpenChange: (v:boolean)=>void
  selected: { [k:string]: PCComponent | undefined }
  total: number
}

const QuoteRequestModal = ({ open, onOpenChange, selected, total }: QuoteRequestModalProps) => {
  const buildText = Object.entries(selected)
    .filter(([,v])=>v)
    .map(([k,v])=>`${k.toUpperCase()}: ${v!.name} - $${v!.price}`)
    .join("\n")
  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault()
    // TODO: POST to /api/quote
    onOpenChange(false)
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Request a Build Quote</DialogTitle>
          <DialogDescription>Send your selected parts & notes. We’ll reply by email.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input required name="name" className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input required type="email" name="email" className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm" />
          </div>
            <div>
              <label className="text-sm font-medium">Notes / Goals</label>
              <textarea name="notes" rows={4} className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm" placeholder="Budget, primary games, editing needs..." />
            </div>
          <div>
            <label className="text-xs text-muted-foreground">Selected Parts</label>
            <pre className="mt-1 max-h-40 overflow-auto rounded-md border bg-muted p-2 text-[11px] leading-snug">{buildText || "No parts selected"}</pre>
            <div className="mt-2 text-xs font-medium">Estimated Total: ${total}</div>
          </div>
          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={()=>onOpenChange(false)}>Cancel</Button>
            <Button type="submit">Send Quote</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// --- Service Build (We Build It For You) Modal (UPDATED) ----------------------
interface BuildServiceModalProps {
  open: boolean
  onOpenChange: (v: boolean) => void
  selected: { [k: string]: PCComponent | undefined }
  partsSubtotal: number
}

const BuildServiceModal = ({ open, onOpenChange, selected, partsSubtotal }: BuildServiceModalProps) => {
  const SERVICE_BASE_FEE = 149
  const SERVICE_PERCENT  = 0.07
  const serviceFee = Math.round(SERVICE_BASE_FEE + partsSubtotal * SERVICE_PERCENT)
  const estimatedShipping = Math.round(Math.min(120, Math.max(45, partsSubtotal * 0.04)))
  const totalWithService = partsSubtotal + serviceFee + estimatedShipping
  const items = Object.entries(selected).filter(([,v])=>v)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Force top alignment by overriding default center translate (shadcn uses data-[state=open] animations) */}
      <DialogContent
        className="
          sm:max-w-xl w-[92vw] p-0 overflow-hidden
          flex flex-col
          max-h-[92vh]
          data-[state=open]:translate-y-0
          top-[4vh] -translate-y-0
        "
      >
        <DialogHeader className="px-6 pt-5 pb-2 shrink-0 sticky top-0 bg-background/95 backdrop-blur z-10 border-b">
          <DialogTitle>Professional Build Service</DialogTitle>
          <DialogDescription>
            We purchase, assemble, cable manage, OS install, stress test, and ship to you.
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable middle area */}
        <div className="flex-1 overflow-y-auto px-6 pt-4 pb-4 space-y-5">
          <div className="divide-y border rounded-md">
            {items.length === 0 && (
              <div className="px-4 py-6 text-sm text-muted-foreground text-center">
                No parts selected yet.
              </div>
            )}
            {items.map(([key, comp])=>{
              if(!comp) return null
              return (
                <div key={key} className="flex items-center gap-4 px-4 py-3 bg-background/40">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{comp.name}</div>
                    <div className="text-xs text-muted-foreground">${comp.price}</div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Parts Subtotal</span>
              <span>${partsSubtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Build Service Fee</span>
              <span>${serviceFee}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Est. Shipping / Packaging</span>
              <span>${estimatedShipping}</span>
            </div>
            <div className="flex justify-between font-semibold pt-1 border-t">
              <span>Estimated Total</span>
              <span>${totalWithService}</span>
            </div>
          </div>

          <p className="text-[11px] leading-snug text-muted-foreground">
            Final invoice may adjust for real shipping, regional tax, or part availability.
            No payment taken yet. You will receive a confirmation email & next steps.
          </p>
        </div>

        {/* Sticky footer always visible */}
        <DialogFooter className="px-6 pb-5 pt-3 gap-2 shrink-0 sticky bottom-0 bg-background/95 backdrop-blur border-t flex-col sm:flex-row">
          <Button
            variant="outline"
            className="w-full"
            onClick={()=>onOpenChange(false)}
          >
            Cancel
          </Button>
            <Button
              className="w-full"
              onClick={()=>{
                // TODO: trigger lead capture / API call
                onOpenChange(false)
              }}
              aria-label="Place Build Order"
            >
              Place Build Order
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
// --- End Service Build Modal --------------------------------------------------

export function PCCustomizer() {
  const [selectedBuild, setSelectedBuild] = useState<Record<string, string>>(presetBuilds.budget)
  const [activePreset, setActivePreset] = useState("budget")
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isQuoteOpen, setIsQuoteOpen] = useState(false)
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false)
  const router = useRouter()

  const getComponent = (category: string, id: string): PCComponent | undefined =>
    components[category]?.find(comp => comp.id === id)

  const selectedComponentsForModal = Object.fromEntries(
    Object.entries(selectedBuild).map(([key, id]) => [key, getComponent(key, id)])
  )

  useEffect(() => {
    if (typeof window === "undefined") return
    const params = new URLSearchParams(window.location.search)
    const categories = Object.keys(components)
    const newBuild: Record<string, string> = {}
    let found = false
    categories.forEach(category => {
      const value = params.get(category)
      if (value) {
        const comp = components[category]?.find(c => c.id === value)
        if (comp) {
          newBuild[category] = comp.id
          found = true
        }
      }
    })
    if (found) {
      setSelectedBuild(prev => ({ ...prev, ...newBuild }))
      setActivePreset("custom")
    }
  }, [])

  const getTotalPrice = () =>
    Object.values(selectedBuild).reduce((total, id) => {
      const category = Object.keys(components).find(cat =>
        components[cat].some(comp => comp.id === id)
      )
      return total + (category ? getComponent(category, id)?.price || 0 : 0)
    }, 0)

  const calculatePerformanceTier = () => {
    const cpu = getComponent("cpu", selectedBuild.cpu)
    const gpu = getComponent("gpu", selectedBuild.gpu)
    if (!cpu || !gpu) return "budget"
    const tierValues = { everyday: 0, budget: 1, basic: 2, esports: 3, advanced: 4, creator: 5, master: 6 }
    const avgTier = Math.round(
      tierValues[gpu.performanceTier] * 0.7 + tierValues[cpu.performanceTier] * 0.3
    )
    const tierNames = ["everyday", "budget", "basic", "esports", "advanced", "creator", "master"]
    return tierNames[Math.min(tierNames.length - 1, Math.max(0, avgTier))]
  }

  const getGamePerformance = () => {
    const tier = calculatePerformanceTier()
    return Object.entries(gamePerformanceDatabase).map(([game, tiers]) => ({
      game,
      performance1080p: tiers[tier]?.["1080p"] || "N/A",
      performance1440p: tiers[tier]?.["1440p"] || "N/A",
    }))
  }

  const getLimitations = (price: number) => {
    if (price < 800) return "Entry-level build suited for 1080p esports and light AAA with reduced settings."
    if (price < 1200) return "Strong 1080p and good 1440p performance; some ultra settings may need tweaks."
    if (price < 2000) return "Excellent 1440p and capable 4K in many titles; heavy ray tracing may reduce FPS."
    return "A top-tier 4K gaming machine, though the most demanding ray-traced games may dip below 100 FPS."
  }

  const updateComponent = (category: keyof typeof selectedBuild, componentId: string) => {
    setSelectedBuild(prev => ({
      ...prev,
      [category]: componentId,
    }))
  }

  function handleCheckout() {
    try {
      const build = {
        cpu: selectedCpu,
        gpu: selectedGpu,
        motherboard: selectedMotherboard,
        memory: selectedMemory,
        storage: selectedStorage,
        case: selectedCase,
        psu: selectedPsu,
        totalPrice: totalPrice
      }
      localStorage.setItem("pendingBuild", JSON.stringify(build))
      router.push("/checkout")
    } catch (e) {
      console.error("Failed to start checkout", e)
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>PC Builder</CardTitle>
          <div className="flex flex-wrap gap-2">
            {["everyday","budget","basic","esports","advanced","creator","master"].map(tier => (
              <Badge
                key={tier}
                variant={activePreset === tier ? "default" : "outline"}
                onClick={() => { setSelectedBuild(presetBuilds[tier]); setActivePreset(tier); }}
                className="cursor-pointer"
              >
                {tier.charAt(0).toUpperCase() + tier.slice(1)}
              </Badge>
            ))}
            <Badge
              variant="outline"
              onClick={() => { setSelectedBuild(presetBuilds.budget); setActivePreset("budget") }}
              className="cursor-pointer ml-auto"
            >
              Reset to Budget Build
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-4">
              {Object.keys(components).map(category => {
                const component = getComponent(category, selectedBuild[category])
                const ComponentIcon =
                  category === "cpu" ? Cpu :
                  category === "gpu" ? Monitor :
                  category === "motherboard" ? Motherboard :
                  category === "ram" ? MemoryStick :
                  category === "storage" ? HardDrive :
                  category === "psu" ? Power :
                  category === "case" ? Box : null
                return (
                  <div key={category} className="p-4 bg-muted rounded-lg flex items-center gap-4">
                    {ComponentIcon && <ComponentIcon className="h-8 w-8 text-muted-foreground" />}
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </div>
                      {component ? (
                        <div className="font-medium text-foreground">
                          {component.name} - ${component.price}
                        </div>
                      ) : (
                        <div className="text-sm text-muted-foreground">No component selected</div>
                      )}
                    </div>
                    <Select
                      onValueChange={value => updateComponent(category as keyof typeof selectedBuild, value)}
                      defaultValue={selectedBuild[category]}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        {components[category].map(comp => (
                          <SelectItem
                            key={comp.id}
                            value={comp.id}
                            disabled={
                              category === "motherboard" &&
                              !comp.compatibility.includes(
                                getComponent("cpu", selectedBuild.cpu)?.compatibility[0] || ""
                              )
                            }
                          >
                            {comp.name} - ${comp.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {component && (
                      <div className="ml-3">
                        <RetailerLinks componentName={component.name} />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground">Total Price</div>
                <div className="text-2xl font-bold text-foreground">${getTotalPrice()}</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground">Performance Tier</div>
                <div className="text-lg font-semibold text-foreground">
                  {calculatePerformanceTier().charAt(0).toUpperCase() + calculatePerformanceTier().slice(1)}
                </div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground">Game Performance (Estimated)</div>
                <div className="text-xs text-muted-foreground mb-2">Based on selected CPU and GPU</div>
                {getGamePerformance().map(({ game, performance1080p, performance1440p }) => (
                  <div key={game} className="flex justify-between text-sm">
                    <div>{game}</div>
                    <div className="flex gap-2">
                      <div>{performance1080p}</div>
                      <div>{performance1440p}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground">Limitations</div>
                <div className="text-xs text-muted-foreground mb-2">Rough guidelines based on total price</div>
                <div className="text-sm text-foreground">{getLimitations(getTotalPrice())}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Button className="flex-1" onClick={()=>setIsCheckoutOpen(true)}>
          Review & Purchase
        </Button>
        <Button className="flex-1" variant="secondary" onClick={()=>setIsServiceModalOpen(true)}>
          We Build It For You
        </Button>
        <Button variant="outline" className="flex-1" onClick={()=>setIsQuoteOpen(true)}>
          Request Quote
        </Button>
        <Button
          variant="ghost"
          className="flex-1"
          onClick={()=>{
            setSelectedBuild(presetBuilds.budget)
            setActivePreset("budget")
          }}
        >
          Reset Build
        </Button>
      </div>
      <PurchaseLinksModal
        isOpen={isPurchaseModalOpen}
        onOpenChange={setIsPurchaseModalOpen}
        selectedComponents={selectedComponentsForModal}
      />
      <CheckoutModal
        open={isCheckoutOpen}
        onOpenChange={setIsCheckoutOpen}
        selected={selectedComponentsForModal}
        total={getTotalPrice()}
      />
      <QuoteRequestModal
        open={isQuoteOpen}
        onOpenChange={setIsQuoteOpen}
        selected={selectedComponentsForModal}
        total={getTotalPrice()}
      />
      <BuildServiceModal
        open={isServiceModalOpen}
        onOpenChange={setIsServiceModalOpen}
        selected={selectedComponentsForModal}
        partsSubtotal={getTotalPrice()}
      />
      <div className="mt-3">
        <RetailerLinks componentName="AMD Ryzen 5 5600G" />
      </div>
    </div>
  )
}