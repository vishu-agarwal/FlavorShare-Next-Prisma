"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChefHat, RefreshCw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-6 sm:mb-8">
          <ChefHat className="h-16 w-16 sm:h-24 sm:w-24 text-orange-400 mx-auto mb-4" />
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Oops! Something went wrong</h1>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
            We encountered an error while preparing your content. Don't worry, it happens to the best chefs!
          </p>
        </div>

        <Button onClick={reset} className="bg-orange-600 hover:bg-orange-700 h-12 px-6">
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      </div>
    </div>
  )
}
