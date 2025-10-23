import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Download, Phone, Heart } from "lucide-react"

const resources = [
  {
    icon: BookOpen,
    title: "Self-Care Guides",
    description: "Practical tips for daily mental wellness and emotional self-care",
  },
  {
    icon: Download,
    title: "Journaling Prompts",
    description: "Downloadable worksheets to support your personal growth journey",
  },
  {
    icon: Heart,
    title: "Coping Strategies",
    description: "Techniques for managing stress, anxiety, and difficult emotions",
  },
  {
    icon: Phone,
    title: "Crisis Hotlines",
    description: "24/7 support numbers for immediate mental health assistance",
  },
]

export function Resources() {
  return (
    <section id="resources" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">Mental Wellness Resources</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Helpful tools and information to support your journey between sessions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          {resources.map((resource, index) => {
            const Icon = resource.icon
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">{resource.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card className="max-w-3xl mx-auto p-8 bg-primary text-primary-foreground">
          <h3 className="text-2xl font-bold mb-4 text-center">Emergency Support Numbers</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold mb-1">National Crisis Line</p>
              <p>114 (24/7)</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Crisis Text Line</p>
              <p>info@rbc.gov.rw</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Women's Support Line</p>
              <p>0782299718</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Youth Helpline</p>
              <p>116</p>
            </div>
          </div>
          <p className="text-xs mt-6 text-center opacity-90">
            If you're in immediate danger, please call emergency services (911)
          </p>
        </Card>
      </div>
    </section>
  )
}
