import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { insertContact } from "@/lib/db";

type Contact = {
  name: string;
  email: string;
  phone?: string;
  serviceType?: string;
  message: string;
  createdAt: string;
};

export async function POST(request: Request) {
  try {
    console.log("Contact form submission received");

    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    const contact: Contact = {
      name: body.name,
      email: body.email,
      phone: body.phone || "",
      serviceType: body.serviceType || "",
      message: body.message,
      createdAt: new Date().toISOString(),
    };

    // Save to database
    const id = await insertContact(contact);

    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false, 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: `"Website Booking" <${process.env.EMAIL_USER}>`,
      to: contact.email,
      subject: "Booking Confirmation",
      html: `
        <h2>Booking Confirmation</h2>
        <p>Hello ${contact.name},</p>
        <p>Your booking request has been received successfully.</p>
        <p><strong>Booking ID:</strong> ${id}</p>
        <p>We will contact you shortly.</p>
        <br />
        <p>Thank you.</p>
      `,
    });

    // Send notification email to admin
    if (process.env.ADMIN_EMAIL) {
      await transporter.sendMail({
        from: `"Website Booking" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `New Booking Request from ${contact.name}`,
        html: `
          <h2>New Booking Request</h2>
          <p><strong>Name:</strong> ${contact.name}</p>
          <p><strong>Email:</strong> ${contact.email}</p>
          <p><strong>Phone:</strong> ${contact.phone || "Not provided"}</p>
          <p><strong>Service:</strong> ${contact.serviceType || "Not specified"}</p>
          <p><strong>Message:</strong> ${contact.message}</p>
          <p><strong>Booking ID:</strong> ${id}</p>
        `,
      });
    }

    return NextResponse.json({ ok: true, id });
  } catch (error) {
    console.error("API /api/contact error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to save booking. Please try again." },
      { status: 500 },
    );
  }
}
