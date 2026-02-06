import { Card } from "@/components/ui/card";

export function About() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* HERO INTRO */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            About Deborah Listens
          </h2>
          <p className="text-lg text-muted-foreground">
            A safe, confidential space for healing, growth, and personal
            transformation — for women, youth, men, and teams.
          </p>
        </div>

        {/* PROFILE SECTION */}
        <div className="grid lg:grid-cols-5 gap-8 items-start mb-20">
          {/* IMAGE */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden shadow-lg rounded-lg h-[360px]">
              <img
                src="/compassionate-female-counsellor-in-peaceful-office.jpg"
                alt="Deborah Manariyo - Lay Counsellor"
                className="w-full h-full object-contain"
              />
            </Card>
          </div>

          {/* PROFILE CONTENT */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h3 className="text-3xl font-semibold">Deborah MANARIYO</h3>
              <p className="text-muted-foreground mt-1">
                Lay Counsellor • 8 Years Experience
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Deborah is a dedicated lay counsellor with over eight years of
              experience supporting individuals and groups through emotional
              challenges, trauma recovery, and team development. Her work
              includes post-trauma healing for widows and orphans, as well as
              empowering young girls through Dream Center Network.
            </p>

            <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
              “Every woman and girl carries incredible strength within them —
              sometimes they just need a safe space to uncover it.”
            </blockquote>

            {/* EXPERIENCE TAGS */}
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                "Post-Trauma Healing",
                "Youth & Girls Empowerment",
                "Team Building",
                "Emotional Support",
                "Active Listening",
              ].map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* MISSION & APPROACH */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <Card className="p-8 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold mb-3">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              Deborah Listens exists to provide inclusive, professional lay
              counselling services in a safe and confidential environment. We
              support women, youth, men, girls, and teams to navigate life’s
              challenges, build resilience, and rediscover inner strength.
            </p>
          </Card>

          <Card className="p-8 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold mb-3">Our Approach</h3>
            <p className="text-muted-foreground leading-relaxed">
              Our approach is empathy-centered and client-focused. Through
              active listening, emotional support, and practical guidance, each
              session is tailored to individual needs, fostering healing,
              personal growth, and positive transformation.
            </p>
          </Card>
        </div>

        {/* WHY CHOOSE US (TRUST BAND) */}
        <Card className="p-10 bg-primary text-primary-foreground mb-20">
          <h3 className="text-3xl font-semibold mb-8 text-center">
            Why Choose Deborah Listens
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
            {[
              "8 years of dedicated counselling experience",
              "Special focus on women, youth, men, girls & teams",
              "Confidential, ethical counselling practices",
              "Flexible formats: in-person, online & hybrid",
              "Affordable sessions with flexible payments",
              "Safe, inclusive, and judgment-free space",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="text-lg">✓</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* STATS / VALUES */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Years Experience", value: "8+" },
            { label: "Confidential", value: "100%" },
            { label: "Session Formats", value: "3" },
            { label: "People Welcome", value: "All" },
          ].map((stat) => (
            <Card
              key={stat.label}
              className="p-6 text-center hover:shadow-lg transition-shadow"
            >
              <p className="text-4xl font-bold text-primary mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
