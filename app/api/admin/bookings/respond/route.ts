import { NextResponse } from "next/server"
import { getContactById } from "@/lib/db"
import { sendAdminResponseEmail } from "@/lib/email"
import { getAuthToken, validateAdminAuth } from "@/lib/auth"

function unauthorized() {
  return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })
}

export async function POST(request: Request) {
  try {
    // Authentication
    const token = getAuthToken(request)
    const isAuthenticated = await validateAdminAuth(token)
    
    if (!isAuthenticated) {
      return unauthorized()
    }

    const body = await request.json()
    const { id, subject, message } = body

    if (!id || !subject || !message) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 })
    }

    // Get contact details
    const contact = await getContactById(id)
    if (!contact) {
      return NextResponse.json({ ok: false, error: "Booking not found" }, { status: 404 })
    }

    if (!contact.email) {
      return NextResponse.json({ ok: false, error: "No email address for this booking" }, { status: 400 })
    }

    // Send email
    try {
      await sendAdminResponseEmail({
        to: contact.email,
        name: contact.name,
        message: message,
        subject,
      })
    } catch (emailError) {
      console.error("Failed to send response email:", emailError)
      return NextResponse.json({ ok: false, error: "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Send response error", err)
    return NextResponse.json({ ok: false, error: "Internal error" }, { status: 500 })
  }
}
