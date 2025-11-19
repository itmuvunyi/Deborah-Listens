import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    quote:
      `Après mon mariage, j'ai traversé une période très difficile à cause de problèmes 
      de conception. Je me sentais perdue et épuisée de faire semblant que tout allait bien. 
      😔Un jour, j'ai découvert le témoignage de Deborah Manariyo, une femme très courageuse et pleine d'amour. 
      Son histoire m'a fait réaliser que je n'étais pas seule. J'ai vu son émission sur la chaîne Siren Vibes, l'ai 
      contactée, et elle m'a aidée avec un cœur rempli d'amour. ❤
      Grâce à sa bienveillance, j'ai retrouvé la paix, la foi et l'espoir. Elle a été une véritable source de lumière. 
      Je remercie Madame Deborah Manariyo de tout cœur pour son écoute. Que Dieu la bénisse pour le bien qu'elle sème. 🌸`,
    author: "Anonymous Client",
    role: "Individual Counselling",
  },
  {
    quote:
      `Une jeune femme de 26 ans Souffrant du SOPK et sans règles depuis un an,
      j'avais perdu l'espoir de concevoir. Après avoir découvert l'histoire de Déborah sur Siren Vibes TV,
      j'ai finalement pu bénéficier de son accompagnement en juillet 2025. Grâce à ses conseils pratiques sur mon hygiène de vie (alimentation, sport, tisanes),
      mon cycle est revenu immédiatement après un an d'absence. Déborah a restauré mon espoir. C'est une femme forte et une véritable héroïne.`,
    author: "Anonymous Client",  
    role: "Youth Mentorship",
  },
  {
    quote:
      `My daughter has grown so much in confidence since starting sessions. She now speaks up for herself and has developed healthy coping strategies.`,
    author: "MY TWIN FOUNDATION",
    role: "Team Building",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">Client Testimonials</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
           33+ Stories of healing, growth, and empowerment from those we've supported
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
