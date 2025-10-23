# Setup Guide - Running in VS Code

This guide will help you set up and run the Deborah Listens booking system in VS Code with a PostgreSQL database.

## Prerequisites

Before you begin, make sure you have installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [VS Code](https://code.visualstudio.com/)
- [PostgreSQL](https://www.postgresql.org/download/) (or use a cloud service like [Neon](https://neon.tech/), [Supabase](https://supabase.com/), or [Railway](https://railway.app/))

## Step-by-Step Setup

### 1. Download and Extract the Project

1. In v0, click the three dots in the top right corner of the code block
2. Select "Download ZIP"
3. Extract the ZIP file to your desired location
4. Open VS Code
5. Go to `File > Open Folder` and select the extracted project folder

### 2. Install Dependencies

Open the integrated terminal in VS Code (`Terminal > New Terminal` or `` Ctrl+` ``) and run:

\`\`\`bash
npm install
\`\`\`

This will install all required packages including:
- Next.js
- Prisma
- React
- Tailwind CSS
- And other dependencies

### 3. Set Up Environment Variables

1. Create a `.env` file in the root of your project (same level as `package.json`)
2. Copy the contents from `.env.example` and fill in your values:

\`\`\`env
# Database Connection (PostgreSQL)
DATABASE_URL="postgresql://username:password@localhost:5432/deborah_listens?schema=public"

# Admin Authentication
ADMIN_EMAIL="admin@example.com"
ADMIN_TOKEN="your-secure-admin-token-here"

# Email Configuration (Optional - for production)
EMAIL_SERVICE="console"  # Use "console" for development, "smtp" or "api" for production
EMAIL_API_URL=""         # Only needed if using an email API service
EMAIL_FROM="noreply@deborahlistens.com"
EMAIL_API_KEY=""         # Only needed for production email service

# Public URL (for email links)
NEXT_PUBLIC_APP_URL="http://localhost:3000"
\`\`\`

**Important Notes:**
- Replace `username`, `password`, and database details with your PostgreSQL credentials
- For local PostgreSQL, the default is usually `postgresql://postgres:postgres@localhost:5432/deborah_listens`
- The `ADMIN_TOKEN` can be any secure string you choose (or generate one using the script below)

### 4. Create Admin User with Your Own Password

You have two options for admin authentication:

#### Option A: Create Admin User in Database (Recommended)

This allows you to use your own email and password to log in:

\`\`\`bash
npx tsx scripts/create-admin-user.ts
\`\`\`

The script will prompt you for:
- Admin email (e.g., admin@example.com)
- Admin password (choose a secure password)
- Admin name (optional)

Your password will be securely hashed using bcrypt before being stored in the database.

**To log in:**
1. Go to http://localhost:3000/admin/login
2. Click the "Email & Password" tab
3. Enter your email and password
4. Click "Sign in"

#### Option B: Use Admin Token (Fallback)

Alternatively, you can use a token-based authentication:

\`\`\`bash
npx tsx scripts/generate-admin-token.ts
\`\`\`

Copy the generated token and add it to your `.env` file as `ADMIN_TOKEN`.

**To log in:**
1. Go to http://localhost:3000/admin/login
2. Click the "Token" tab
3. Enter your admin token
4. Click "Sign in"

### 5. Set Up the Database

#### Option A: Using PostgreSQL Locally

1. Make sure PostgreSQL is running on your machine
2. Create a new database:
   \`\`\`bash
   createdb deborah_listens
   \`\`\`
   Or use a PostgreSQL client like pgAdmin or DBeaver

3. Update your `DATABASE_URL` in `.env` with your database credentials

#### Option B: Using a Cloud Database (Recommended for beginners)

**Using Neon (Free tier available):**
1. Go to [neon.tech](https://neon.tech/) and sign up
2. Create a new project
3. Copy the connection string
4. Paste it as your `DATABASE_URL` in `.env`

**Using Supabase (Free tier available):**
1. Go to [supabase.com](https://supabase.com/) and sign up
2. Create a new project
3. Go to Project Settings > Database
4. Copy the connection string (use the "Connection pooling" string for better performance)
5. Paste it as your `DATABASE_URL` in `.env`

### 6. Initialize Prisma and Database

Run these commands in order:

\`\`\`bash
# Generate Prisma Client
npx prisma generate

# Create database tables
npx prisma db push

# Create your admin user (if you haven't already)
npx tsx scripts/create-admin-user.ts

# (Optional) Open Prisma Studio to view your database
npx prisma studio
\`\`\`

**What these commands do:**
- `prisma generate` - Creates the Prisma Client based on your schema
- `prisma db push` - Creates the tables in your database
- `create-admin-user.ts` - Creates an admin user in the database
- `prisma studio` - Opens a visual database browser at http://localhost:5555

### 7. Run the Development Server

Start the Next.js development server:

\`\`\`bash
npm run dev
\`\`\`

Your application will be available at [http://localhost:3000](http://localhost:3000)

### 8. Access the Admin Dashboard

1. Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. Choose your login method:
   - **Email & Password**: Use the credentials you created with `npx tsx scripts/create-admin-user.ts`
   - **Token**: Use the token from your `.env` file
3. You'll be redirected to the admin dashboard where you can:
   - View all bookings
   - Confirm bookings
   - Respond to users via email

## Testing the Booking System

### Test User Booking Flow

1. Go to [http://localhost:3000](http://localhost:3000)
2. Scroll to the contact/booking form
3. Fill in the form with test data
4. Submit the form
5. Check the terminal/console for the confirmation email (in development mode, emails are logged to console)
6. The booking should appear in the admin dashboard

### Test Admin Features

1. Log in to the admin dashboard
2. You should see the test booking you just created
3. Click "Confirm Booking" to send a confirmation email to the user
4. Use "Send Response" to send a custom message to the user

## Troubleshooting

### Cannot Create Admin User

If you get an error when running `create-admin-user.ts`:

1. **"Admin with this email already exists"**: The email is already registered. Try a different email or delete the existing admin from the database using Prisma Studio.
2. **Database connection error**: Make sure you've run `npx prisma generate` and `npx prisma db push` first.
3. **Prisma Client not found**: Run `npx prisma generate` to create the Prisma Client.

### "Invalid credentials" Error on Login

If you can't log in:

1. **Email/Password**: Make sure you created an admin user using `npx tsx scripts/create-admin-user.ts`
2. **Token**: Make sure the `ADMIN_TOKEN` in your `.env` file matches what you're entering
3. Check the terminal/console for error messages
4. Verify your database connection is working

### "Failed to execute 'json' on 'Response'" Error

This error occurs when the API route crashes before returning JSON. Common causes:

1. **Prisma not generated**: Run `npx prisma generate`
2. **Database connection failed**: Check your `DATABASE_URL` in `.env`
3. **Missing dependencies**: Run `npm install` again

**Quick Fix**: The app will automatically fall back to JSON file storage if Prisma isn't available. Check the console logs for details.

### Database Connection Issues

If you see database connection errors:

1. Verify your `DATABASE_URL` is correct
2. Make sure PostgreSQL is running (if using local database)
3. Check that the database exists
4. Verify your username and password are correct
5. Try using a cloud database service (Neon or Supabase) for easier setup

### Port Already in Use

If port 3000 is already in use:

\`\`\`bash
# Use a different port
npm run dev -- -p 3001
\`\`\`

Or kill the process using port 3000:

\`\`\`bash
# On Mac/Linux
lsof -ti:3000 | xargs kill -9

# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
\`\`\`

### Email Not Sending

In development mode, emails are logged to the console instead of being sent. To enable real email sending:

1. Set up an email service (Resend, SendGrid, or SMTP)
2. Update the `EMAIL_SERVICE`, `EMAIL_API_URL`, and `EMAIL_API_KEY` in `.env`
3. Update the `sendEmail` function in `lib/email.ts` to use your email service

## Project Structure

\`\`\`
deborah-listens/
├── app/                      # Next.js app directory
│   ├── admin/               # Admin pages
│   │   ├── login/          # Admin login page
│   │   └── bookings/       # Admin dashboard
│   ├── api/                # API routes
│   │   ├── contact/        # Booking submission endpoint
│   │   └── admin/          # Admin API endpoints
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/              # React components
│   ├── contact.tsx         # Booking form
│   ├── admin-nav.tsx       # Admin navigation
│   └── ui/                 # UI components (shadcn)
├── lib/                     # Utility functions
│   ├── db.ts               # Database operations
│   ├── email.ts            # Email functions
│   ├── prisma.ts           # Prisma client
│   └── utils.ts            # Helper functions
├── prisma/                  # Prisma configuration
│   └── schema.prisma       # Database schema
├── scripts/                 # Utility scripts
│   ├── generate-admin-token.ts
│   └── create-admin-user.ts
├── public/                  # Static assets
├── .env                     # Environment variables (create this)
├── .env.example            # Environment variables template
└── package.json            # Dependencies and scripts
\`\`\`

## Available Scripts

\`\`\`bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Database
npx prisma generate  # Generate Prisma Client
npx prisma db push   # Push schema to database
npx prisma studio    # Open database browser
npx prisma migrate dev  # Create and apply migrations

# Admin Management
npx tsx scripts/create-admin-user.ts     # Create admin user with email/password
npx tsx scripts/generate-admin-token.ts  # Generate admin token (fallback method)
\`\`\`

## Next Steps

1. **Customize the design**: Edit components in the `components/` folder
2. **Add more features**: Extend the Prisma schema and create new API routes
3. **Set up email service**: Configure a real email service for production
4. **Deploy to Vercel**: Click the "Publish" button in v0 or push to GitHub and deploy

Vercel will automatically:
- Build your Next.js app
- Set up the database connection
- Deploy to a production URL

---

**Note**: This project uses Prisma with PostgreSQL. If you prefer a different database, update the `provider` in `prisma/schema.prisma` and adjust your `DATABASE_URL` accordingly.
