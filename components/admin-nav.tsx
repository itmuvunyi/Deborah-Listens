"use client"

import { Button } from "@/components/ui/button"
import { LogOut, Home } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function AdminNav() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" })
      router.push("/admin/login")
    } catch (err) {
      console.error("Logout error:", err)
    }
  }

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
              <Home className="h-5 w-5" />
              <span>Deborah Listens</span>
            </Link>
            <span className="text-sm text-muted-foreground">Admin Dashboard</span>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  )
}
