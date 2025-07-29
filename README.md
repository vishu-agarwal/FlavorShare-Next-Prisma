# FlavorShare - Recipe Sharing Platform

A modern, full-stack recipe sharing platform built with Next.js 14, featuring a beautiful UI, robust database management, and comprehensive social features for food enthusiasts.

![FlavorShare Platform](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-ORM-green?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?style=for-the-badge&logo=postgresql)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🌟 Features

### Core Functionality
- **🍳 Recipe Management**: Create, edit, and share detailed recipes with step-by-step instructions
- **📱 Responsive Design**: Beautiful, mobile-first interface that works on all devices
- **🔍 Advanced Search**: Filter recipes by category, difficulty, cooking time, and ingredients
- **⭐ Rating System**: Rate recipes with 1-5 stars and leave detailed reviews
- **💬 Social Features**: Comment on recipes and engage with the community
- **👨‍🍳 User Profiles**: Personal profiles with recipe collections and activity history

### Technical Features
- **⚡ Performance**: Server-side rendering with Next.js 14 and incremental static regeneration
- **🎨 Modern UI**: Built with Radix UI components and Tailwind CSS
- **🔒 Type Safety**: Full TypeScript implementation for better development experience
- **📊 Database**: PostgreSQL with Prisma ORM for robust data management
- **🎯 SEO Optimized**: Built-in SEO features with metadata generation
- **🌙 Dark Mode**: Theme support with next-themes
- **📝 Form Handling**: Advanced form validation with React Hook Form and Zod

### User Experience
- **🚀 Fast Loading**: Optimized images and lazy loading for better performance
- **🎯 Intuitive Navigation**: Clean, accessible navigation with mobile support
- **📱 Mobile-First**: Responsive design that works perfectly on mobile devices
- **♿ Accessibility**: WCAG compliant components and keyboard navigation
- **🎨 Beautiful Design**: Modern, clean interface with smooth animations

## 🛠️ Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **React 18**: Latest React features with concurrent rendering
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icon library
- **React Hook Form**: Performant forms with validation
- **Zod**: TypeScript-first schema validation

### Backend & Database
- **Next.js API Routes**: Serverless API endpoints
- **Prisma ORM**: Type-safe database client
- **PostgreSQL**: Robust relational database
- **Node.js**: JavaScript runtime

