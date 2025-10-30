import { NextResponse } from 'next/server'

export async function POST() {
  const res = NextResponse.json({ ok: true })
  
  // Clear the admin_token cookie by setting it to empty with expiration in the past
  res.cookies.set('admin_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
    expires: new Date(0), // Expire immediately
  })
  
  // Also delete the cookie explicitly
  res.cookies.delete('admin_token')
  
  return res
}
