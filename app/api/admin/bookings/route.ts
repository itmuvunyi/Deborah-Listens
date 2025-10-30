import { NextResponse } from "next/server"
import { getAllContacts } from "@/lib/db"
import { getAuthToken, validateAdminAuth } from "@/lib/auth"

function unauthorized() {
  return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })
}

export async function GET(request: Request) {
  try {
    // Authentication: accept cookie (admin_token), bearer token, or ?token=
    const token = getAuthToken(request)
    const isAuthenticated = await validateAdminAuth(token)
    
    if (!isAuthenticated) {
      return unauthorized()
    }

    const url = new URL(request.url)
    const format = url.searchParams.get("format") || "json"
    const rows = await getAllContacts() // Updated to use async getAllContacts

    if (format === "csv") {
      // Convert to CSV
      const keys = ["id", "name", "email", "phone", "serviceType", "message", "createdAt"]
      const lines = [keys.join(",")]
      for (const r of rows) {
        const vals = keys.map((k) => {
          const v = (r as any)[k]
          if (v == null) return ""
          // Escape double quotes
          return `"${String(v).replace(/"/g, '""')}"`
        })
        lines.push(vals.join(","))
      }
      const csv = lines.join("\n")
      return new NextResponse(csv, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": 'attachment; filename="bookings.csv"',
        },
      })
    }

    return NextResponse.json({ ok: true, rows })
  } catch (err) {
    console.error("Admin bookings error", err)
    return NextResponse.json({ ok: false, error: "Internal error" }, { status: 500 })
  }
}
