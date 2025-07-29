import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { FloatingActionButton } from "@/components/floating-action-button"
import { SEO } from "@/components/seo"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "FlavorShare - Share Your Favorite Recipes",
    template: "%s | FlavorShare"
  },
  description: "Discover and share amazing recipes from home cooks around the world. Join our community of food lovers and explore thousands of delicious recipes.",
  keywords: [
    "recipes",
    "cooking",
    "food",
    "home cooking",
    "recipe sharing",
    "culinary",
    "kitchen",
    "cooking community",
    "food lovers",
    "recipe discovery"
  ],
  authors: [{ name: "FlavorShare Team" }],
  creator: "FlavorShare",
  publisher: "FlavorShare",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://flavorshare.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'FlavorShare - Share Your Favorite Recipes',
    description: 'Discover and share amazing recipes from home cooks around the world. Join our community of food lovers and explore thousands of delicious recipes.',
    siteName: 'FlavorShare',
    images: [
      {
        url: '/placeholder.jpg',
        width: 1200,
        height: 630,
        alt: 'FlavorShare - Recipe Sharing Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FlavorShare - Share Your Favorite Recipes',
    description: 'Discover and share amazing recipes from home cooks around the world.',
    images: ['/placeholder.jpg'],
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
  category: 'food and drink',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/placeholder-logo.svg" />
        <link rel="apple-touch-icon" href="/placeholder-logo.svg" />
        <meta name="theme-color" content="#ea580c" />
        <meta name="msapplication-TileColor" content="#ea580c" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <SEO />
        {children}
        <FloatingActionButton />
        <Toaster />
      </body>
    </html>
  )
}
