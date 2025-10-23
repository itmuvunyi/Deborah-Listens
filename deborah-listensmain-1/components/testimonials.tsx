import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    quote:
      "Deborah Listens provided me with a safe space to process my emotions without judgment. The support I received helped me find my strength again.",
    author: "Anonymous Client",
    role: "Individual Counselling",
  },
  {
    quote:
      "As a young woman navigating career and relationship challenges, the guidance I received was invaluable. I feel more confident and empowered.",
    author: "Anonymous Client",
    role: "Youth Mentorship",
  },
  {
    quote:
      "My daughter has grown so much in confidence since starting sessions. She now speaks up for herself and has developed healthy coping strategies.",
    author: "Parent of Client",
    role: "Girls Empowerment",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">Client Testimonials</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stories of healing, growth, and empowerment from those we've supported
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="text-sm text-muted-foreground mb-4 leading-relaxed italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="border-t pt-4">
                  <p className="font-semibold text-sm">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground italic">
            All testimonials are shared with permission and anonymized to protect client confidentiality
          </p>
        </div>
      </div>
    </section>
  )
}
