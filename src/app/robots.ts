import type { MetadataRoute } from 'next'

const siteUrl = 'https://chlouhin-exlk.vercel.app'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard', '/settings', '/admin'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
