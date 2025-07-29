import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id: params.id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
            bio: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
        ingredients: {
          include: {
            ingredient: true,
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
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 })
    }

    const averageRating =
      recipe.ratings.length > 0
        ? recipe.ratings.reduce((sum: number, rating: any) => sum + rating.value, 0) / recipe.ratings.length
        : 0

    return NextResponse.json({
      ...recipe,
      averageRating,
    })
  } catch (error) {
    console.error("Error fetching recipe:", error)
    return NextResponse.json({ error: "Failed to fetch recipe" }, { status: 500 })
  }
}
