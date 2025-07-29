import { ChefHat } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <ChefHat className="h-12 w-12 sm:h-16 sm:w-16 text-orange-600 mx-auto mb-4 animate-pulse" />
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Cooking up something delicious...</h2>
        <p className="text-sm sm:text-base text-gray-600">Please wait while we prepare your content.</p>
      </div>
    </div>
  )
}
