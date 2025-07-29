import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChefHat, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-6 sm:mb-8">
          <ChefHat className="h-16 w-16 sm:h-24 sm:w-24 text-orange-400 mx-auto mb-4" />
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-3 sm:mb-4">404</h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">Recipe Not Found</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">Oops! The recipe you're looking for seems to have been eaten already.</p>
        </div>

        <div className="space-y-4">
          <Link href="/">
            <Button className="bg-orange-600 hover:bg-orange-700 h-12 px-6">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div>
            <Link href="/recipes" className="text-orange-600 hover:text-orange-700 text-sm sm:text-base">
              Browse all recipes
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
