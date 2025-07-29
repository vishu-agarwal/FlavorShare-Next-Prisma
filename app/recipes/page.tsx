import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Users, ChefHat, Star, Search } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"

async function getRecipes(searchParams: any) {
  const { search, category, difficulty } = searchParams

  const recipes = await prisma.recipe.findMany({
    where: {
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      }),
      ...(category && category !== "all" && {
        categories: {
          some: {
            category: {
              slug: category,
            },
          },
        },
      }),
      ...(difficulty && difficulty !== "all" && {
        difficulty: difficulty.toUpperCase(),
      }),
    },
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
  })

  return recipes.map((recipe: any) => ({
    ...recipe,
    averageRating:
      recipe.ratings.length > 0
        ? recipe.ratings.reduce((sum: number, rating: any) => sum + rating.value, 0) / recipe.ratings.length
        : 0,
  }))
}

async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { name: "asc" },
  })
}

export default async function RecipesPage({
  searchParams,
}: {
  searchParams: { search?: string; category?: string; difficulty?: string }
}) {
  const recipes = await getRecipes(searchParams)
  const categories = await getCategories()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Header currentPage="/recipes" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">All Recipes</h1>
          <p className="text-lg sm:text-xl text-gray-600">Discover amazing recipes from our community</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
          <form method="GET" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative sm:col-span-2 lg:col-span-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search recipes..."
                className="pl-10 h-12"
                defaultValue={searchParams.search}
                name="search"
              />
            </div>
            <Select name="category" defaultValue={searchParams.category || "all"}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category: any) => (
                  <SelectItem key={category.id} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select name="difficulty" defaultValue={searchParams.difficulty || "all"}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit" className="bg-orange-600 hover:bg-orange-700 h-12">
              Apply Filters
            </Button>
          </form>
        </div>

        {/* Results */}
        <div className="mb-4 sm:mb-6">
          <p className="text-gray-600">
            Found {recipes.length} recipe{recipes.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Recipe Grid */}
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

        {recipes.length === 0 && (
          <div className="text-center py-12">
            <ChefHat className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No recipes found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria or browse all recipes.</p>
            <Link href="/add-recipe">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                Share Your First Recipe
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
