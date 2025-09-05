import { Monitor, Github, Twitter, Diamond as Discord, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Monitor className="h-8 w-8 text-primary" />
                <div className="absolute inset-0 h-8 w-8 text-primary animate-pulse opacity-20" />
              </div>
              <span className="text-xl font-bold text-foreground">PC Builder Pro</span>
            </div>
            <p className="text-muted-foreground text-sm">
              The ultimate destination for custom PC builds. Create, customize, and optimize your dream gaming setup
              with expert guidance.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="hover:text-accent">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:text-accent">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:text-accent">
                <Discord className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:text-accent">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Build Tools */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Build Tools</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#builds" className="hover:text-accent transition-colors">
                  Build Tiers
                </a>
              </li>
              <li>
                <a href="#customizer" className="hover:text-accent transition-colors">
                  PC Customizer
                </a>
              </li>
              <li>
                <a href="#games" className="hover:text-accent transition-colors">
                  Game Matching
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Compatibility Checker
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Price Tracker
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#guides" className="hover:text-accent transition-colors">
                  Building Guides
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Component Reviews
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Performance Benchmarks
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Troubleshooting
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Community Forum
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Live Chat
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2024 PC Builder Pro. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Made with ❤️ for gamers</span>
            <span>•</span>
            <span>Powered by v0</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
