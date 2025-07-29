'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Loader2 } from 'lucide-react'

interface RecipeFiltersProps {
  categories: Array<{ id: string; name: string; slug: string }>
}

export function RecipeFilters({ categories }: RecipeFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [category, setCategory] = useState(searchParams.get('category') || 'all')
  const [difficulty, setDifficulty] = useState(searchParams.get('difficulty') || 'all')
  const [isLoading, setIsLoading] = useState(false)

  // Update URL when filters change
  const updateFilters = async () => {
    setIsLoading(true)
    
    const params = new URLSearchParams()
    
    if (search) params.set('search', search)
    if (category && category !== 'all') params.set('category', category)
    if (difficulty && difficulty !== 'all') params.set('difficulty', difficulty)
    
    const queryString = params.toString()
    const newUrl = queryString ? `/recipes?${queryString}` : '/recipes'
    
    try {
      await router.push(newUrl, { scroll: false })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateFilters()
  }

  // Auto-update on input change (optional - you can remove this if you prefer manual submission)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (search !== (searchParams.get('search') || '')) {
        updateFilters()
      }
    }, 500) // Debounce search input

    return () => clearTimeout(timeoutId)
  }, [search])

  // Update local state when URL params change
  useEffect(() => {
    setSearch(searchParams.get('search') || '')
    setCategory(searchParams.get('category') || 'all')
    setDifficulty(searchParams.get('difficulty') || 'all')
  }, [searchParams])

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative sm:col-span-2 lg:col-span-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search recipes..."
            className="pl-10 h-12"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={isLoading}
          />
        </div>
        
        <Select value={category} onValueChange={setCategory} disabled={isLoading}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.slug}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={difficulty} onValueChange={setDifficulty} disabled={isLoading}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="flex gap-2">
          <Button 
            type="submit" 
            className="bg-orange-600 hover:bg-orange-700 h-12 flex-1"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Applying...
              </>
            ) : (
              'Apply Filters'
            )}
          </Button>
          <Button 
            type="button" 
            variant="outline"
            className="h-12 px-4"
            disabled={isLoading}
            onClick={() => {
              setSearch('')
              setCategory('all')
              setDifficulty('all')
              router.push('/recipes', { scroll: false })
            }}
          >
            Clear
          </Button>
        </div>
      </form>
    </div>
  )
} 