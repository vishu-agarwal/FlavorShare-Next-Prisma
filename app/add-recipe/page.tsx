import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChefHat, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { generateMetadata as generateSEOMetadata } from "@/lib/seo"
import type { Metadata } from "next"

let AddRecipeForm: React.ComponentType | undefined
try {
  // Dynamically import to avoid build errors if the file is missing
  AddRecipeForm = require("@/components/add-recipe-form").AddRecipeForm
} catch (e) {
  // Fallback if the component is missing
  AddRecipeForm = () => <div>Recipe form component not found.</div>
}

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata({
    title: "Share Your Recipe",
    description: "Share your favorite recipe with the FlavorShare community. Create and publish your culinary masterpieces for food lovers around the world.",
    keywords: [
      "share recipe",
      "recipe creation",
      "cooking community",
      "recipe sharing",
      "culinary",
      "home cooking",
      "recipe publishing",
      "food lovers",
      "cooking platform"
    ],
    url: "/add-recipe",
    type: "website",
  })
}

export default function AddRecipePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Header currentPage="/add-recipe" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Back Button */}
        <Link href="/recipes" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm sm:text-base">Back to Recipes</span>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">Share Your Recipe</CardTitle>
            <CardDescription>Share your favorite recipe with the FlavorShare community</CardDescription>
          </CardHeader>
          <CardContent>
            {AddRecipeForm && <AddRecipeForm />}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
