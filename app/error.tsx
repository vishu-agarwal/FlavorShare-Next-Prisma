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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <ChefHat className="h-24 w-24 text-orange-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h1>
          <p className="text-gray-600 mb-8">
            We encountered an error while preparing your content. Don't worry, it happens to the best chefs!
          </p>
        </div>

        <Button onClick={reset} className="bg-orange-600 hover:bg-orange-700">
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      </div>
    </div>
  )
}
