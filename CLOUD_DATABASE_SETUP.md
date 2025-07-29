# Cloud Database Setup Guide

This guide will help you set up cloud database hosting for your recipe sharing platform. Your app uses PostgreSQL with Prisma ORM, so we'll focus on PostgreSQL-compatible cloud databases.

## Option 1: Vercel Postgres (Recommended for Next.js)

### Setup Steps:
1. **Deploy to Vercel:**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Add Postgres Database:**
   - Go to your Vercel dashboard
   - Navigate to your project
   - Go to "Storage" tab
   - Click "Create Database" → "Postgres"
   - Choose your region and plan

3. **Environment Variables:**
   - Vercel will automatically add `DATABASE_URL` to your environment
   - No additional configuration needed

4. **Deploy:**
   ```bash
   vercel --prod
   ```

### Benefits:
- Native Next.js integration
- Automatic connection pooling
- Built-in migrations support
- Serverless functions optimized

---

## Option 2: Supabase

### Setup Steps:
1. **Create Supabase Project:**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Choose region and plan

2. **Get Connection String:**
   - Go to Settings → Database
   - Copy the connection string
   - Format: `postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres`

3. **Environment Variables:**
   ```env
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
   ```

4. **Run Migrations:**
   ```bash
   npx prisma db push
   npx prisma generate
   ```

### Benefits:
- Real-time subscriptions
- Built-in authentication
- File storage included
- Great developer experience

---

## Option 3: Neon

### Setup Steps:
1. **Create Neon Database:**
   - Go to [neon.tech](https://neon.tech)
   - Create account and project
   - Choose region

2. **Get Connection String:**
   - Copy the connection string from dashboard
   - Format: `postgresql://username:password@ep-xxx-xxx-xxx.region.aws.neon.tech/database?sslmode=require`

3. **Environment Variables:**
   ```env
   DATABASE_URL="postgresql://username:password@ep-xxx-xxx-xxx.region.aws.neon.tech/database?sslmode=require"
   ```

4. **Run Migrations:**
   ```bash
   npx prisma db push
   npx prisma generate
   ```

### Benefits:
- Serverless PostgreSQL
- Branch-based development
- Pay-per-use pricing
- Auto-scaling

---

## Option 4: PlanetScale (MySQL)

**Note:** This requires schema changes since PlanetScale uses MySQL.

### Setup Steps:
1. **Update Prisma Schema:**
   ```prisma
   datasource db {
     provider = "mysql"
     url      = env("DATABASE_URL")
   }
   ```

2. **Create PlanetScale Database:**
   - Go to [planetscale.com](https://planetscale.com)
   - Create account and database
   - Get connection string

3. **Environment Variables:**
   ```env
   DATABASE_URL="mysql://username:password@aws.connect.psdb.cloud/database?sslaccept=strict"
   ```

4. **Run Migrations:**
   ```bash
   npx prisma db push
   npx prisma generate
   ```

### Benefits:
- Serverless MySQL
- Branch-based development
- Excellent scaling
- Zero-downtime schema changes

---

## Deployment Configuration

### For Vercel:
1. Connect your GitHub repository
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### For Other Platforms:
1. Set environment variables in your hosting platform
2. Run build commands:
   ```bash
   npm run build
   npm start
   ```

## Environment Variables Setup

Copy `env.example` to `.env.local` and update with your chosen database:

```bash
cp env.example .env.local
```

Then edit `.env.local` with your actual database URL.

## Migration Commands

After setting up your cloud database:

```bash
# Push schema to database
npx prisma db push

# Generate Prisma client
npx prisma generate

# Seed database (if needed)
npm run db:seed
```

## Connection Pooling (Recommended)

For production, add connection pooling:

```env
# Add to your DATABASE_URL
DATABASE_URL="postgresql://user:pass@host:port/db?pgbouncer=true&connection_limit=1&pool_timeout=20"
```

## Security Best Practices

1. **Never commit `.env` files**
2. **Use environment variables in production**
3. **Enable SSL for database connections**
4. **Use connection pooling for better performance**
5. **Regular database backups**

## Troubleshooting

### Common Issues:

1. **Connection Timeout:**
   - Check firewall settings
   - Verify connection string format
   - Ensure SSL is enabled

2. **Migration Errors:**
   - Run `npx prisma migrate reset` (development only)
   - Check schema compatibility

3. **Performance Issues:**
   - Enable connection pooling
   - Add database indexes
   - Monitor query performance

## Recommended Setup for Production

1. **Vercel + Vercel Postgres** (Easiest)
2. **Vercel + Supabase** (Most features)
3. **Vercel + Neon** (Best performance)

Choose based on your needs:
- **Simple deployment:** Vercel Postgres
- **Real-time features:** Supabase
- **Cost optimization:** Neon
- **MySQL preference:** PlanetScale 