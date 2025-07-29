# Supabase Setup Guide

## Connection String Breakdown

Your Supabase connection string format:
```
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
```

## What to Replace:

### 1. `[YOUR-PASSWORD]`
**Replace with:** Your Supabase database password

**How to find it:**
1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **Database**
3. Look for **Database Password** section
4. Copy the password (or click "Reset password" if needed)

### 2. `[YOUR-PROJECT-REF]`
**Replace with:** Your Supabase project reference ID

**How to find it:**
1. Go to your Supabase project dashboard
2. Look at the URL in your browser
3. It will look like: `https://supabase.com/dashboard/project/abcdefghijklmnop`
4. The `abcdefghijklmnop` part is your project reference
5. Or check **Settings** → **General** → **Reference ID**

## Using the ORM Tab (Recommended)

### Step 1: Get Connection Strings from ORM Tab
1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **Database**
3. Click on the **"ORM"** tab
4. You'll see two connection strings:

**Direct Connection (for migrations):**
```
postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:5432/postgres
```

**Connection Pooling (for your app):**
```
postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

## Complete Example:

**Before:**
```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
```

**After (example):**
```env
DATABASE_URL="postgresql://postgres:mypassword123@db.abcdefghijklmnop.supabase.co:5432/postgres"
```

## Environment Configuration

### For `.env.local` (Development)
```env
# Direct connection for migrations
DATABASE_URL="postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:5432/postgres?sslmode=require"

# Connection pooling for your app (recommended)
# DATABASE_URL="postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require"
```

### For Production (Vercel/Other Platforms)
```env
# Use connection pooling for production
DATABASE_URL="postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require"
```

## Step-by-Step Setup:

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in with GitHub
4. Click "New Project"
5. Choose organization
6. Enter project name (e.g., "recipe-sharing-platform")
7. Enter database password
8. Choose region (closest to your users)
9. Click "Create new project"

### 2. Get Your Connection Details
1. In your Supabase dashboard, go to **Settings** → **Database**
2. Click on the **"ORM"** tab
3. Copy the appropriate connection string:
   - **Direct connection** (for migrations): Use the first connection string
   - **Connection pooling** (for your app): Use the second connection string with `?pgbouncer=true`
4. Add `?sslmode=require` to the end of your connection string

### 3. Update Environment Variables
1. Copy `env.example` to `.env.local`:
   ```bash
   cp env.example .env.local
   ```

2. Edit `.env.local` and replace the DATABASE_URL:
   ```env
   # For development (direct connection)
   DATABASE_URL="postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:5432/postgres?sslmode=require"
   
   # For production (connection pooling)
   # DATABASE_URL="postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require"
   ```

### 4. Deploy Schema
```bash
# Push your Prisma schema to Supabase
npx prisma db push

# Generate Prisma client
npx prisma generate

# Seed database (optional)
npm run db:seed
```

## Security Notes:

1. **Never commit your `.env.local` file**
2. **Use strong passwords**
3. **Enable Row Level Security (RLS) in Supabase**
4. **Set up proper authentication**

## Troubleshooting:

### Connection Issues:
- Check if password is correct
- Verify project reference ID
- Ensure SSL is enabled (Supabase requires it)

### Migration Issues:
- Run `npx prisma db push` instead of `npx prisma migrate dev`
- Check if tables already exist
- Verify schema compatibility

## Next Steps:

1. ✅ Set up Supabase project
2. ✅ Update DATABASE_URL
3. ✅ Run `npx prisma db push`
4. ✅ Test connection with `npx prisma studio`
5. ✅ Deploy your application

## Environment Variables for Production:

When deploying to Vercel or other platforms, add these environment variables:

```env
# Use connection pooling for production
DATABASE_URL="postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="https://your-domain.com"
```

## Connection Types Explained:

### Direct Connection (Port 5432)
- **Use for:** Database migrations, schema changes
- **When:** Running `npx prisma db push`, `npx prisma migrate`
- **Format:** `postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:5432/postgres?sslmode=require`

### Connection Pooling (Port 6543)
- **Use for:** Your application queries
- **When:** Running your app, API calls
- **Format:** `postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require`

## Prisma Configuration:

Update your `prisma/schema.prisma` to handle connection pooling:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL") // For migrations
}
```

And in your `.env.local`:
```env
# For your app (connection pooling)
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require"

# For migrations (direct connection)
DIRECT_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:5432/postgres?sslmode=require"
``` 