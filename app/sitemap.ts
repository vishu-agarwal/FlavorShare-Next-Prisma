import { prisma } from "@/lib/prisma"
import { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://flavorshare.com'

  // Get all recipes
  const recipes = await prisma.recipe.findMany({
    select: {
      id: true,
      updatedAt: true,
    },
  })

  // Get all categories
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      updatedAt: true,
    },
  })

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/recipes`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/add-recipe`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  // Recipe pages
  const recipePages = recipes.map((recipe: { id: any; updatedAt: any }) => ({
    url: `${baseUrl}/recipes/${recipe.id}`,
    lastModified: recipe.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Category pages
  const categoryPages = categories.map((category: { id: any; updatedAt: any }) => ({
    url: `${baseUrl}/categories/${category.id}`,
    lastModified: category.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...recipePages, ...categoryPages]
} 