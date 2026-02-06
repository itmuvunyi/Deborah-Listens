"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote: `Après mon mariage, j'ai traversé une période très difficile à cause de problèmes 
      de conception. Je me sentais perdue et épuisée de faire semblant que tout allait bien. 
      😔Un jour, j'ai découvert le témoignage de Deborah Manariyo, une femme très courageuse et pleine d'amour. 
      Son histoire m'a fait réaliser que je n'étais pas seule. J'ai vu son émission sur la chaîne Siren Vibes, l'ai 
      contactée, et elle m'a aidée avec un cœur rempli d'amour. ❤
      Grâce à sa bienveillance, j'ai retrouvé la paix, la foi et l'espoir. Elle a été une véritable source de lumière. 
      Je remercie Madame Deborah Manariyo de tout cœur pour son écoute. Que Dieu la bénisse pour le bien qu'elle sème. 🌸`,
    author: "Anonymous Client",
    role: "Emotional Support",
  },
  {
    quote: `Une jeune femme de 26 ans Souffrant du SOPK et sans règles depuis un an,
      j'avais perdu l'espoir de concevoir. Après avoir découvert l'histoire de Déborah sur Siren Vibes TV,
      j'ai finalement pu bénéficier de son accompagnement en juillet 2025. Grâce à ses conseils pratiques sur mon hygiène de vie (alimentation, sport, tisanes),
      mon cycle est revenu immédiatement après un an d'absence. Déborah a restauré mon espoir. C'est une femme forte et une véritable héroïne.`,
    author: "Anonymous Client",
    role: "Practical Guidance",
  },
  {
    quote: `On behalf of My Twin Foundation, we extend our heartfelt appreciation for honoring our invitation and contributing so meaningfully to our Health and Wellbeing Program.

Your insightful guidance and professional support enriched our discussion in a powerful way. Through your words, in our Mbwira Nkumve initiative, you reminded us that healing truly begins within us with commitment, self-awareness, and the courage to take the first step. You emphasized the importance of physical exercise as a valuable tool to ease depression and anxiety, and highlighted the strength that comes from engaging with a supportive community.

Your contribution brought clarity, encouragement, and hope to many. It aligned perfectly with our theme and played a significant role in the success and impact of the entire session.

Thank you for sharing your wisdom, your time, and your heart with us. We deeply appreciate you.`,
    author: "MY TWIN FOUNDATION",
    role: "Team Building",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-background to-muted/30"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-3 sm:space-y-4 mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Client Testimonials
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            33+ Stories of healing, growth, and empowerment from those we've
            supported
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto mb-12">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-muted bg-card/50 backdrop-blur-sm"
            >
              <CardContent className="p-5 sm:p-6">
                {/* Quote Icon and Stars - Combined Row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Quote className="h-5 w-5" />
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400 drop-shadow-sm"
                      />
                    ))}
                  </div>
                </div>

                {/* Quote Text - Fixed height with scroll */}
                <blockquote className="testimonial-scroll text-sm text-muted-foreground leading-relaxed mb-4 max-h-48 overflow-y-auto pr-2">
                  <p>{testimonial.quote}</p>
                </blockquote>

                {/* Author Info */}
                <div className="border-t border-muted pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-semibold text-sm">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-foreground truncate">
                        {testimonial.author}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-muted/50 border-muted">
            <CardContent className="p-6 sm:p-8">
              <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 text-center">
                <div className="space-y-2">
                  <p className="text-3xl sm:text-4xl font-bold text-primary">
                    33+
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Success Stories
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-3xl sm:text-4xl font-bold text-primary">
                    100%
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Client Satisfaction
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-3xl sm:text-4xl font-bold text-primary">
                    8+
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Years of Experience
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Confidentiality Notice */}
        <div className="mt-8 sm:mt-12 text-center max-w-3xl mx-auto">
          <p className="text-xs sm:text-sm text-muted-foreground italic leading-relaxed px-4">
            All testimonials are shared with permission and anonymized to
            protect client confidentiality. Your privacy and trust are our
            highest priorities.
          </p>
        </div>
      </div>
    </section>
  );
}
