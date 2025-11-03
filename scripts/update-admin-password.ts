/**
 * Script to update admin password
 * Run with: npx tsx scripts/update-admin-password.ts
 */

import { PrismaClient } from "../lib/generated/prisma"
import * as bcrypt from "bcryptjs"
import * as readline from "readline"

const prisma = new PrismaClient()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve)
  })
}

async function updateAdminPassword() {
  try {
    console.log("\n=== Update Admin Password ===\n")

    const email = await question("Enter admin email: ")
    const newPassword = await question("Enter new password: ")

    if (!email || !newPassword) {
      console.error("Email and password are required!")
      process.exit(1)
    }

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase()

    // Check if admin exists
    const admin = await prisma.admin.findUnique({
      where: { email: normalizedEmail },
    })

    if (!admin) {
      console.error(`\n✗ Error: Admin with email ${normalizedEmail} not found!\n`)
      console.log("Use 'npx tsx scripts/create-admin-user.ts' to create a new admin.\n")
      process.exit(1)
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Update admin password
    const updated = await prisma.admin.update({
      where: { email: normalizedEmail },
      data: {
        password: hashedPassword,
      },
    })

    console.log("\n✓ Admin password updated successfully!")
    console.log(`Email: ${updated.email}`)
    console.log(`Name: ${updated.name || "N/A"}\n`)
  } catch (error: any) {
    console.error("\n✗ Error updating admin password:", error.message, "\n")
    process.exit(1)
  } finally {
    await prisma.$disconnect()
    rl.close()
  }
}

updateAdminPassword()

