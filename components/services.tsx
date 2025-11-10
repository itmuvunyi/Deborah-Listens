"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Ear, Lightbulb, Users, Users2, Sparkles, Shield, TrendingUp, UsersCog, CheckCircle } from "lucide-react"

const services = [
	{
		icon: Heart,
		title: "Emotional Support",
		description: "Creating a safe, non-judgmental space for you to express your feelings and experiences.",
		details: "Individual sessions, all ages welcome",
	},
	{
		icon: Ear,
		title: "Active Listening",
		description: "Ensuring you feel heard and validated, which aids in emotional discharge and understanding.",
		details: "Compassionate, focused attention",
	},
	{
		icon: Lightbulb,
		title: "Practical Guidance",
		description:
			"Offering practical advice and strategies to help you cope with personal issues and enhance well-being.",
		details: "Tailored coping strategies and tools",
	},
	{
		icon: Users,
		title: "Resource Connection",
		description: "Assisting in connecting you to professional resources for comprehensive, tailored support.",
		details: "Network of support services",
	},
	{
		icon: Users2,
		title: "Individual Counselling for Women",
		description: "One-on-one support for anxiety, depression, relationships, life transitions, and personal growth.",
		details: "60-minute sessions | In-person or online",
	},
	{
		icon: Sparkles,
		title: "Youth Mentorship & Counselling",
		description:
			"Supportive guidance for young people navigating identity, peer pressure, family dynamics, and future planning.",
		details: "45-60 minute sessions | Ages 13-24",
	},
	{
		icon: TrendingUp,
		title: "Girls' Empowerment Sessions",
		description: "Building confidence, self-worth, and resilience in girls through individual or small group sessions.",
		details: "45-minute sessions | Ages 10-18",
	},
	{
		icon: Shield,
		title: "Trauma & Crisis Support",
		description: "Compassionate, trauma-informed care for those experiencing or recovering from difficult life events.",
		details: "60-90 minute sessions | Flexible scheduling",
	},
	{
		icon: Heart,
		title: "Relationship Counselling",
		description:
			"Support for navigating family relationships, friendships, romantic relationships, and interpersonal conflicts.",
		details: "60-minute sessions | In-person or online",
	},
	{
		icon: Lightbulb,
		title: "Self-Esteem & Personal Growth",
		description: "Building confidence, discovering your strengths, and creating positive life changes.",
		details: "60-minute sessions | In-person or online",
	},
	{
		icon: UsersCog,
		title: "Team Building & Collaboration",
		description:
			"Designed for organizations seeking stronger teams. These sessions enhance communication, trust, and collaboration to boost productivity and morale.",
		details: "60-minute sessions | In-person or online | Suitable for teams & organizations",
	},

]

export function Services() {
	return (
		<section id="services" className="py-24">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center space-y-4 mb-16">
					<h2 className="text-3xl sm:text-4xl font-bold text-balance">Our Services</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Comprehensive counselling support tailored to the unique needs of **women, youth, and girls**, plus specialized **team development**.
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
					{services.map((service, index) => {
						const Icon = service.icon
						return (
							<Card key={index} className="hover:shadow-lg transition-shadow">
								<CardHeader>
									<div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
										<Icon className="h-6 w-6 text-primary" />
									</div>
									<CardTitle className="text-xl">{service.title}</CardTitle>
									<CardDescription className="text-sm text-muted-foreground">{service.details}</CardDescription>
								</CardHeader>
								<CardContent>
									<p className="text-sm text-muted-foreground mb-4">{service.description}</p>
									<Button variant="outline" size="sm" asChild className="w-full bg-transparent">
										<a href="#contact">Book This Service</a>
									</Button>
								</CardContent>
							</Card>
						)
					})}
				</div>

				<div className="mt-12 max-w-4xl mx-auto">
					<Card className="p-6 bg-accent/10 border-accent">
						<h3 className="text-xl font-semibold mb-4">✨ Key Benefits of Our Counselling</h3>
						<div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold mb-3 flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> For Individuals & Families</h4>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>**Emotional Processing:** Articulate your feelings to understand their causes and reduce isolation.</li>
                                    <li>**Coping Strategies:** Gain tools to manage stress and anxiety with greater confidence.</li>
                                    <li>**Personal Growth:** Identify your strengths, unlock potential, and foster resilience.</li>
                                    <li>**Resource Connection:** Access professional resources for comprehensive, tailored support.</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-3 flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> For Teams & Organizations</h4>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>**Enhanced Productivity:** Align goals, resolve conflicts, and leverage team members’ strengths.</li>
                                    <li>**Positive Culture:** Cultivate a motivating, inclusive, and resilient workplace through open communication.</li>
                                </ul>
                                <p className="mt-4 text-xs text-muted-foreground italic">
                                    *Benefits specific to Team Building & Collaboration services.
                                </p>
                            </div>
						</div>
					</Card>
				</div>
			</div>
		</section>
	)
}
