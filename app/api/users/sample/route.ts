import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
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
  } catch (error) {
    console.error("Error getting sample user:", error)
    return NextResponse.json({ error: "Failed to get user" }, { status: 500 })
  }
}
