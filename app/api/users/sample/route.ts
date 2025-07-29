import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Check if we're in a build environment or if DATABASE_URL is not available
    if (!process.env.DATABASE_URL) {
      // Return placeholder user for build-time static analysis
      return NextResponse.json({
        id: "placeholder-user-id",
        email: "chef@flavorshare.com",
        name: "Chef Maria",
        bio: "Passionate home cook sharing family recipes",
        avatar: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    }

    // Get or create a sample user for demo purposes
    let user = await prisma.user.findFirst({
      where: { email: "chef@flavorshare.com" },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: "chef@flavorshare.com",
          name: "Chef Maria",
          bio: "Passionate home cook sharing family recipes",
        },
      })
    }

    return NextResponse.json(user)
  } catch (error: any) {
    console.error("Error getting sample user:", error)
    
    // Handle specific Prisma errors
    if (error.code === "P1001" || error.code === "P1002") {
      return NextResponse.json({ error: "Database connection failed" }, { status: 503 })
    }
    
    return NextResponse.json({ error: "Failed to get user" }, { status: 500 })
  }
}
