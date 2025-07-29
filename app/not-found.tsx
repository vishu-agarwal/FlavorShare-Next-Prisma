import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChefHat, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <ChefHat className="h-24 w-24 text-orange-400 mx-auto mb-4" />
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Recipe Not Found</h2>
          <p className="text-gray-600 mb-8">Oops! The recipe you're looking for seems to have been eaten already.</p>
        </div>

        <div className="space-y-4">
          <Link href="/">
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div>
            <Link href="/recipes" className="text-orange-600 hover:text-orange-700">
              Browse all recipes
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
