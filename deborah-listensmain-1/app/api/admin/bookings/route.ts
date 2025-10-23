import { NextResponse } from "next/server"
import { getAllContacts } from "@/lib/db"

function unauthorized() {
  return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })
}

export async function GET(request: Request) {
  try {
    // Authentication: accept cookie (admin_token), bearer token, or ?token=
    const url = new URL(request.url)
    const tokenFromQuery = url.searchParams.get("token")
    const authHeader = request.headers.get("authorization")
    const bearer = authHeader?.startsWith("Bearer ") ? authHeader?.slice(7) : null
    const cookieHeader = request.headers.get("cookie") || ""
    const cookieMatch = cookieHeader.match(/(?:^|; )admin_token=([^;]+)/)
    const cookieToken = cookieMatch ? decodeURIComponent(cookieMatch[1]) : null
    const token = bearer || tokenFromQuery || cookieToken
    const ADMIN_TOKEN = process.env.ADMIN_TOKEN
    if (!ADMIN_TOKEN || !token || token !== ADMIN_TOKEN) return unauthorized()

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
