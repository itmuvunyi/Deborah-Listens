# EmailJS Setup Guide

This guide will help you set up EmailJS to send emails from your Deborah Listens application.

## What is EmailJS?

EmailJS is a service that allows you to send emails directly from your application without needing your own email server. It's perfect for contact forms, booking confirmations, and notifications.

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add an Email Service

1. After logging in, go to the **Email Services** page
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email account
5. Copy the **Service ID** (you'll need this later)

## Step 3: Create Email Templates

You need to create 3 email templates for the application:

### Template 1: Booking Confirmation (sent to users when they submit a booking)

1. Go to **Email Templates** page
2. Click "Create New Template"
3. Name it: "Booking Confirmation"
4. Set up the template with these variables:
   - `{{to_name}}` - User's name
   - `{{booking_id}}` - Booking ID
   - `{{from_name}}` - Your name (Deborah Listens)

**Example Template:**
\`\`\`
Subject: Booking Received - {{from_name}}

Hi {{to_name}},

Thank you for reaching out to Deborah Listens. We have received your booking request.

Booking ID: {{booking_id}}

We will review your request and get back to you shortly.

Best regards,
{{from_name}}
\`\`\`

5. Copy the **Template ID**

### Template 2: Admin Confirmation (sent when admin confirms a booking)

1. Create another template named "Admin Confirmation"
2. Use these variables:
   - `{{to_name}}` - User's name
   - `{{booking_id}}` - Booking ID
   - `{{service_type}}` - Type of service
   - `{{admin_notes}}` - Admin's notes
   - `{{from_name}}` - Your name

**Example Template:**
\`\`\`
Subject: Booking Confirmed - {{from_name}}

Hi {{to_name}},

Great news! Your booking has been confirmed.

Booking ID: {{booking_id}}
Service: {{service_type}}

{{admin_notes}}

We look forward to our session together.

Best regards,
{{from_name}}
\`\`\`

3. Copy the **Template ID**

### Template 3: Admin Response (sent when admin sends a custom message)

1. Create a third template named "Admin Response"
2. Use these variables:
   - `{{to_name}}` - User's name
   - `{{subject}}` - Email subject
   - `{{message}}` - Admin's message
   - `{{from_name}}` - Your name

**Example Template:**
\`\`\`
Subject: {{subject}}

Hi {{to_name}},

{{message}}

Best regards,
{{from_name}}
\`\`\`

3. Copy the **Template ID**

## Step 4: Get Your API Keys

1. Go to **Account** → **General**
2. Find your **Public Key** (also called API Key)
3. Find your **Private Key** (you may need to generate one)
4. Copy both keys

## Step 5: Configure Environment Variables

Add these variables to your `.env` file:

\`\`\`env
# EmailJS Configuration
EMAILJS_SERVICE_ID=your_service_id_here
EMAILJS_PUBLIC_KEY=your_public_key_here
EMAILJS_PRIVATE_KEY=your_private_key_here

# Template IDs
EMAILJS_TEMPLATE_BOOKING_CONFIRMATION=your_booking_template_id
EMAILJS_TEMPLATE_ADMIN_CONFIRMATION=your_admin_confirmation_template_id
EMAILJS_TEMPLATE_ADMIN_RESPONSE=your_admin_response_template_id
\`\`\`

Replace the placeholder values with the actual IDs and keys you copied from EmailJS.

## Step 6: Test Your Setup

1. Restart your development server: `npm run dev`
2. Go to your contact form
3. Submit a test booking
4. Check your email inbox for the confirmation email

## Troubleshooting

### Emails not sending?

1. **Check your environment variables** - Make sure all IDs and keys are correct
2. **Check EmailJS dashboard** - Go to the "Logs" section to see if requests are being received
3. **Check console logs** - Look for `[v0]` prefixed messages in your terminal
4. **Verify email service** - Make sure your email service is properly connected in EmailJS
5. **Check spam folder** - Sometimes emails end up in spam

### Template variables not working?

- Make sure variable names in your templates match exactly: `{{to_name}}`, `{{booking_id}}`, etc.
- Variables are case-sensitive
- Use double curly braces: `{{variable}}` not `{variable}`

## Free Tier Limits

EmailJS free tier includes:
- 200 emails per month
- 2 email services
- Unlimited templates

For higher volume, consider upgrading to a paid plan.

## Security Notes

- Never commit your `.env` file to version control
- Keep your Private Key secret
- The Private Key is only used on the server side (API routes)
- The Public Key can be exposed to the client but should still be kept in environment variables

## Need Help?

- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Support: [https://www.emailjs.com/support/](https://www.emailjs.com/support/)
\`\`\`

```env file="" isHidden
