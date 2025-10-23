# Setup Guide

## Database Setup with Prisma

### 1. Install Dependencies

\`\`\`bash
npm install @prisma/client bcryptjs
npm install -D prisma tsx @types/bcryptjs
\`\`\`

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

\`\`\`env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/deborah_listens"

# Admin Authentication
ADMIN_TOKEN="your-secure-admin-token-here"

# Email Configuration (optional for production)
EMAIL_API_URL="https://api.resend.com/emails"
EMAIL_API_KEY="your-email-api-key"
EMAIL_FROM="noreply@deborahlistens.com"
\`\`\`

### 3. Generate Prisma Client

\`\`\`bash
npx prisma generate
\`\`\`

### 4. Run Database Migrations

\`\`\`bash
npx prisma db push
\`\`\`

### 5. Generate Admin Token

Run the token generator script:

\`\`\`bash
npx tsx scripts/generate-admin-token.ts
\`\`\`

Copy the generated token and add it to your `.env` file as `ADMIN_TOKEN`.

### 6. Create Admin User (Optional)

If you want to use database-based admin authentication:

\`\`\`bash
npx tsx scripts/create-admin-user.ts
\`\`\`

Follow the prompts to create an admin user with email and password.

## Email Setup

### Development
In development mode, emails are logged to the console instead of being sent.

### Production
For production, you can use any email service:

1. **Resend** (Recommended for Vercel)
   - Sign up at https://resend.com
   - Get your API key
   - Set `EMAIL_API_URL=https://api.resend.com/emails`
   - Set `EMAIL_API_KEY=your-resend-api-key`

2. **SendGrid**
   - Sign up at https://sendgrid.com
   - Get your API key
   - Update the email utility in `lib/email.ts` to use SendGrid's API

3. **Other Services**
   - Update the `sendEmail` function in `lib/email.ts` to match your provider's API

## Admin Access

### Login
1. Navigate to `/admin/login`
2. Enter the admin token from your `.env` file
3. Click "Sign In"

### Features
- View all bookings with status indicators
- Confirm bookings (sends email to user)
- Cancel bookings
- Add admin notes
- Send custom responses to users
- Export bookings as CSV

## Database Management

### View Database
\`\`\`bash
npx prisma studio
\`\`\`

### Reset Database
\`\`\`bash
npx prisma db push --force-reset
\`\`\`

### Backup Database
\`\`\`bash
pg_dump -U user -d deborah_listens > backup.sql
\`\`\`

## Troubleshooting

### Prisma Client Not Found
Run: `npx prisma generate`

### Database Connection Error
Check your `DATABASE_URL` in `.env` file

### Email Not Sending
- In development: Check console logs
- In production: Verify `EMAIL_API_URL` and `EMAIL_API_KEY` are set correctly
