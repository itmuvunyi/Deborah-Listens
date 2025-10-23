"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2, XCircle, Clock, Mail, Phone, Calendar, MessageSquare, Download, Send, User } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AdminNav } from "@/components/admin-nav"

type Booking = {
  id: number
  name: string
  email: string
  phone?: string
  serviceType?: string
  message: string
  status: "pending" | "confirmed" | "cancelled"
  adminNotes?: string
  createdAt: string
  confirmedAt?: string
}

export default function AdminBookingsPage() {
  const [rows, setRows] = useState<Booking[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [confirmNotes, setConfirmNotes] = useState("")
  const [responseSubject, setResponseSubject] = useState("")
  const [responseMessage, setResponseMessage] = useState("")
  const [actionLoading, setActionLoading] = useState(false)

  const fetchRows = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/bookings")
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error || "Unauthorized")
        setRows(null)
      } else {
        const data = await res.json()
        setRows(data.rows || [])
      }
    } catch (err) {
      setError(String(err))
      setRows(null)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchRows()
  }, [])

  const downloadCSV = async () => {
    const url = "/api/admin/bookings?format=csv"
    window.location.href = url
  }

  const handleConfirmBooking = async (id: number, status: "confirmed" | "cancelled") => {
    setActionLoading(true)
    try {
      const res = await fetch("/api/admin/bookings/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status, adminNotes: confirmNotes }),
      })

      if (res.ok) {
        await fetchRows()
        setSelectedBooking(null)
        setConfirmNotes("")
      } else {
        const data = await res.json()
        alert(data.error || "Failed to update booking")
      }
    } catch (err) {
      alert("Error updating booking: " + String(err))
    }
    setActionLoading(false)
  }

  const handleSendResponse = async (id: number) => {
    if (!responseSubject || !responseMessage) {
      alert("Please fill in both subject and message")
      return
    }

    setActionLoading(true)
    try {
      const res = await fetch("/api/admin/bookings/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, subject: responseSubject, message: responseMessage }),
      })

      if (res.ok) {
        alert("Response sent successfully!")
        setResponseSubject("")
        setResponseMessage("")
        setSelectedBooking(null)
      } else {
        const data = await res.json()
        alert(data.error || "Failed to send response")
      }
    } catch (err) {
      alert("Error sending response: " + String(err))
    }
    setActionLoading(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-green-500">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Confirmed
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Cancelled
          </Badge>
        )
      default:
        return (
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const stats = rows
    ? {
        total: rows.length,
        pending: rows.filter((r) => r.status === "pending").length,
        confirmed: rows.filter((r) => r.status === "confirmed").length,
        cancelled: rows.filter((r) => r.status === "cancelled").length,
      }
    : null

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />

      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage bookings and communicate with clients</p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Bookings</p>
                    <p className="text-2xl font-bold">{stats.total}</p>
                  </div>
                  <User className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Confirmed</p>
                    <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Cancelled</p>
                    <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
                  </div>
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Bookings</CardTitle>
                <CardDescription>View and manage client booking requests</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button onClick={fetchRows} disabled={loading} variant="outline">
                  {loading ? "Loading…" : "Refresh"}
                </Button>
                <Button onClick={downloadCSV} disabled={!rows || rows.length === 0} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {error && <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-4">{error}</div>}

            {rows && rows.length > 0 && (
              <div className="space-y-4">
                {rows.map((booking) => (
                  <Card key={booking.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">{booking.name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                {getStatusBadge(booking.status)}
                                <span className="text-xs text-muted-foreground">ID: {booking.id}</span>
                              </div>
                            </div>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <a href={`mailto:${booking.email}`} className="text-primary hover:underline">
                                {booking.email}
                              </a>
                            </div>
                            {booking.phone && (
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <a href={`tel:${booking.phone}`} className="text-primary hover:underline">
                                  {booking.phone}
                                </a>
                              </div>
                            )}
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">{formatDate(booking.createdAt)}</span>
                            </div>
                            {booking.serviceType && (
                              <div className="flex items-center gap-2">
                                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">{booking.serviceType}</span>
                              </div>
                            )}
                          </div>

                          <div className="bg-muted p-3 rounded-lg">
                            <p className="text-sm font-medium mb-1">Message:</p>
                            <p className="text-sm text-muted-foreground">{booking.message}</p>
                          </div>

                          {booking.adminNotes && (
                            <div className="bg-accent/10 p-3 rounded-lg border border-accent">
                              <p className="text-sm font-medium mb-1">Admin Notes:</p>
                              <p className="text-sm text-muted-foreground">{booking.adminNotes}</p>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col gap-2 lg:min-w-[200px]">
                          {booking.status === "pending" && (
                            <>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button className="w-full" onClick={() => setSelectedBooking(booking)}>
                                    <CheckCircle2 className="h-4 w-4 mr-2" />
                                    Confirm Booking
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Confirm Booking</DialogTitle>
                                    <DialogDescription>Send a confirmation email to {booking.name}</DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="notes">Message to Client (Optional)</Label>
                                      <Textarea
                                        id="notes"
                                        placeholder="Add session details, payment instructions, or any other information..."
                                        value={confirmNotes}
                                        onChange={(e) => setConfirmNotes(e.target.value)}
                                        rows={4}
                                      />
                                    </div>
                                    <div className="flex gap-2">
                                      <Button
                                        onClick={() => handleConfirmBooking(booking.id, "confirmed")}
                                        disabled={actionLoading}
                                        className="flex-1"
                                      >
                                        {actionLoading ? "Confirming..." : "Confirm & Send Email"}
                                      </Button>
                                      <Button
                                        onClick={() => handleConfirmBooking(booking.id, "cancelled")}
                                        disabled={actionLoading}
                                        variant="destructive"
                                      >
                                        Cancel Booking
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </>
                          )}

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full bg-transparent"
                                onClick={() => setSelectedBooking(booking)}
                              >
                                <Send className="h-4 w-4 mr-2" />
                                Send Message
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Send Message to {booking.name}</DialogTitle>
                                <DialogDescription>Send a custom email response to this client</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="subject">Subject</Label>
                                  <Input
                                    id="subject"
                                    placeholder="Email subject..."
                                    value={responseSubject}
                                    onChange={(e) => setResponseSubject(e.target.value)}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="message">Message</Label>
                                  <Textarea
                                    id="message"
                                    placeholder="Your message to the client..."
                                    value={responseMessage}
                                    onChange={(e) => setResponseMessage(e.target.value)}
                                    rows={6}
                                  />
                                </div>
                                <Button
                                  onClick={() => handleSendResponse(booking.id)}
                                  disabled={actionLoading || !responseSubject || !responseMessage}
                                  className="w-full"
                                >
                                  {actionLoading ? "Sending..." : "Send Email"}
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {rows && rows.length === 0 && (
              <div className="text-center py-12">
                <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No bookings found.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
