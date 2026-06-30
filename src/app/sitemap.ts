import type { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

const siteUrl = 'https://chlouhin-exlk.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/map`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/annuaire`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/a-propos`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/contact`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/login`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteUrl}/signup`, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const { data } = await supabase.from('shlouhim').select('id')

  const locationRoutes: MetadataRoute.Sitemap = (data || []).map((row: { id: number }) => ({
    url: `${siteUrl}/beth-habad/${row.id}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...locationRoutes]
}
