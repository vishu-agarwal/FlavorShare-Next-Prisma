import { cachedQueries } from "@/lib/cache"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Users, ChefHat, Star } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { generateMetadata as generateSEOMetadata } from "@/lib/seo"
import type { Metadata } from "next"

// Add ISR (Incremental Static Regeneration)
export const revalidate = 3600 // Revalidate every hour

async function getRecipes() {
  try {
    // Check if we're in a build environment or if DATABASE_URL is not available
    if (!process.env.DATABASE_URL) {
      return []
    }

    const recipes = await cachedQueries.getRecipes(12) as any[]

    return recipes.map((recipe: any) => ({
      ...recipe,
      averageRating:
        recipe.ratings.length > 0
          ? recipe.ratings.reduce((sum: number, rating: any) => sum + rating.value, 0) / recipe.ratings.length
          : 0,
    }))
  } catch (error) {
    console.error("Error fetching recipes:", error)
    return []
  }
}

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata({
    title: "FlavorShare - Share Your Favorite Recipes",
    description: "Discover and share amazing recipes from home cooks around the world. Join our community of food lovers and explore thousands of delicious recipes.",
    keywords: [
      "recipes",
      "cooking",
      "food",
      "home cooking",
      "recipe sharing",
      "culinary",
      "kitchen",
      "cooking community",
      "food lovers",
      "recipe discovery",
      "home chefs",
      "cooking inspiration"
    ],
    url: "/",
    type: "website",
  })
}

export default async function Home() {
  const recipes = await getRecipes()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Header />

      {/* Hero Section */}
      <section className="py-12 sm:py-20 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Share Your Culinary
            <span className="text-orange-600"> Masterpieces</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Discover amazing recipes from home cooks around the world. Share your favorites and get inspired by others.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/recipes">
              <Button size="lg" className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-lg font-semibold px-8 py-3">
                Explore Recipes
              </Button>
            </Link>
            <Link href="/add-recipe">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg font-semibold px-8 py-3 border-2 border-orange-600 text-orange-600 hover:bg-orange-50">
                Share Your Recipe
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Latest Recipes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {recipes.map((recipe: any) => (
              <Link key={recipe.id} href={`/recipes/${recipe.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col group">
                  <div className="aspect-video bg-gradient-to-br from-orange-100 to-red-100 rounded-t-lg flex items-center justify-center">
                    <ChefHat className="h-8 w-8 sm:h-12 sm:w-12 text-orange-400" />
                  </div>
                  <CardHeader className="pb-2 flex-shrink-0">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-base sm:text-lg line-clamp-2 group-hover:text-orange-600 transition-colors">
                        {recipe.title}
                      </CardTitle>
                      {recipe.averageRating > 0 && (
                        <div className="flex items-center gap-1 text-sm text-yellow-600 flex-shrink-0 ml-2">
                          <Star className="h-4 w-4 fill-current" />
                          <span>{recipe.averageRating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                    <CardDescription className="line-clamp-3 text-sm">
                      {recipe.description.length > 120 ? (
                        <>
                          {recipe.description.substring(0, 120)}...
                          <span className="text-orange-600 font-medium ml-1">Read more</span>
                        </>
                      ) : (
                        recipe.description
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-end">
                    <div className="flex items-center gap-3 sm:gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{recipe.prepTime + recipe.cookTime}m</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{recipe.servings}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {recipe.categories.slice(0, 2).map((cat: any) => (
                        <Badge key={cat.category.id} variant="secondary" className="text-xs">
                          {cat.category.name}
                        </Badge>
                      ))}
                      <Badge variant="outline" className="text-xs">
                        {recipe.difficulty.toLowerCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      by <span className="font-medium">{recipe.author.name}</span>
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <ChefHat className="h-6 w-6 text-orange-400" />
            <span className="text-xl font-bold">FlavorShare</span>
          </div>
          <p className="text-center text-gray-400">Bringing food lovers together, one recipe at a time.</p>
        </div>
      </footer>
    </div>
  )
}
