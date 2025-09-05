"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CheckCircle, Wrench, Truck, Package, Shield, Clock, Zap, ArrowRight } from "lucide-react"

export default function BuildForMePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Want the Perfect PC Without the Hassle?
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-accent mb-4">
              Let Us Build It For You!
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Skip the stress of building your own PC. Our expert technicians will assemble, test, and deliver your dream machine right to your doorstep.
            </p>
          </div>

          {/* How It Works Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-12 text-foreground">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Wrench className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle className="text-xl">1. Plan Your Build</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Use our tools to create your perfect PC, or consult with us directly for personalized recommendations.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle className="text-xl">2. We Assemble & Test</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We source all the parts, professionally assemble your PC, install Windows, and run extensive stress tests.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Truck className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle className="text-xl">3. Ship to Your Door</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We securely package and ship your brand-new, ready-to-play PC right to your doorstep.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* What's Included Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-12 text-foreground">What's Included</h3>
            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium text-foreground">Professional Assembly</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium text-foreground">Expert Cable Management</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium text-foreground">Windows 11 Installation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium text-foreground">All Drivers Installed</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium text-foreground">24-Hour Stress Testing</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium text-foreground">Quality Assurance Check</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium text-foreground">Secure Packaging</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium text-foreground">Setup Instructions</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pricing Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-foreground">Simple, Transparent Pricing</h3>
            <Card className="max-w-md mx-auto">
              <CardContent className="p-8 text-center">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Parts Cost</span>
                    <span className="text-2xl font-bold">$1,200</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Build Fee</span>
                    <span className="text-2xl font-bold text-accent">$250</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-semibold">Total</span>
                      <span className="text-3xl font-bold">$1,450</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  *Example pricing. Final cost depends on your selected components.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Get Quote Form */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-foreground">Get Your Quote</h3>
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Request Your Custom Build Quote</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24 hours with a detailed quote.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form action="https://formspree.io/f/xpwjovwn" method="POST" className="space-y-6">
                  {/* Hidden field to identify form source */}
                  <input type="hidden" name="_subject" value="New Build Quote Request from PC Builder Pro" />
                  <input type="hidden" name="_next" value="http://localhost:3000/thank-you" />
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="build_configuration">Build Configuration *</Label>
                    <Textarea
                      id="build_configuration"
                      name="build_configuration"
                      required
                      placeholder="Copy and paste your build list from our customizer here, or describe your requirements..."
                      rows={4}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="comments">Additional Questions or Comments</Label>
                    <Textarea
                      id="comments"
                      name="comments"
                      placeholder="Any specific requirements, questions, or additional information..."
                      rows={3}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Zap className="h-4 w-4 mr-2" />
                    Request My Quote
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Why Choose Our Build Service */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-12 text-foreground">Why Choose Our Build Service?</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <Shield className="h-12 w-12 text-accent mx-auto mb-4" />
                  <CardTitle>Warranty & Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Full warranty on all components plus our build guarantee. We stand behind our work.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Clock className="h-12 w-12 text-accent mx-auto mb-4" />
                  <CardTitle>Fast Turnaround</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Most builds completed and shipped within 5-7 business days of order confirmation.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Wrench className="h-12 w-12 text-accent mx-auto mb-4" />
                  <CardTitle>Expert Assembly</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Built by certified technicians with years of experience in PC assembly and optimization.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}