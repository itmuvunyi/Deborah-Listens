import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Shield } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src="/peaceful-nature-scene-with-soft-morning-light--cal.jpg" alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Shield className="h-4 w-4" />
            <span>Confidential & Professional Counselling</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance leading-tight">
            A Safe Space for Women, Youth & Girls to <span className="text-primary">Heal and Grow</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Professional lay counselling services providing compassionate support, guidance, and empowerment for your
            mental wellness journey.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="group">
              <a href="#contact">
                Book a Session
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#services">Learn About Services</a>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 max-w-3xl mx-auto">
            <div className="flex flex-col items-center gap-2 p-4">
              <Heart className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Compassionate Care</h3>
              <p className="text-sm text-muted-foreground text-center">Non-judgmental support in a safe environment</p>
            </div>
            <div className="flex flex-col items-center gap-2 p-4">
              <Shield className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Confidential</h3>
              <p className="text-sm text-muted-foreground text-center">Your privacy and trust are our priority</p>
            </div>
            <div className="flex flex-col items-center gap-2 p-4">
              <div className="h-8 w-8 text-primary flex items-center justify-center text-2xl">✨</div>
              <h3 className="font-semibold">Guidance</h3>
              <p className="text-sm text-muted-foreground text-center">Building strength and resilience together</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
