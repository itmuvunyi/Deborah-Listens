/**
 * Script to create an admin user in the database
 * Run with: npx tsx scripts/create-admin-user.ts
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

async function createAdmin() {
  try {
    console.log("\n=== Create Admin User ===\n")

    const email = await question("Enter admin email: ")
    const password = await question("Enter admin password: ")
    const name = await question("Enter admin name (optional): ")

    if (!email || !password) {
      console.error("Email and password are required!")
      process.exit(1)
    }

    // Normalize email (trim and lowercase for consistency)
    const normalizedEmail = email.trim().toLowerCase()

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create admin user
    const admin = await prisma.admin.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword,
        name: name || undefined,
      },
    })

    console.log("\n✓ Admin user created successfully!")
    console.log(`ID: ${admin.id}`)
    console.log(`Email: ${admin.email}`)
    console.log(`Name: ${admin.name || "N/A"}\n`)
  } catch (error: any) {
    if (error.code === "P2002") {
      console.error("\n✗ Error: An admin with this email already exists!\n")
    } else {
      console.error("\n✗ Error creating admin:", error.message, "\n")
    }
  } finally {
    await prisma.$disconnect()
    rl.close()
  }
}

createAdmin()
