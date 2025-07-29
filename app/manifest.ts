import { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FlavorShare - Share Your Favorite Recipes",
    short_name: "FlavorShare",
    description: "A social platform for sharing and discovering amazing recipes",
    start_url: "/",
    display: "standalone",
    background_color: "#fef7ed",
    theme_color: "#ea580c",
    orientation: "portrait",
    icons: [
      {
        src: "/placeholder-logo.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
      {
        src: "/placeholder-logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/placeholder-logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["food", "lifestyle", "social"],
    lang: "en",
    dir: "ltr",
    scope: "/",
    prefer_related_applications: false,
  }
} 