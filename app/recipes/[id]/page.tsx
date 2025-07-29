import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Users, ChefHat, Star, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

async function getRecipe(id: string) {
  const recipe = await prisma.recipe.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          avatar: true,
          bio: true,
        },
      },
      ingredients: {
        include: {
          ingredient: true,
        },
      },
      categories: {
        include: {
          category: true,
        },
      },
      ratings: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      comments: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  })

  if (!recipe) {
    return null
  }

  const averageRating =
    recipe.ratings.length > 0
      ? recipe.ratings.reduce((sum: number, rating: any) => sum + rating.value, 0) / recipe.ratings.length
      : 0

  return {
    ...recipe,
    averageRating,
  }
}

export default async function RecipeDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const recipe = await getRecipe(params.id)

  if (!recipe) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <ChefHat className="h-8 w-8 text-orange-600" />
              <h1 className="text-2xl font-bold text-gray-900">FlavorShare</h1>
            </Link>
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/recipes" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Recipes
        </Link>

        {/* Recipe Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Recipe Image */}
            <div className="lg:w-1/2">
              <div className="aspect-video bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center">
                <ChefHat className="h-24 w-24 text-orange-400" />
              </div>
            </div>

            {/* Recipe Info */}
            <div className="lg:w-1/2">
              <div className="flex flex-wrap gap-2 mb-4">
                {recipe.categories.map((cat: any) => (
                  <Badge key={cat.category.id} variant="secondary">
                    {cat.category.name}
                  </Badge>
                ))}
                <Badge variant="outline">{recipe.difficulty.toLowerCase()}</Badge>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{recipe.title}</h1>
              <p className="text-gray-600 mb-6">{recipe.description}</p>

              {/* Recipe Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div className="text-sm text-gray-500">Prep Time</div>
                  <div className="font-semibold">{recipe.prepTime}m</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div className="text-sm text-gray-500">Cook Time</div>
                  <div className="font-semibold">{recipe.cookTime}m</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
                    <Users className="h-4 w-4" />
                  </div>
                  <div className="text-sm text-gray-500">Servings</div>
                  <div className="font-semibold">{recipe.servings}</div>
                </div>
              </div>

              {/* Rating */}
              {recipe.averageRating > 0 && (
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${star <= recipe.averageRating ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {recipe.averageRating.toFixed(1)} ({recipe.ratings.length} review
                    {recipe.ratings.length !== 1 ? "s" : ""})
                  </span>
                </div>
              )}

              {/* Author */}
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={recipe.author.avatar || undefined} />
                  <AvatarFallback>{recipe.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{recipe.author.name}</div>
                  {recipe.author.bio && <div className="text-sm text-gray-500">{recipe.author.bio}</div>}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Ingredients */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Ingredients</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient: any) => (
                    <li key={ingredient.id} className="flex justify-between">
                      <span>{ingredient.ingredient.name}</span>
                      <span className="text-gray-500">
                        {ingredient.quantity} {ingredient.unit}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Instructions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  {recipe.instructions.map((instruction: string, index: number) => (
                    <li key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 pt-1">{instruction}</p>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Comments Section */}
        {recipe.comments.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Comments ({recipe.comments.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recipe.comments.map((comment: any) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={comment.user.avatar || undefined} />
                      <AvatarFallback className="text-xs">{comment.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{comment.user.name}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
