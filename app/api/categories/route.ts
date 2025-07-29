import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Check if we're in a build environment or if DATABASE_URL is not available
    if (!process.env.DATABASE_URL) {
      // Return empty array for build-time static analysis
      return NextResponse.json([])
    }

    const categories = await prisma.category.findMany({
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

    return NextResponse.json(categories)
  } catch (error: any) {
    console.error("Error fetching categories:", error)
    
    // Handle specific Prisma errors
    if (error.code === "P1001" || error.code === "P1002") {
      return NextResponse.json({ error: "Database connection failed" }, { status: 503 })
    }
    
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}
