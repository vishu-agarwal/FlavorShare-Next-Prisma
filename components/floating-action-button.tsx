"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function FloatingActionButton() {
  const pathname = usePathname()
  
  // Hide the button on the add-recipe page
  if (pathname === "/add-recipe") {
    return null
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      <Link href="/add-recipe">
        <Button
          size="lg"
          className="h-14 w-14 rounded-full bg-orange-600 hover:bg-orange-700 shadow-lg"
        >
          <Plus className="h-6 w-6" />
          <span className="sr-only">Add Recipe</span>
        </Button>
      </Link>
    </div>
  )
} 