"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Thank You Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center">
            {/* Success Icon */}
            <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            
            {/* Headlines */}
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Thank You for Your Request!
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
              We've received your build request and will get back to you with a detailed quote within 24-48 hours. Please check your email (and your spam folder!).
            </p>
            
            {/* Return Button */}
            <Link href="/">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Return to Homepage
              </Button>
            </Link>
            
            {/* Additional Info */}
            <div className="mt-12 p-6 bg-muted/30 rounded-lg border border-border/20">
              <h3 className="text-lg font-semibold text-foreground mb-3">What happens next?</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• We'll review your build requirements and preferences</p>
                <p>• Our team will source the best components at competitive prices</p>
                <p>• You'll receive a detailed quote with pricing breakdown</p>
                <p>• Once approved, we'll begin assembly and testing</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}