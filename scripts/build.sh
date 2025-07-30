#!/bin/bash

# Exit on any error
set -e

echo "🔧 Starting build process..."

# Always generate Prisma client first (with dummy URL if needed)
echo "🗄️  Generating Prisma client..."
if [ -z "$DATABASE_URL" ]; then
    echo "⚠️  DATABASE_URL not set, using dummy URL for Prisma generation"
    DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" npx prisma generate --schema=./prisma/schema.prisma
else
    npx prisma generate --schema=./prisma/schema.prisma
fi

echo "📦 Building Next.js application..."
if [ -z "$DATABASE_URL" ]; then
    echo "⚠️  Building without database connection..."
    DATABASE_URL="" npm run build:no-db
else
    npm run build
fi

echo "✅ Build completed successfully!" 