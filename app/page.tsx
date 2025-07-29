import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, ChefHat, Star } from "lucide-react"
import Link from "next/link"

async function getRecipes() {
  const recipes = await prisma.recipe.findMany({
    include: {
      author: true,
      categories: {
        include: {
          category: true,
        },
      },
      ratings: true,
      _count: {
        select: {
          comments: true,
          ratings: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 12,
  })

  return recipes.map((recipe: any) => ({
    ...recipe,
    averageRating:
      recipe.ratings.length > 0
        ? recipe.ratings.reduce((sum: number, rating: any) => sum + rating.value, 0) / recipe.ratings.length
        : 0,
  }))
}

export default async function Home() {
  const recipes = await getRecipes()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <ChefHat className="h-8 w-8 text-orange-600" />
              <h1 className="text-2xl font-bold text-gray-900">FlavorShare</h1>
            </div>
            <nav className="flex items-center gap-6">
              <Link href="/recipes" className="text-gray-600 hover:text-gray-900">
                Recipes
              </Link>
              <Link href="/categories" className="text-gray-600 hover:text-gray-900">
                Categories
              </Link>
              <Link href="/add-recipe" className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700">
                Share Recipe
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Share Your Culinary
            <span className="text-orange-600"> Masterpieces</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Discover amazing recipes from home cooks around the world. Share your favorites and get inspired by others.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/recipes"
              className="bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-700"
            >
              Explore Recipes
            </Link>
            <Link
              href="/add-recipe"
              className="border-2 border-orange-600 text-orange-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-50"
            >
              Share Your Recipe
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Latest Recipes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.map((recipe: any) => (
              <Link key={recipe.id} href={`/recipes/${recipe.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                  <div className="aspect-video bg-gradient-to-br from-orange-100 to-red-100 rounded-t-lg flex items-center justify-center">
                    <ChefHat className="h-12 w-12 text-orange-400" />
                  </div>
                  <CardHeader className="pb-2 flex-shrink-0">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg line-clamp-2">{recipe.title}</CardTitle>
                      {recipe.averageRating > 0 && (
                        <div className="flex items-center gap-1 text-sm text-yellow-600">
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
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
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
      <footer className="bg-gray-900 text-white py-12">
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
