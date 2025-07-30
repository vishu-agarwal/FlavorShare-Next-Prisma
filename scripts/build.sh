#!/bin/bash

# Exit on any error
set -e

echo "🔧 Starting build process..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "⚠️  DATABASE_URL not set, skipping Prisma client generation"
    echo "📦 Building Next.js application..."
    npm run build:no-db
else
    echo "🗄️  Generating Prisma client..."
    npx prisma generate
    
    echo "📦 Building Next.js application..."
    npm run build
fi

echo "✅ Build completed successfully!" 