### Development Tools
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing
- **TypeScript**: Static type checking

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** ([Download](https://nodejs.org/))
- **PostgreSQL 12+** ([Download](https://www.postgresql.org/download/))
- **npm** or **yarn** package manager
- **Git** for version control

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd recipe-sharing-platform
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up PostgreSQL Database

#### Option A: Using Docker (Recommended)

```bash
# Start PostgreSQL with Docker
docker-compose up -d
```

#### Option B: Local PostgreSQL Installation

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
Download and install from [PostgreSQL official website](https://www.postgresql.org/download/windows/)

### 4. Create Database

```bash
# Connect to PostgreSQL
sudo -u postgres psql

# Create database and user
CREATE DATABASE flavorshare;
CREATE USER flavorshare_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE flavorshare TO flavorshare_user;
\q
```

### 5. Configure Environment

```bash
# Copy environment template
cp .env.example .env
```

Edit `.env` file with your database connection:

```env
DATABASE_URL="postgresql://flavorshare_user:your_password@localhost:5432/flavorshare?schema=public"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 6. Set Up Database

```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Seed database with sample data
npm run db:seed
```

### 7. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
recipe-sharing-platform/
├── app/                          # Next.js App Router
│   ├── api/                     # API routes
│   │   ├── categories/          # Category endpoints
│   │   ├── recipes/             # Recipe endpoints
│   │   └── users/               # User endpoints
│   ├── add-recipe/              # Add recipe page
│   ├── categories/              # Categories page
│   ├── recipes/                 # Recipe listing and detail pages
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # Reusable UI components
│   ├── ui/                      # Radix UI components
│   ├── add-recipe-form.tsx      # Recipe form component
│   ├── floating-action-button.tsx
│   ├── header.tsx               # Site header
│   ├── mobile-nav.tsx           # Mobile navigation
│   ├── recipe-filters.tsx       # Recipe filtering
│   ├── seo.tsx                  # SEO component
│   └── theme-provider.tsx       # Theme provider
├── hooks/                       # Custom React hooks
├── lib/                         # Utility libraries
│   ├── cache.ts                 # Caching utilities
│   ├── prisma.js                # Prisma client
│   ├── seo.ts                   # SEO utilities
│   └── utils.ts                 # General utilities
├── prisma/                      # Database configuration
│   ├── schema.prisma            # Database schema
│   ├── seed.js                  # Database seeding
│   └── migrations/              # Migration files
├── public/                      # Static assets
├── scripts/                     # Database setup scripts
└── styles/                      # Additional styles
```

## 🗄️ Database Schema

The application uses a comprehensive database schema with the following main models:

### Core Models
- **User**: User accounts with profiles, avatars, and bio
- **Recipe**: Recipe information including title, description, instructions, timing
- **Ingredient**: Individual ingredients with unique names
- **Category**: Recipe categories (breakfast, lunch, dinner, etc.)

### Junction Models
- **RecipeIngredient**: Links recipes to ingredients with quantities and units
- **RecipeCategory**: Links recipes to multiple categories

### Social Features
- **Rating**: User ratings (1-5 stars) for recipes
- **Comment**: User comments and reviews on recipes

### Enums
- **Difficulty**: EASY, MEDIUM, HARD

## 🔌 API Endpoints

### Recipes
- `GET /api/recipes` - Get all recipes with filtering
- `POST /api/recipes` - Create a new recipe
- `GET /api/recipes/[id]` - Get specific recipe details
- `PUT /api/recipes/[id]` - Update a recipe
- `DELETE /api/recipes/[id]` - Delete a recipe

### Categories
- `GET /api/categories` - Get all categories with recipe counts

### Users
- `GET /api/users/sample` - Get sample user data

### Query Parameters
- `?category=breakfast` - Filter by category
- `?difficulty=easy` - Filter by difficulty
- `?search=pancake` - Search recipe titles and descriptions
- `?limit=10` - Limit results
- `?page=1` - Pagination

## 🎨 UI Components

The application uses a comprehensive set of UI components built with Radix UI:

### Layout Components
- **Header**: Site navigation and user menu
- **Mobile Navigation**: Responsive mobile menu
- **Floating Action Button**: Quick add recipe button

### Form Components
- **Add Recipe Form**: Comprehensive recipe creation form
- **Recipe Filters**: Advanced filtering and search

### UI Primitives
- **Button**: Various button styles and variants
- **Card**: Content containers with headers
- **Dialog**: Modal dialogs and alerts
- **Form**: Form inputs and validation
- **Select**: Dropdown selections
- **Toast**: Notification system

## 🚀 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database Management
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run database migrations
npm run db:push      # Push schema changes
npm run db:seed      # Seed database with sample data
npm run db:studio    # Open Prisma Studio (database GUI)
npm run db:reset     # Reset database and run migrations
```

## 🛠️ Development Commands

### Database Management

**View your data:**
```bash
npm run db:studio
```
Opens Prisma Studio at `http://localhost:5555` for database management.

**Reset database:**
```bash
npm run db:reset
```
Drops the database, recreates it, runs migrations, and seeds it.

**Manual database connection:**
```bash
psql -U postgres -d flavorshare
```

### Development Workflow

1. **Start development server:**
   ```bash
   npm run dev
   ```

2. **Open Prisma Studio for database management:**
   ```bash
   npm run db:studio
   ```

3. **Make database changes:**
   ```bash
   # Edit prisma/schema.prisma
   npm run db:push
   # or
   npm run db:migrate
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/flavorshare?schema=public"

# Next.js
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Optional: Analytics
NEXT_PUBLIC_GA_ID="your-google-analytics-id"
```

### Tailwind Configuration

The project uses Tailwind CSS with custom configuration in `tailwind.config.ts`:

- Custom color palette
- Responsive breakpoints
- Animation utilities
- Component variants

## 🧪 Testing

### Manual Testing Checklist

- [ ] Recipe creation and editing
- [ ] Recipe search and filtering
- [ ] User authentication (if implemented)
- [ ] Rating and commenting system
- [ ] Mobile responsiveness
- [ ] Form validation
- [ ] Database operations

### Performance Testing

- [ ] Page load times
- [ ] Database query performance
- [ ] Image optimization
- [ ] SEO optimization

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Set environment variables in Vercel dashboard**
3. **Deploy automatically on push to main branch**

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- **Netlify**: Configure build settings for Next.js
- **Railway**: Direct deployment with PostgreSQL
- **DigitalOcean App Platform**: Managed deployment
- **AWS/GCP**: Container deployment

### Production Checklist

- [ ] Set production environment variables
- [ ] Configure database connection
- [ ] Set up monitoring and logging
- [ ] Configure CDN for static assets
- [ ] Set up SSL certificates
- [ ] Configure backup strategy

## 🐛 Troubleshooting

### Common Issues

**Database connection issues:**
1. Ensure PostgreSQL is running: `sudo systemctl status postgresql`
2. Check if database exists: `psql -U postgres -l`
3. Verify connection string in `.env` file
4. Check PostgreSQL logs for errors

**Migration issues:**
```bash
# Reset and recreate migrations
npm run db:reset

# Or manually reset
npx prisma migrate reset
npx prisma migrate dev
```

**Port conflicts:**
- PostgreSQL default port: 5432
- Next.js development server: 3000
- Prisma Studio: 5555

**Build issues:**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Performance Issues

**Slow page loads:**
- Check database query performance
- Optimize images and assets
- Enable caching strategies
- Monitor server resources

**Memory issues:**
- Check for memory leaks in components
- Optimize database queries
- Monitor server memory usage

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests and linting:**
   ```bash
   npm run lint
   ```
5. **Commit your changes:**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to your branch:**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Submit a pull request**

### Development Guidelines

- Follow TypeScript best practices
- Use meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed
- Follow the existing code style

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Vercel** for the deployment platform
- **Prisma Team** for the excellent ORM
- **Radix UI** for accessible components
- **Tailwind CSS** for the utility-first CSS framework

## 📞 Support

If you encounter any issues or have questions:

1. **Check the troubleshooting section above**
2. **Search existing issues** in the repository
3. **Create a new issue** with detailed information
4. **Join our community** discussions

---

**Made with ❤️ by the FlavorShare Team**

*Share your culinary masterpieces with the world!*
