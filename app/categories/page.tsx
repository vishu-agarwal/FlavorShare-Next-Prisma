import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChefHat, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"

async function getCategories() {
  return await prisma.category.findMany({
    include: {
      _count: {
        select: {
          recipes: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  })
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Header currentPage="/categories" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Recipe Categories</h1>
          <p className="text-lg sm:text-xl text-gray-600">Browse recipes by category</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((category: any) => (
            <Link key={category.id} href={`/recipes?category=${category.slug}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ChefHat className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl text-center group-hover:text-orange-600 transition-colors">
                    {category.name}
                  </CardTitle>
                  <CardDescription className="text-center">
                    {category._count.recipes} recipe{category._count.recipes !== 1 ? "s" : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Badge variant="secondary" className="text-sm">
                    {category._count.recipes} recipes
                  </Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-12">
            <ChefHat className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No categories found</h3>
            <p className="text-gray-600">Categories will appear here once recipes are added.</p>
          </div>
        )}
      </div>
    </div>
  )
}
