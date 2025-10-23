import { Card } from "@/components/ui/card"

export function About() {
  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-balance">About Deborah Listens</h2>
            <p className="text-lg text-muted-foreground">
              Dedicated to supporting women, youth, and girls through life's challenges
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <Card className="p-6 space-y-4 bg-primary/5 border-primary/20">
                <h3 className="text-xl font-semibold">Meet Your Counsellor</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-lg">Deborah MANARIYO</p>
                    <p className="text-sm text-muted-foreground">Certified Lay Counsellor, 8 Years Experience</p>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    As a dedicated lay counselor with eight years of experience, I specialize in providing emotional
                    support and guidance to individuals facing various challenges. My work has encompassed supporting
                    widows and orphans through post-trauma healing, and working with young girls at Dream Center Network
                    to help them overcome past difficulties and unlock their potential.
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    I believe every woman and girl has incredible strength within them—sometimes they just need a safe
                    space to discover it.
                  </p>
                </div>
              </Card>

              <Card className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Deborah Listens provides professional lay counselling services exclusively for women, youth, and
                  girls. We believe in creating a safe, confidential space where you can explore your feelings, overcome
                  challenges, and discover your inner strength.
                </p>
              </Card>

              <Card className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">Our Approach</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We practice empathy-centered counselling through active listening, emotional support, and practical
                  guidance. Every session is tailored to your unique needs, helping you process emotions, develop coping
                  strategies, and build resilience for personal growth.
                </p>
              </Card>
            </div>

            <div className="space-y-6">
              <img
                src="/compassionate-female-counsellor-in-peaceful-office.jpg"
                alt="Deborah - Deborah Listens Counsellor"
                className="w-full h-auto rounded-lg shadow-lg"
              />

              <Card className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">Experience & Focus Areas</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>Certified Lay Counsellor with 8 Years Experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>Post-Trauma Healing & Support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>Youth & Girls Empowerment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>Emotional Support & Active Listening</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>Practical Guidance & Coping Strategies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>Resource Connection & Support Networks</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 bg-primary text-primary-foreground">
                <h3 className="text-xl font-semibold mb-3">Why Choose Deborah Listens?</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1">✓</span>
                    <span>Specialized focus on women, youth, and girls</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">✓</span>
                    <span>8 years of dedicated counselling experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">✓</span>
                    <span>Flexible session formats (in-person, online, hybrid)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">✓</span>
                    <span>Commitment to ethical practice and confidentiality</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">✓</span>
                    <span>Affordable rates with flexible payment options</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
