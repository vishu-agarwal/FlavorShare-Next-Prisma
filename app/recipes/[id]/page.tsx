import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Users, ChefHat, Star, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { generateMetadata as generateSEOMetadata, generateRecipeStructuredData } from "@/lib/seo"
import { SEO } from "@/components/seo"
import type { Metadata } from "next"

// Add ISR for better performance
export const revalidate = 3600 // Revalidate every hour

// Generate static params for better performance
export async function generateStaticParams() {
  const recipes = await prisma.recipe.findMany({
    select: { id: true },
    take: 100, // Generate static pages for first 100 recipes
  })

  return recipes.map((recipe: { id: string }) => ({
    id: recipe.id,
  }))
}

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

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const recipe = await getRecipe(params.id)
  
  if (!recipe) {
    return {
      title: 'Recipe Not Found',
      description: 'The requested recipe could not be found.',
    }
  }

  const categories = recipe.categories.map((cat: { category: { name: any } }) => cat.category.name).join(', ')
  const keywords = [
    recipe.title,
    'recipe',
    'cooking',
    'food',
    ...recipe.categories.map((cat: { category: { name: any } }) => cat.category.name),
    recipe.difficulty,
    `${recipe.prepTime + recipe.cookTime} minutes`,
    `${recipe.servings} servings`,
  ]

  return generateSEOMetadata({
    title: recipe.title,
    description: recipe.description,
    keywords,
    image: '/placeholder.jpg',
    url: `/recipes/${recipe.id}`,
    type: 'recipe',
    publishedTime: recipe.createdAt,
    modifiedTime: recipe.updatedAt,
    author: recipe.author.name,
    section: categories,
    tags: recipe.categories.map((cat: { category: { name: any } }) => cat.category.name),
  })
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

  const structuredData = generateRecipeStructuredData(recipe)
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Recipes', url: '/recipes' },
    { name: recipe.title, url: `/recipes/${recipe.id}` },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Header />
      <SEO structuredData={structuredData} breadcrumbs={breadcrumbs} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Back Button */}
        <Link href="/recipes" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm sm:text-base">Back to Recipes</span>
        </Link>

        {/* Recipe Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-8 mb-6">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
            {/* Recipe Image */}
            <div className="lg:w-1/2">
              <div className="aspect-video bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center">
                <ChefHat className="h-16 w-16 sm:h-24 sm:w-24 text-orange-400" />
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

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">{recipe.title}</h1>
              <p className="text-gray-600 mb-4 sm:mb-6">{recipe.description}</p>

              {/* Recipe Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4 sm:mb-6">
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
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 sm:h-5 sm:w-5 ${star <= recipe.averageRating ? "text-yellow-400 fill-current" : "text-gray-300"
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
                <CardTitle className="text-lg sm:text-xl">Ingredients</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient: any) => (
                    <li key={ingredient.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <span className="font-medium">{ingredient.ingredient.name}</span>
                      <span className="text-gray-500 text-sm">
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
                <CardTitle className="text-lg sm:text-xl">Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  {recipe.instructions.map((instruction: string, index: number) => (
                    <li key={index} className="flex gap-3 sm:gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 pt-1 leading-relaxed">{instruction}</p>
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
              <CardTitle className="text-lg sm:text-xl">Comments ({recipe.comments.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recipe.comments.map((comment: any) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="w-8 h-8 flex-shrink-0">
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
                      <p className="text-gray-700 text-sm leading-relaxed">{comment.content}</p>
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
