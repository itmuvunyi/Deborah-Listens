# Quick Start Guide

## Running Without Database Setup (Immediate Use)

The application will work immediately using JSON file storage as a fallback. No database setup required!

### Steps:

1. **Download the project** from v0 (click three dots → Download ZIP)
2. **Extract and open in VS Code**
3. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`
4. **Create `.env` file** with minimal configuration:
   \`\`\`env
   ADMIN_EMAIL="admin@example.com"
   ADMIN_TOKEN="your-secure-token-123"
   EMAIL_SERVICE="console"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   \`\`\`
5. **Run the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`
6. **Access the app** at http://localhost:3000

The booking system will automatically use JSON file storage in the `data/` folder until you set up a database.

---

## Adding PostgreSQL Database (Optional - For Production)

When you're ready to use a real database:

### Option 1: Cloud Database (Easiest)

**Using Neon (Recommended):**
1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Add to `.env`:
   \`\`\`env
   DATABASE_URL="postgresql://user:pass@host/dbname"
   \`\`\`
5. Run:
   \`\`\`bash
   npx prisma generate
   npx prisma db push
   npm run dev
   \`\`\`

### Option 2: Local PostgreSQL

1. Install PostgreSQL on your machine
2. Create a database:
   \`\`\`bash
   createdb deborah_listens
   \`\`\`
3. Add to `.env`:
   \`\`\`env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/deborah_listens"
   \`\`\`
4. Run:
   \`\`\`bash
   npx prisma generate
   npx prisma db push
   npm run dev
   \`\`\`

---

## Admin Access

1. Go to http://localhost:3000/admin/login
2. Enter your `ADMIN_EMAIL` and `ADMIN_TOKEN` from `.env`
3. View and manage bookings

---

## Testing the Booking System

1. Fill out the contact form on the homepage
2. Check the terminal for the confirmation email (logged in development)
3. Log in to admin dashboard to see the booking
4. Confirm the booking or send a response

---

## Troubleshooting

**"Failed to execute 'json'" error:**
- This means the API crashed. Check the terminal for error details.
- The app should automatically fall back to JSON storage.
- If using Prisma, make sure you ran `npx prisma generate`

**Database connection issues:**
- Verify your `DATABASE_URL` is correct
- Make sure PostgreSQL is running
- Try using a cloud database (Neon or Supabase) for easier setup

**Port 3000 already in use:**
\`\`\`bash
npm run dev -- -p 3001
\`\`\`

---

## File Storage Location

When using JSON fallback, bookings are stored in:
\`\`\`
data/contacts.json
\`\`\`

You can view this file to see all bookings.

---

## Next Steps

- Customize the design in `components/`
- Set up a real email service for production
- Deploy to Vercel (click "Publish" in v0)
- Review `SETUP_GUIDE.md` for detailed instructions
