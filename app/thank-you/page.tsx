"use client"

import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ThankYouPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <section className="container py-16">
          <div className="max-w-2xl mx-auto bg-card rounded-lg shadow-lg p-8">
            <div className="flex flex-col items-center gap-4 mb-8">
              <CheckCircle className="h-10 w-10 text-green-600" />
              <h1 className="text-3xl font-bold text-center text-foreground">
                Thank You!
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
                We&apos;ve received your build request and will get back to you with a detailed quote within 24-48 hours. Please check your email (and your spam folder!).
              </p>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-3">What happens next?</h3>
            <ul className="mb-6 space-y-2 text-muted-foreground">
              <li>• We&apos;ll review your build requirements and preferences</li>
              <li>• You&apos;ll receive a detailed quote with pricing breakdown</li>
            </ul>
            <Link href="/" passHref>
              <Button variant="outline" className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}