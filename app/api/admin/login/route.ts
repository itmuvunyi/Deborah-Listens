import { NextResponse } from "next/server"
import { getPrismaClient } from "@/lib/prisma"
import * as bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { email, password, token } = body

    let isAuthenticated = false
    let sessionToken = ""

    if (email && password) {
      try {
        const prisma = getPrismaClient()
        if (!prisma) {
          console.error(" Prisma client is not available - DATABASE_URL may be missing or Prisma not initialized")
          return NextResponse.json({ ok: false, error: "Database not configured" }, { status: 500 })
        }

        const normalizedEmail = email.trim().toLowerCase()
        console.log(" Attempting to find admin with email:", normalizedEmail)
        
        // Try normalized email first (if admin was created with normalized email)
        let admin = await prisma.admin.findUnique({
          where: { email: normalizedEmail },
        })
        
        // If not found, try original email (in case admin was created before normalization)
        if (!admin) {
          console.log(" Not found with normalized email, trying original:", email.trim())
          admin = await prisma.admin.findUnique({
            where: { email: email.trim() },
          })
        }

        if (!admin) {
          console.log(" Admin not found for email:", email)
          return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 })
        }

        console.log(" Admin found, comparing password...")
        const passwordMatch = await bcrypt.compare(password, admin.password)
        if (passwordMatch) {
          isAuthenticated = true
          sessionToken = admin.id
          console.log(" Password match successful, authentication granted")
        } else {
          console.log(" Password mismatch")
          return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 })
        }
      } catch (error) {
        console.error(" Database authentication error:", error)
        return NextResponse.json({ ok: false, error: "Internal authentication error" }, { status: 500 })
      }
    }

    if (!isAuthenticated && token) {
      const ADMIN_TOKEN = process.env.ADMIN_TOKEN
      if (ADMIN_TOKEN && token === ADMIN_TOKEN) {
        isAuthenticated = true
        sessionToken = token
      }
    }

    if (!isAuthenticated) {
      return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 })
    }

    const res = NextResponse.json({ ok: true })
    res.cookies.set("admin_token", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })
    return res
  } catch (err) {
    console.error(" Login error:", err)
    return NextResponse.json({ ok: false, error: "Internal error" }, { status: 500 })
  }
}
