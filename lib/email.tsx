import emailjs from "@emailjs/nodejs"

// EmailJS configuration from environment variables
const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID || ""
const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY || ""
const EMAILJS_PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY || ""

// Template IDs for different email types
const TEMPLATE_BOOKING_CONFIRMATION = process.env.EMAILJS_TEMPLATE_BOOKING_CONFIRMATION || ""
const TEMPLATE_ADMIN_CONFIRMATION = process.env.EMAILJS_TEMPLATE_ADMIN_CONFIRMATION || ""
const TEMPLATE_ADMIN_RESPONSE = process.env.EMAILJS_TEMPLATE_ADMIN_RESPONSE || ""

function initEmailJS() {
  if (!EMAILJS_SERVICE_ID || !EMAILJS_PUBLIC_KEY || !EMAILJS_PRIVATE_KEY) {
    console.warn("EmailJS not configured. Emails will be logged to console only.")
    return false
  }
  return true
}

export async function sendBookingConfirmationEmail({
  to,
  name,
  bookingId,
}: {
  to: string
  name: string
  bookingId: string
}): Promise<boolean> {
  console.log(" Sending booking confirmation email to:", to)

  if (!initEmailJS()) {
    console.log(" Email would be sent:", { to, name, bookingId, type: "booking_confirmation" })
    return true 
  }

  try{
    const templateParams = {
      to_email: to,
      to_name: name,
      booking_id: bookingId,
      from_name: "Deborah Listens",
    }

    await emailjs.send(EMAILJS_SERVICE_ID, TEMPLATE_BOOKING_CONFIRMATION, templateParams, {
      publicKey: EMAILJS_PUBLIC_KEY,
      privateKey: EMAILJS_PRIVATE_KEY,
    })

    console.log(" Booking confirmation email sent successfully")
    return true
  } catch (error) {
    console.error(" Failed to send booking confirmation email:", error)
    return false
  }
}

export async function sendAdminConfirmationEmail({
  to,
  name,
  bookingId,
  serviceType,
  adminNotes,
}: {
  to: string
  name: string
  bookingId: string
  serviceType?: string
  adminNotes?: string
}): Promise<boolean> {
  console.log(" Sending admin confirmation email to:", to)

  if (!initEmailJS()) {
    console.log(" Email would be sent:", {
      to,
      name,
      bookingId,
      serviceType,
      adminNotes,
      type: "admin_confirmation",
    })
    return true
  }

  try {
    const templateParams = {
      to_email: to,
      to_name: name,
      booking_id: bookingId,
      service_type: serviceType || "Counseling Session",
      admin_notes: adminNotes || "Your booking has been confirmed.",
      from_name: "Deborah Listens",
    }

    await emailjs.send(EMAILJS_SERVICE_ID, TEMPLATE_ADMIN_CONFIRMATION, templateParams, {
      publicKey: EMAILJS_PUBLIC_KEY,
      privateKey: EMAILJS_PRIVATE_KEY,
    })

    console.log(" Admin confirmation email sent successfully")
    return true
  } catch (error) {
    console.error(" Failed to send admin confirmation email:", error)
    return false
  }
}

export async function sendAdminResponseEmail({
  to,
  name,
  message,
  subject,
}: {
  to: string
  name: string
  message: string
  subject?: string
}): Promise<boolean> {
  console.log(" Sending admin response email to:", to)

  if (!initEmailJS()) {
    console.log(" Email would be sent:", { to, name, message, subject, type: "admin_response" })
    return true
  }

  try {
    const templateParams = {
      to_email: to,
      to_name: name,
      subject: subject || "Message from Deborah Listens",
      message: message,
      from_name: "Deborah Listens",
    }

    await emailjs.send(EMAILJS_SERVICE_ID, TEMPLATE_ADMIN_RESPONSE, templateParams, {
      publicKey: EMAILJS_PUBLIC_KEY,
      privateKey: EMAILJS_PRIVATE_KEY,
    })

    console.log(" Admin response email sent successfully")
    return true
  } catch (error) {
    console.error(" Failed to send admin response email:", error)
    return false
  }
}

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}): Promise<boolean> {
  console.log(" Sending generic email to:", to)

  if (!initEmailJS()) {
    console.log(" Email would be sent:", { to, subject, type: "generic" })
    return true
  }

  try {
    const templateParams = {
      to_email: to,
      subject: subject,
      message: html,
      from_name: "Deborah Listens",
    }

    await emailjs.send(EMAILJS_SERVICE_ID, TEMPLATE_ADMIN_RESPONSE, templateParams, {
      publicKey: EMAILJS_PUBLIC_KEY,
      privateKey: EMAILJS_PRIVATE_KEY,
    })

    console.log(" Generic email sent successfully")
    return true
  } catch (error) {
    console.error(" Failed to send generic email:", error)
    return false
  }
}

export function generateBookingConfirmationEmail(name: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Deborah Listens</h1>
          </div>
          <div class="content">
            <h2>Hi ${name},</h2>
            <p>Thank you for reaching out to Deborah Listens. We have received your booking request.</p>
            <p>We will review your request and get back to you shortly.</p>
            <p>Best regards,<br>Deborah Listens</p>
          </div>
          <div class="footer">
            <p>Contact: deborahlistens12@gmail.com | +250 781 309 303</p>
          </div>
        </div>
      </body>
    </html>
  `
}
