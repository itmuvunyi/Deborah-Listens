import { NextResponse } from "next/server"
import { updateContactStatus, getContactById } from "@/lib/db"
import { sendAdminConfirmationEmail } from "@/lib/email"

function unauthorized() {
  return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })
}

export async function POST(request: Request) {
  try {
    // Authentication
    const authHeader = request.headers.get("authorization")
    const bearer = authHeader?.startsWith("Bearer ") ? authHeader?.slice(7) : null
    const cookieHeader = request.headers.get("cookie") || ""
    const cookieMatch = cookieHeader.match(/(?:^|; )admin_token=([^;]+)/)
    const cookieToken = cookieMatch ? decodeURIComponent(cookieMatch[1]) : null
    const token = bearer || cookieToken
    const ADMIN_TOKEN = process.env.ADMIN_TOKEN

    if (!ADMIN_TOKEN || !token || token !== ADMIN_TOKEN) return unauthorized()

    const body = await request.json()
    const { id, status, adminNotes } = body

    if (!id || !status) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 })
    }

    // Get contact details before updating
    const contact = await getContactById(id)
    if (!contact) {
      return NextResponse.json({ ok: false, error: "Booking not found" }, { status: 404 })
    }

    // Update status
    const updated = await updateContactStatus(id, status, adminNotes)

    if (!updated) {
      return NextResponse.json({ ok: false, error: "Failed to update booking" }, { status: 500 })
    }

    // Send confirmation email if status is confirmed
    if (status === "confirmed" && contact.email) {
      try {
        await sendAdminConfirmationEmail({
          to: contact.email,
          name: contact.name,
          bookingId: String(id),
        })
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError)
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Confirm booking error", err)
    return NextResponse.json({ ok: false, error: "Internal error" }, { status: 500 })
  }
}
