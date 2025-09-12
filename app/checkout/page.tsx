"use client"

import { useEffect, useState } from "react"

type Build = {
  cpu?: any
  gpu?: any
  motherboard?: any
  memory?: any
  storage?: any
  case?: any
  psu?: any
  totalPrice?: number
}

export default function CheckoutPage() {
  const [build, setBuild] = useState<Build | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem("pendingBuild")
      if (raw) setBuild(JSON.parse(raw))
    } catch {}
  }, [])

  if (!build) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
        <p>No build found. Go back and configure a PC.</p>
      </div>
    )
  }

  const line = (label: string, v: any) =>
    v ? (
      <div className="flex justify-between py-1 text-sm border-b border-border/30">
        <span className="font-medium">{label}</span>
        <span className="opacity-80">{typeof v === "object" ? (v.name || v.model || v.id || "Selected") : String(v)}</span>
      </div>
    ) : null

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Review Your Build</h1>
      <div className="rounded-lg border p-4 space-y-2">
        {line("CPU", build.cpu)}
        {line("GPU", build.gpu)}
        {line("Motherboard", build.motherboard)}
        {line("Memory", build.memory)}
        {line("Storage", build.storage)}
        {line("Case", build.case)}
        {line("Power Supply", build.psu)}
        <div className="flex justify-between pt-3 text-lg font-semibold">
          <span>Total</span>
            <span>
              {build.totalPrice != null
                ? `$${build.totalPrice.toFixed(2)}`
                : "—"}
            </span>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => history.back()}
          className="px-4 py-2 rounded border"
        >
          Modify Build
        </button>
        <button
          onClick={() => {
            // Placeholder for payment / order creation
            alert("Proceeding to payment (stub). Integrate Stripe or backend order endpoint here.")
          }}
          className="px-4 py-2 rounded bg-primary text-primary-foreground"
        >
          Proceed to Payment
        </button>
      </div>
      <p className="text-xs opacity-60">
        Payment flow not implemented. Hook this to an /api/create-order or Stripe Checkout session.
      </p>
    </div>
  )
}