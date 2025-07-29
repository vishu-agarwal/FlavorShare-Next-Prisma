'use client'

import Script from 'next/script'
import { RecipeData } from '@/lib/seo'

interface SEOProps {
  structuredData?: any
  recipe?: RecipeData
  breadcrumbs?: Array<{ name: string; url: string }>
}

export function SEO({ structuredData, recipe, breadcrumbs }: SEOProps) {
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FlavorShare',
    description: 'A social platform for sharing and discovering amazing recipes',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://flavorshare.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://flavorshare.com'}/recipes?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FlavorShare',
    description: 'A social platform for sharing and discovering amazing recipes',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://flavorshare.com',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://flavorshare.com'}/placeholder-logo.png`,
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

  return (
    <>
      {/* Website Structured Data */}
      <Script
        id="website-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData),
        }}
      />

      {/* Organization Structured Data */}
      <Script
        id="organization-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData),
        }}
      />

      {/* Custom Structured Data */}
      {structuredData && (
        <Script
          id="custom-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}

      {/* Breadcrumb Structured Data */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Script
          id="breadcrumb-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: breadcrumbs.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: item.name,
                item: item.url,
              })),
            }),
          }}
        />
      )}
    </>
  )
} 