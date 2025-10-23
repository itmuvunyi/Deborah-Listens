import path from "path"
import fs from "fs"
import { prisma } from "./prisma"

const DATA_DIR = path.join(process.cwd(), "data")
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR)

const CONTACTS_FILE = path.join(DATA_DIR, "contacts.json")

if (!fs.existsSync(CONTACTS_FILE)) {
  try {
    fs.writeFileSync(CONTACTS_FILE, "[]")
  } catch (e) {
    console.error("Failed to create contacts.json fallback file:", String(e))
  }
}

export type ContactRow = {
  id?: string | number
  name: string
  email: string
  phone?: string
  serviceType?: string
  message: string
  status?: "pending" | "confirmed" | "cancelled"
  adminNotes?: string
  createdAt: string | Date
  confirmedAt?: string | Date | null
}

export async function insertContact(contact: ContactRow) {
  if (prisma) {
    try {
      const booking = await prisma.booking.create({
        data: {
          name: contact.name,
          email: contact.email,
          phone: contact.phone || "",
          message: contact.message,
          status: contact.status || "pending",
          createdAt: new Date(contact.createdAt),
        },
      })
      console.log("Booking saved to database:", booking.id)
      return booking.id
    } catch (e) {
      console.error("Prisma insert failed, falling back to JSON:", String(e))
    }
  }

  console.log("Using JSON file fallback for booking")
  const raw = fs.readFileSync(CONTACTS_FILE, "utf-8")
  const list: ContactRow[] = JSON.parse(raw || "[]")
  const id = (list.length ? (list[list.length - 1].id as number) || list.length : 0) + 1
  const row = { ...contact, id, status: contact.status || "pending" }
  list.push(row)
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify(list, null, 2))
  return id
}

export async function getAllContacts() {
  if (prisma) {
    try {
      const bookings = await prisma.booking.findMany({
        orderBy: { createdAt: "desc" },
      })
      return bookings.map((b) => ({
        ...b,
        id: b.id,
        createdAt: b.createdAt.toISOString(),
        confirmedAt: b.confirmedAt?.toISOString() || null,
      })) as ContactRow[]
    } catch (e) {
      console.error("Prisma read failed, falling back to JSON:", String(e))
    }
  }

  try {
    const raw = fs.readFileSync(CONTACTS_FILE, "utf-8")
    return JSON.parse(raw || "[]") as ContactRow[]
  } catch (e) {
    console.error("Failed to read contacts.json fallback file:", String(e))
    return []
  }
}

export async function updateContactStatus(
  id: string | number,
  status: "pending" | "confirmed" | "cancelled",
  adminNotes?: string,
) {
  if (prisma) {
    try {
      const confirmedAt = status === "confirmed" ? new Date() : null
      await prisma.booking.update({
        where: { id: String(id) },
        data: {
          status,
          adminNotes: adminNotes || null,
          confirmedAt,
        },
      })
      return true
    } catch (e) {
      console.error("Prisma update failed, falling back to JSON:", String(e))
    }
  }

  try {
    const raw = fs.readFileSync(CONTACTS_FILE, "utf-8")
    const list: ContactRow[] = JSON.parse(raw || "[]")
    const index = list.findIndex((c) => c.id === id)
    if (index !== -1) {
      list[index].status = status
      list[index].adminNotes = adminNotes
      if (status === "confirmed") {
        list[index].confirmedAt = new Date().toISOString()
      }
      fs.writeFileSync(CONTACTS_FILE, JSON.stringify(list, null, 2))
      return true
    }
    return false
  } catch (e) {
    console.error("Failed to update contact in JSON:", String(e))
    return false
  }
}

export async function getContactById(id: string | number) {
  if (prisma) {
    try {
      const booking = await prisma.booking.findUnique({
        where: { id: String(id) },
      })
      if (!booking) return undefined
      return {
        ...booking,
        createdAt: booking.createdAt.toISOString(),
        confirmedAt: booking.confirmedAt?.toISOString() || null,
      } as ContactRow
    } catch (e) {
      console.error("Prisma read failed, falling back to JSON:", String(e))
    }
  }

  try {
    const raw = fs.readFileSync(CONTACTS_FILE, "utf-8")
    const list: ContactRow[] = JSON.parse(raw || "[]")
    return list.find((c) => c.id === id)
  } catch (e) {
    console.error("Failed to read contact from JSON:", String(e))
    return undefined
  }
}
