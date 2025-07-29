# Quick Setup Guide - Local PostgreSQL

## 1. Install PostgreSQL

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**macOS:**
```bash
brew install postgresql
brew services start postgresql
```

**Windows:**
Download from [PostgreSQL official website](https://www.postgresql.org/download/windows/)

## 2. Create Database

```bash
# Connect to PostgreSQL
sudo -u postgres psql

# Create database and user
CREATE DATABASE flavorshare;
CREATE USER flavorshare_user WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE flavorshare TO flavorshare_user;
\q
```

**Or use the provided script:**
```bash
sudo -u postgres psql -f scripts/setup-local-db.sql
```

## 3. Configure Environment

```bash
# Copy environment template
cp env.example .env

# Edit .env with your database connection
# DATABASE_URL="postgresql://postgres:password@localhost:5432/flavorshare?schema=public"
```

## 4. Install Dependencies & Setup Database

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed database
npm run db:seed
```

## 5. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Useful Commands

- `npm run db:studio` - Open Prisma Studio (database GUI)
- `npm run db:reset` - Reset database and run migrations
- `npm run db:seed` - Seed database with sample data

## Troubleshooting

**Database connection issues:**
- Ensure PostgreSQL is running: `sudo systemctl status postgresql`
- Check if database exists: `psql -U postgres -l`
- Verify connection string in `.env`

**Port conflicts:**
- PostgreSQL: 5432
- Next.js: 3000
- Prisma Studio: 5555 