"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Clock, MessageCircle, Instagram, Youtube, Linkedin, Video } from "lucide-react"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    serviceType: "",
  })

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      let data
      try {
        data = await res.json()
      } catch (jsonError) {
        console.error("[v0] Failed to parse JSON response:", jsonError)
        setStatus("error")
        return
      }

      if (res.ok && data.ok) {
        setStatus("success")
        setFormData({ name: "", email: "", phone: "", message: "", serviceType: "" })
      } else {
        console.error("[v0] Booking failed:", data.error || "Unknown error")
        setStatus("error")
      }
    } catch (err) {
      console.error("[v0] Network error:", err)
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">Get in Touch</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to start your journey? Reach out to book a confidential session or ask any questions
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Book a Session</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you within 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(123) 456-7890"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="serviceType">Service Interested In</Label>
                      <Input
                        id="serviceType"
                        placeholder="e.g., Emotional Support"
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us a bit about what you're looking for..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>

                  <div className="bg-muted p-4 rounded-lg text-sm text-muted-foreground">
                    <p className="font-semibold mb-1">Privacy Notice</p>
                    <p>
                      Your information is kept strictly confidential and will only be used to contact you about
                      counselling services.
                    </p>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
                    {status === "loading" ? "Sending…" : "Send Message"}
                  </Button>
                  {status === "success" && (
                    <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg">
                      <p className="font-semibold">Booking received!</p>
                      <p className="text-sm mt-1">
                        Thank you for your booking request. You'll receive a confirmation email shortly, and we'll get
                        back to you within 24 hours.
                      </p>
                    </div>
                  )}
                  {status === "error" && (
                    <p className="text-sm text-red-600 mt-2">Something went wrong. Please try again later.</p>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Email</p>
                    <a
                      href="mailto:deborahlistens12@gmail.com"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      deborahlistens12@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Phone</p>
                    <a href="tel:+250781309303" className="text-sm text-muted-foreground hover:text-primary">
                      +250 781 309 303
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Instagram className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Instagram</p>
                    <a
                      href="https://instagram.com/deborahlistens_"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      @deborahlistens_
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Video className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">TikTok</p>
                    <a
                      href="https://www.tiktok.com/@deborahlistens"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      @deborahlistens
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Linkedin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">LinkedIn</p>
                    <a
                      href="https://www.linkedin.com/in/deborahlistens"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      Deborah Listens
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Youtube className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">YouTube</p>
                    <a
                      href="https://www.youtube.com/@deborahlistens"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      Deborah Listens
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageCircle className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">WhatsApp</p>
                    <a href="https://wa.me/250781309303" className="text-sm text-muted-foreground hover:text-primary">
                      +250 781 309 303
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Location</p>
                    <p className="text-sm text-muted-foreground">
                      Rwanda
                      <br />
                      In-person & Online Sessions Available
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Hours</p>
                    <p className="text-sm text-muted-foreground">
                      Mon-Fri: 9:00 AM - 6:00 PM
                      <br />
                      Sat: 10:00 AM - 2:00 PM
                      <br />
                      By Appointment
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-accent/10 border-accent">
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Session Fees</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>1 Hour: 25,000 RWF</p>
                    <p>2 Hours: 50,000 RWF</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 italic">
                    Sessions need to be booked ahead of time. Flexible payment options available.
                  </p>
                </div>
                <div className="pt-2 border-t">
                  <h3 className="font-semibold mb-2">Book Your Session</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Contact us to schedule your confidential counselling session.
                  </p>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <a href="tel:+250781309303">Call to Book</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
