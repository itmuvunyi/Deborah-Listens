/**
 * Script to generate a secure admin token
 * Run with: npx tsx scripts/generate-admin-token.ts
 */

import * as crypto from "crypto"

function generateSecureToken(length = 32): string {
  return crypto.randomBytes(length).toString("hex")
}

console.log("\n=== Admin Token Generator ===\n")
console.log("Generated secure admin token:")
console.log("\n" + generateSecureToken() + "\n")
console.log("Add this to your .env file as:")
console.log("ADMIN_TOKEN=<your-generated-token>\n")
