import { Metadata } from 'next'

export interface RecipeData {
  id: string
  title: string
  description: string
  author: {
    name: string
    avatar?: string
  }
  prepTime: number
  cookTime: number
  servings: number
  difficulty: string
  categories: Array<{
    category: {
      name: string
    }
  }>
  ingredients: Array<{
    ingredient: {
      name: string
    }
    quantity: number
    unit: string
  }>
  instructions: string[]
  averageRating: number
  ratings: Array<{
    value: number
  }>
  createdAt: string
  updatedAt: string
}

export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'recipe'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    image = '/placeholder.jpg',
    url,
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
    section,
    tags = []
  } = config

  const fullTitle = title.includes('FlavorShare') ? title : `${title} | FlavorShare`
  const fullDescription = description.length > 160 ? description.substring(0, 157) + '...' : description

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: keywords.join(', '),
    authors: author ? [{ name: author }] : undefined,
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: url,
      siteName: 'FlavorShare',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: type === 'recipe' ? 'article' : type,
      publishedTime,
      modifiedTime,
      authors: author ? [author] : undefined,
      section,
      tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [image],
      creator: '@flavorshare',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
    },
    alternates: {
      canonical: url,
    },
  }
}

export function generateRecipeStructuredData(recipe: RecipeData) {
  const ingredients = recipe.ingredients.map(ing => ({
    '@type': 'HowToSupply',
    name: ing.ingredient.name,
    amount: `${ing.quantity} ${ing.unit}`,
  }))

  const instructions = recipe.instructions.map((instruction, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    text: instruction,
  }))

  const aggregateRating = recipe.ratings.length > 0 ? {
    '@type': 'AggregateRating',
    ratingValue: recipe.averageRating,
    ratingCount: recipe.ratings.length,
    bestRating: 5,
    worstRating: 1,
  } : undefined

  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    description: recipe.description,
    author: {
      '@type': 'Person',
      name: recipe.author.name,
    },
    datePublished: recipe.createdAt,
    dateModified: recipe.updatedAt,
    prepTime: `PT${recipe.prepTime}M`,
    cookTime: `PT${recipe.cookTime}M`,
    totalTime: `PT${recipe.prepTime + recipe.cookTime}M`,
    recipeYield: `${recipe.servings} servings`,
    recipeCategory: recipe.categories.map(cat => cat.category.name).join(', '),
    recipeCuisine: 'International',
    recipeDifficulty: recipe.difficulty,
    aggregateRating,
    recipeIngredient: ingredients,
    recipeInstructions: instructions,
    nutrition: {
      '@type': 'NutritionInformation',
    },
    suitableForDiet: ['Vegetarian', 'GlutenFree'],
    image: '/placeholder.jpg',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/recipes/${recipe.id}`,
  }
}

export function generateWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FlavorShare',
    description: 'A social platform for sharing and discovering amazing recipes',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL}/recipes?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FlavorShare',
    description: 'A social platform for sharing and discovering amazing recipes',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    logo: `${process.env.NEXT_PUBLIC_SITE_URL}/placeholder-logo.png`,
    sameAs: [
      'https://twitter.com/flavorshare',
      'https://facebook.com/flavorshare',
      'https://instagram.com/flavorshare',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'support@flavorshare.com',
    },
  }
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
} 