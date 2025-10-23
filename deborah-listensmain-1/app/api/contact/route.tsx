import { NextResponse } from "next/server"
import { insertContact } from "@/lib/db"
import { sendEmail, generateBookingConfirmationEmail } from "@/lib/email"

type Contact = {
  name: string
  email: string
  phone?: string
  serviceType?: string
  message: string
  createdAt: string
}

export async function POST(request: Request) {
  try {
    console.log(" Contact form submission received")
    const body = await request.json()
    console.log(" Request body:", body)

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      console.log(" Missing required fields")
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 })
    }

    const contact: Contact = {
      name: body.name,
      email: body.email,
      phone: body.phone || "",
      serviceType: body.serviceType || "",
      message: body.message,
      createdAt: new Date().toISOString(),
    }

    console.log(" Inserting contact into database")
    const id = await insertContact(contact)
    console.log(" Contact saved with ID:", id)

    if (contact.email) {
      console.log(" Sending confirmation email to user")
      sendEmail({
        to: contact.email,
        subject: "Booking Received - Deborah Listens",
        html: generateBookingConfirmationEmail(contact.name, contact.serviceType),
      }).catch((err) => console.error("[v0] Failed to send user confirmation email:", err))
    }

    const adminEmail = process.env.ADMIN_EMAIL
    if (adminEmail) {
      console.log(" Sending notification email to admin")
      sendEmail({
        to: adminEmail,
        subject: `New Booking Request from ${contact.name}`,
        html: `
          <h2>New Booking Request</h2>
          <p><strong>Name:</strong> ${contact.name}</p>
          <p><strong>Email:</strong> ${contact.email}</p>
          <p><strong>Phone:</strong> ${contact.phone || "Not provided"}</p>
          <p><strong>Service:</strong> ${contact.serviceType || "Not specified"}</p>
          <p><strong>Message:</strong> ${contact.message}</p>
          <p><strong>Booking ID:</strong> ${id}</p>
        `,
      }).catch((err) => console.error("[v0] Failed to send admin notification email:", err))
    }

    console.log(" Returning success response")
    return NextResponse.json({ ok: true, id })
  } catch (err) {
    console.error(" API /api/contact error:", err)
    return NextResponse.json({ ok: false, error: "Failed to save booking. Please try again." }, { status: 500 })
  }
}
