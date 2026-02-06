"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Instagram,
  Youtube,
  Linkedin,
  Video,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          serviceType: "",
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-muted/30 to-background"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Get in Touch
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready to start your journey? Reach out to book a confidential
            session or ask any questions.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
         
          <div className="lg:col-span-3">
            <Card className="shadow-lg">
              <CardHeader className="pb-8">
                <CardTitle className="text-2xl">Book a Session</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24
                  hours.
                </CardDescription>
              </CardHeader>

              <CardContent className="pb-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label>Full Name *</Label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label>Email Address *</Label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label>Phone Number</Label>
                      <Input
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+250 XXX XXX XXX"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label>Service Interested In</Label>
                      <Input
                        value={formData.serviceType}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            serviceType: e.target.value,
                          })
                        }
                        placeholder="e.g. Emotional Support"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label>Your Message *</Label>
                    <Textarea
                      required
                      rows={4}
                      className="resize-none"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  {/* Privacy */}
                  <div className="flex gap-2 bg-primary/5 border border-primary/20 p-3 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-primary mt-0.5" />
                    <p className="text-xs text-muted-foreground">
                      Your information is strictly confidential and will only be
                      used to contact you about counselling services.
                    </p>
                  </div>

                  {/* Status */}
                  {status === "success" && (
                    <div className="flex gap-2 bg-green-50 border border-green-200 p-3 rounded-lg text-green-700">
                      <CheckCircle2 className="h-4 w-4 mt-0.5" />
                      <p className="text-xs">
                        Booking received! We’ll get back to you shortly.
                      </p>
                    </div>
                  )}

                  {status === "error" && (
                    <div className="bg-red-50 border border-red-200 p-3 rounded-lg text-red-700 text-xs">
                      Something went wrong. Please try again.
                    </div>
                  )}

                  {/* BUTTON — no extra space below */}
                  <Button
                    type="submit"
                    className="w-full h-10"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT — INFO */}
          <div className="lg:col-span-2 space-y-6">
            {/* Session Fees */}
            <Card className="shadow-lg bg-primary/5">
              <CardHeader>
                <CardTitle>Session Fees</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="border rounded-lg p-3 bg-card flex justify-between">
                  <div>
                    <p className="font-semibold">Personal Session</p>
                    <p className="text-xs text-muted-foreground">
                      One-on-one counselling
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">25,000</p>
                    <p className="text-xs text-muted-foreground">RWF/hr</p>
                  </div>
                </div>

                <div className="border rounded-lg p-3 bg-card flex justify-between">
                  <div>
                    <p className="font-semibold">Team / NGO Session</p>
                    <p className="text-xs text-muted-foreground">
                      Group & team building
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">150,000</p>
                    <p className="text-xs text-muted-foreground">RWF/hr</p>
                  </div>
                </div>

                <Button asChild className="w-full">
                  <a href="tel:+250781309303">
                    <Phone className="h-4 w-4 mr-2" />
                    Call to Book Now
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>
                  <Mail className="inline h-4 w-4 mr-2 text-primary" />
                  deborahlistens12@gmail.com
                </p>
                <p>
                  <Phone className="inline h-4 w-4 mr-2 text-primary" />
                  +250 781 309 303
                </p>
                <p>
                  <MapPin className="inline h-4 w-4 mr-2 text-primary" />
                  Rwanda (In-person & Online)
                </p>
                <p>
                  <Clock className="inline h-4 w-4 mr-2 text-primary" />
                  Mon-Fri 9AM-6PM, Sat 10AM-2PM
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
