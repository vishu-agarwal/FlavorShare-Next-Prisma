import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check if we're in a build environment or if DATABASE_URL is not available
    if (!process.env.DATABASE_URL) {
      // Return 404 for build-time static analysis
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 })
    }

    // Dynamic import to avoid build-time issues
    const { prisma } = await import("@/lib/prisma")

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
  } catch (error: any) {
    console.error("Error fetching recipe:", error)
    
    // Handle specific Prisma errors
    if (error.code === "P1001" || error.code === "P1002") {
      return NextResponse.json({ error: "Database connection failed" }, { status: 503 })
    }
    
    return NextResponse.json({ error: "Failed to fetch recipe" }, { status: 500 })
  }
}
