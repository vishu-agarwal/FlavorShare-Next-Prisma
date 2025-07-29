# FlavorShare - Recipe Sharing Platform

A modern recipe sharing platform built with Next.js, Express, and Prisma.

## Features

- 🍳 Share and discover recipes
- ⭐ Rate and review recipes
- 🏷️ Categorize recipes by type
- 👨‍🍳 User profiles and social features
- 🔍 Search and filter recipes
- 📱 Responsive design

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Next.js API Routes, Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Development**: Local PostgreSQL instance

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL installed locally
- npm or yarn

### Local PostgreSQL Setup

1. **Install PostgreSQL** (if not already installed):
   
   **macOS (using Homebrew):**
   \`\`\`bash
   brew install postgresql
   brew services start postgresql
   \`\`\`
   
   **Ubuntu/Debian:**
   \`\`\`bash
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   sudo systemctl start postgresql
   sudo systemctl enable postgresql
   \`\`\`
   
   **Windows:**
   Download and install from [PostgreSQL official website](https://www.postgresql.org/download/windows/)

2. **Create database and user:**
   \`\`\`bash
   # Connect to PostgreSQL
   psql -U postgres
   
   # Create database
   CREATE DATABASE flavorshare;
   
   # Create user (optional, or use default postgres user)
   CREATE USER flavorshare_user WITH PASSWORD 'password';
   GRANT ALL PRIVILEGES ON DATABASE flavorshare TO flavorshare_user;
   
   # Exit psql
   \q
   \`\`\`

### Installation

1. **Clone the repository:**
   \`\`\`bash
   git clone <repository-url>
   cd flavorshare
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables:**
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   
   Update `.env` with your local database connection:
   \`\`\`env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/flavorshare?schema=public"
   # Or if you created a specific user:
   # DATABASE_URL="postgresql://flavorshare_user:password@localhost:5432/flavorshare?schema=public"
   \`\`\`

4. **Generate Prisma client:**
   \`\`\`bash
   npm run db:generate
   \`\`\`

5. **Run database migrations:**
   \`\`\`bash
   npm run db:migrate
   \`\`\`

6. **Seed the database with sample data:**
   \`\`\`bash
   npm run db:seed
   \`\`\`

7. **Start the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

8. **Visit the application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser

### Development Commands

- `npm run dev` - Start development server
- `npm run db:studio` - Open Prisma Studio (database GUI)
- `npm run db:migrate` - Run database migrations
- `npm run db:push` - Push schema changes to database
- `npm run db:seed` - Seed database with sample data
- `npm run db:reset` - Reset database and run migrations

### Database Management

**View your data:**
\`\`\`bash
npm run db:studio
\`\`\`
This opens Prisma Studio at `http://localhost:5555` where you can view and edit your data.

**Reset database:**
\`\`\`bash
npm run db:reset
\`\`\`
This will drop the database, recreate it, run migrations, and optionally seed it.

**Manual database connection:**
\`\`\`bash
psql -U postgres -d flavorshare
\`\`\`

## Project Structure

\`\`\`
flavorshare/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── lib/                   # Utility libraries
│   └── prisma.js         # Prisma client
├── prisma/               # Database schema and migrations
│   ├── schema.prisma     # Database schema
│   ├── seed.js          # Database seeding
│   └── migrations/      # Migration files
├── components/           # Reusable UI components
└── public/              # Static assets
\`\`\`

## Database Schema

The application uses the following main models:

- **User**: User accounts and profiles
- **Recipe**: Recipe information and instructions  
- **Ingredient**: Recipe ingredients
- **RecipeIngredient**: Junction table for recipe-ingredient relationships
- **Category**: Recipe categories (breakfast, lunch, dinner, etc.)
- **RecipeCategory**: Junction table for recipe-category relationships
- **Rating**: User ratings for recipes (1-5 stars)
- **Comment**: User comments on recipes

## API Endpoints

- `GET /api/recipes` - Get all recipes with filtering options
- `POST /api/recipes` - Create a new recipe
- `GET /api/recipes/[id]` - Get a specific recipe with full details
- `GET /api/categories` - Get all categories with recipe counts

### API Usage Examples

**Get recipes with filters:**
\`\`\`bash
# Get all recipes
curl http://localhost:3000/api/recipes

# Filter by category
curl http://localhost:3000/api/recipes?category=breakfast

# Filter by difficulty
curl http://localhost:3000/api/recipes?difficulty=easy

# Search recipes
curl http://localhost:3000/api/recipes?search=pancake
\`\`\`

## Troubleshooting

**Database connection issues:**
1. Ensure PostgreSQL is running: `brew services list | grep postgresql` (macOS)
2. Check if the database exists: `psql -U postgres -l`
3. Verify connection string in `.env` file
4. Check PostgreSQL logs for errors

**Migration issues:**
\`\`\`bash
# Reset and recreate migrations
npm run db:reset

# Or manually reset
npx prisma migrate reset
npx prisma migrate dev
\`\`\`

**Port conflicts:**
- PostgreSQL default port: 5432
- Next.js development server: 3000
- Prisma Studio: 5555

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm test` (when available)
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Submit a pull request

## License

MIT License - see LICENSE file for details
\`\`\`

```typescriptreact file="docker-compose.yml" isDeleted="true"
...deleted...
