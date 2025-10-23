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
        if (prisma) {
          const admin = await prisma.admin.findUnique({
            where: { email },
          })

          if (admin && (await bcrypt.compare(password, admin.password))) {
            isAuthenticated = true
            sessionToken = admin.id
          }
        }
      } catch (error) {
        console.error(" Database authentication error:", error)
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
