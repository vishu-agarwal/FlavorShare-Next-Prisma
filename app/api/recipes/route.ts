import { NextResponse, NextRequest } from "next/server"

export async function GET() {
  try {
    // Check if we're in a build environment or if DATABASE_URL is not available
    if (!process.env.DATABASE_URL) {
      // Return empty array for build-time static analysis
      return NextResponse.json([])
    }

    // Dynamic import to avoid build-time issues
    const { prisma } = await import("@/lib/prisma")

    const recipes = await prisma.recipe.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
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
        ratings: true,
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
          take: 5,
        },
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

    const recipesWithRating = recipes.map((recipe: any) => ({
      ...recipe,
      averageRating:
        recipe.ratings.length > 0
          ? recipe.ratings.reduce((sum: number, rating: any) => sum + rating.value, 0) / recipe.ratings.length
          : 0,
    }))

    return NextResponse.json(recipesWithRating)
  } catch (error: any) {
    console.error("Error fetching recipes:", error)
    
    // Handle specific Prisma errors
    if (error.code === "P1001" || error.code === "P1002") {
      return NextResponse.json({ error: "Database connection failed" }, { status: 503 })
    }
    
    return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      prepTime,
      cookTime,
      servings,
      difficulty,
      instructions,
      ingredients,
      categories,
      authorId,
    } = body

    // Validate required fields
    if (!title || !description || !authorId) {
      return NextResponse.json(
        { error: "Missing required fields: title, description, authorId" },
        { status: 400 }
      )
    }

    // Dynamic import to avoid build-time issues
    const { prisma } = await import("@/lib/prisma")

    // Find categories by slug
    const categoryConnections = []
    if (categories && categories.length > 0) {
      for (const categorySlug of categories) {
        const category = await prisma.category.findUnique({
          where: { slug: categorySlug },
        })
        if (category) {
          categoryConnections.push({
            category: { connect: { id: category.id } },
          })
        }
      }
    }

    const recipe = await prisma.recipe.create({
      data: {
        title,
        description,
        prepTime: Number.parseInt(prepTime),
        cookTime: Number.parseInt(cookTime),
        servings: Number.parseInt(servings),
        difficulty: difficulty.toUpperCase(),
        instructions,
        authorId,
        ingredients: {
          create: ingredients.map((ing: any) => ({
            quantity: ing.quantity,
            unit: ing.unit,
            ingredient: {
              connectOrCreate: {
                where: { name: ing.name },
                create: { name: ing.name },
              },
            },
          })),
        },
        categories: {
          create: categoryConnections,
        },
      },
      include: {
        author: true,
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
      },
    })

    return NextResponse.json(recipe, { status: 201 })
  } catch (error) {
    console.error("Error creating recipe:", error)
    return NextResponse.json(
      { error: "Failed to create recipe", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
