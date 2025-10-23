"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lock, Mail, Shield } from "lucide-react"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [token, setToken] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const submitEmailPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (res.ok && data.ok) {
        router.push("/admin/bookings")
      } else {
        setError(data.error || "Login failed")
      }
    } catch (err) {
      setError(String(err))
    }
    setLoading(false)
  }

  const submitToken = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })
      const data = await res.json()
      if (res.ok && data.ok) {
        router.push("/admin/bookings")
      } else {
        setError(data.error || "Login failed")
      }
    } catch (err) {
      setError(String(err))
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Deborah Listens</h1>
          <p className="text-muted-foreground">Admin Dashboard</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>Sign in to access the admin dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">Email & Password</TabsTrigger>
                <TabsTrigger value="token">Token</TabsTrigger>
              </TabsList>

              <TabsContent value="email">
                <form onSubmit={submitEmailPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      <Mail className="h-4 w-4 inline mr-2" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@example.com"
                      className="w-full"
                      autoComplete="email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">
                      <Lock className="h-4 w-4 inline mr-2" />
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full"
                      autoComplete="current-password"
                    />
                  </div>

                  {error && <div className="bg-destructive/10 text-destructive p-3 rounded-lg text-sm">{error}</div>}

                  <Button type="submit" disabled={loading || !email || !password} className="w-full" size="lg">
                    {loading ? "Signing in…" : "Sign in"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="token">
                <form onSubmit={submitToken} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="token">
                      <Lock className="h-4 w-4 inline mr-2" />
                      Admin Token
                    </Label>
                    <Input
                      id="token"
                      type="password"
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      placeholder="Enter your admin token"
                      className="w-full"
                      autoComplete="off"
                    />
                  </div>

                  {error && <div className="bg-destructive/10 text-destructive p-3 rounded-lg text-sm">{error}</div>}

                  <Button type="submit" disabled={loading || !token} className="w-full" size="lg">
                    {loading ? "Signing in…" : "Sign in"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 pt-6 border-t">
              <p className="text-xs text-muted-foreground text-center">
                This area is restricted to authorized administrators only.
                <br />
                Contact the system administrator if you need access.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
