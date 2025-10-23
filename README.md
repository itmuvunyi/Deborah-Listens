# Deborah Listens - Counselling Booking System

A professional counselling booking and management system for Deborah Listens, featuring client booking forms, automated email notifications, and a comprehensive admin dashboard.

## Features

### Client Features
- **Online Booking Form**: Easy-to-use form for booking counselling sessions
- **Automatic Confirmation Emails**: Clients receive immediate confirmation when they submit a booking
- **Service Selection**: Choose from various counselling services
- **Contact Information**: Multiple ways to reach out (phone, email, WhatsApp, social media)

### Admin Features
- **Secure Admin Dashboard**: Token-based authentication for administrators
- **Booking Management**: View all bookings with status tracking (pending, confirmed, cancelled)
- **Email Notifications**: Send confirmation emails and custom responses to clients
- **Booking Confirmation**: Confirm or cancel bookings with optional notes
- **Direct Client Communication**: Send custom email messages to clients
- **Export Functionality**: Download booking data as CSV
- **Statistics Dashboard**: View booking metrics at a glance

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

\`\`\`env
# Admin Authentication
ADMIN_TOKEN=your-secure-admin-token-here

# Email Configuration (Optional - defaults to console logging in development)
EMAIL_SERVICE=console  # Set to 'api' for production
EMAIL_API_URL=https://your-email-service.com/send
EMAIL_API_KEY=your-email-api-key
EMAIL_FROM=noreply@deborahlistens.com
ADMIN_EMAIL=admin@deborahlistens.com  # Optional: receive notifications for new bookings

# EmailJS Configuration
EMAILJS_SERVICE_ID=your_service_id_here
EMAILJS_PUBLIC_KEY=your_public_key_here
EMAILJS_PRIVATE_KEY=your_private_key_here

# EmailJS Template IDs
EMAILJS_TEMPLATE_BOOKING_CONFIRMATION=your_booking_template_id
EMAILJS_TEMPLATE_ADMIN_CONFIRMATION=your_admin_confirmation_template_id
EMAILJS_TEMPLATE_ADMIN_RESPONSE=your_admin_response_template_id
\`\`\`

### 2. Admin Token Setup

1. Generate a secure random token (recommended: 32+ characters)
2. Add it to your `.env.local` file as `ADMIN_TOKEN`
3. Share this token securely with administrators who need dashboard access

### 3. Email Service Setup

#### EmailJS Setup (Recommended)

This project uses EmailJS for sending emails. Follow these steps:

1. **Create an EmailJS account** at [https://www.emailjs.com/](https://www.emailjs.com/)
2. **Set up email templates** - See `EMAILJS_SETUP.md` for detailed instructions
3. **Add environment variables** to your `.env.local`:

\`\`\`env
# EmailJS Configuration
EMAILJS_SERVICE_ID=your_service_id_here
EMAILJS_PUBLIC_KEY=your_public_key_here
EMAILJS_PRIVATE_KEY=your_private_key_here

# EmailJS Template IDs
EMAILJS_TEMPLATE_BOOKING_CONFIRMATION=your_booking_template_id
EMAILJS_TEMPLATE_ADMIN_CONFIRMATION=your_admin_confirmation_template_id
EMAILJS_TEMPLATE_ADMIN_RESPONSE=your_admin_response_template_id
\`\`\`

For detailed setup instructions, see **EMAILJS_SETUP.md**.

#### Development Mode
Without EmailJS configured, emails are logged to the console. This is perfect for testing.

## Quick Start

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd deborah-listens
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   # Edit .env.local with your values
   \`\`\`

4. **Set up database (optional - uses Prisma with PostgreSQL)**
   \`\`\`bash
   npx prisma generate
   npx prisma db push
   \`\`\`

5. **Create admin user (optional - for email/password login)**
   \`\`\`bash
   npx tsx scripts/create-admin-user.ts
   \`\`\`

6. **Run development server**
   \`\`\`bash
   npm run dev
   \`\`\`

7. **Access the application**
   - Main site: http://localhost:3000
   - Admin login: http://localhost:3000/admin/login

## Project Structure

\`\`\`
├── app/
│   ├── admin/
│   │   ├── bookings/page.tsx    # Admin dashboard
│   │   └── login/page.tsx       # Admin login
│   ├── api/
│   │   ├── admin/
│   │   │   ├── bookings/
│   │   │   │   ├── route.ts     # Get bookings
│   │   │   │   ├── confirm/route.ts  # Confirm bookings
│   │   │   │   └── respond/route.ts  # Send responses
│   │   │   ├── login/route.ts   # Admin authentication
│   │   │   └── logout/route.ts  # Admin logout
│   │   └── contact/route.ts     # Client booking submission
│   └── page.tsx                 # Main website
├── components/
│   ├── admin-nav.tsx            # Admin navigation
│   ├── contact.tsx              # Booking form
│   └── ui/                      # UI components
├── lib/
│   ├── db.ts                    # Database operations
│   └── email.ts                 # Email utilities
└── data/                        # Database storage (auto-created)
\`\`\`

## Email Templates

The system includes three professional email templates:

1. **Booking Confirmation**: Sent when client submits a booking
2. **Booking Confirmed**: Sent when admin confirms a booking
3. **Admin Response**: Sent when admin sends a custom message

All templates are branded with Deborah Listens styling and include contact information.

## Security

- Admin routes are protected with token authentication
- Tokens are stored in secure, HTTP-only cookies
- All sensitive operations require authentication
- Client data is stored securely and never exposed publicly

## Support

For technical support or questions:
- Email: deborahlistens12@gmail.com
- Phone: +250 781 309 303
- WhatsApp: +250 781 309 303

## License

Copyright © 2025 Deborah Listens. All rights reserved.

## Documentation

- **SETUP_GUIDE.md** - Comprehensive setup instructions for VS Code
- **EMAILJS_SETUP.md** - Detailed EmailJS configuration guide
- **QUICK_START.md** - Quick start guide for getting up and running
