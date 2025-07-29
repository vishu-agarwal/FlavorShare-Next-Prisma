import Link from "next/link"
import { ChefHat } from "lucide-react"
import { MobileNav } from "./mobile-nav"

interface HeaderProps {
  currentPage?: string
}

export function Header({ currentPage }: HeaderProps) {
  const navItems = [
    { href: "/recipes", label: "Recipes" },
    { href: "/categories", label: "Categories" },
    { href: "/add-recipe", label: "Share Recipe" },
  ]

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <ChefHat className="h-8 w-8 text-orange-600" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">FlavorShare</h1>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  currentPage === item.href
                    ? "text-orange-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <MobileNav />
        </div>
      </div>
    </header>
  )
} 