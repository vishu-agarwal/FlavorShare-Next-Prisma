import { ChefHat } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
      <div className="text-center">
        <ChefHat className="h-16 w-16 text-orange-600 mx-auto mb-4 animate-pulse" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Cooking up something delicious...</h2>
        <p className="text-gray-600">Please wait while we prepare your content.</p>
      </div>
    </div>
  )
}
