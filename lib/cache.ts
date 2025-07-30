// Simple in-memory cache for development
const cache = new Map<string, { data: any; timestamp: number; ttl: number }>()

export async function cachedQuery<T>(
  key: string,
  queryFn: () => Promise<T>,
  ttl: number = 300000 // 5 minutes default
): Promise<T> {
  const now = Date.now()
  const cached = cache.get(key)

  // Return cached data if it's still valid
  if (cached && (now - cached.timestamp) < cached.ttl) {
    return cached.data
  }

  // Execute query and cache result
  const data = await queryFn()
  cache.set(key, { data, timestamp: now, ttl })

  return data
}

// Cache keys for common queries
export const CACHE_KEYS = {
  RECIPES: 'recipes',
  RECIPE: (id: string) => `recipe:${id}`,
  CATEGORIES: 'categories',
  CATEGORY: (slug: string) => `category:${slug}`,
  USER: (id: string) => `user:${id}`,
  RECIPE_COUNT: 'recipe_count',
  CATEGORY_COUNT: 'category_count',
} as const

// Predefined cached queries
export const cachedQueries = {
  async getRecipes(limit: number = 12) {
    return cachedQuery(
      `${CACHE_KEYS.RECIPES}:${limit}`,
      async () => {
        const { prisma } = await import('./prisma')
        return prisma.recipe.findMany({
          include: {
            author: true,
            categories: {
              include: {
                category: true,
              },
            },
            ratings: true,
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
          take: limit,
        })
      },
      1800000 // 30 minutes
    )
  },

  async getRecipe(id: string) {
    return cachedQuery(
      CACHE_KEYS.RECIPE(id),
      async () => {
        const { prisma } = await import('./prisma')
        return prisma.recipe.findUnique({
          where: { id },
          include: {
            author: {
              select: {
                id: true,
                name: true,
                avatar: true,
                bio: true,
              },
            },
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
      },
      3600000 // 1 hour
    )
  },

  async getCategories() {
    return cachedQuery(
      CACHE_KEYS.CATEGORIES,
      async () => {
        const { prisma } = await import('./prisma')
        return prisma.category.findMany({
          orderBy: { name: "asc" },
        })
      },
      3600000 // 1 hour
    )
  },

  async getRecipeCount() {
    return cachedQuery(
      CACHE_KEYS.RECIPE_COUNT,
      async () => {
        const { prisma } = await import('./prisma')
        return prisma.recipe.count()
      },
      1800000 // 30 minutes
    )
  },
}

// Clear cache for specific keys
export function clearCache(pattern: string) {
  for (const key of cache.keys()) {
    if (key.includes(pattern)) {
      cache.delete(key)
    }
  }
}

// Clear all cache
export function clearAllCache() {
  cache.clear()
}

// Get cache stats
export function getCacheStats() {
  const now = Date.now()
  let validEntries = 0
  let expiredEntries = 0

  for (const entry of cache.values()) {
    if ((now - entry.timestamp) < entry.ttl) {
      validEntries++
    } else {
      expiredEntries++
    }
  }

  return {
    total: cache.size,
    valid: validEntries,
    expired: expiredEntries,
  }
} 