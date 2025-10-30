import { getPrismaClient } from "./prisma"

/**
 * Validates admin authentication from cookie or bearer token
 * Supports both ADMIN_TOKEN (env var) and admin ID from database (email/password login)
 */
export async function validateAdminAuth(token: string | null): Promise<boolean> {
  if (!token) return false

  // First check if it's the ADMIN_TOKEN from environment
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN
  if (ADMIN_TOKEN && token === ADMIN_TOKEN) {
    return true
  }

  // Otherwise, check if it's a valid admin ID in the database
  const prisma = getPrismaClient()
  if (prisma) {
    try {
      const admin = await prisma.admin.findUnique({
        where: { id: token },
      })
      return !!admin
    } catch (error) {
      console.error(" Error validating admin ID:", error)
      return false
    }
  }

  return false
}

/**
 * Extracts auth token from request (cookie, bearer, or query param)
 */
export function getAuthToken(request: Request): string | null {
  const url = new URL(request.url)
  const tokenFromQuery = url.searchParams.get("token")
  
  const authHeader = request.headers.get("authorization")
  const bearer = authHeader?.startsWith("Bearer ") ? authHeader?.slice(7) : null
  
  const cookieHeader = request.headers.get("cookie") || ""
  const cookieMatch = cookieHeader.match(/(?:^|; )admin_token=([^;]+)/)
  const cookieToken = cookieMatch ? decodeURIComponent(cookieMatch[1]) : null
  
  return bearer || tokenFromQuery || cookieToken
}

