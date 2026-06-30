import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { BethHabadLocation } from '@/lib/types'
import { BethHabadDetailClient } from './beth-habad-detail-client'

async function getLocation(slug: string): Promise<BethHabadLocation | null> {
  const { data } = await supabase
    .from('shlouhim')
    .select('*')
    .eq('id', slug)
    .maybeSingle()

  return (data as BethHabadLocation) || null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const location = await getLocation(slug)

  if (!location) {
    return {
      title: 'Beth Habad introuvable - ChlouhIN',
    }
  }

  const title = `${location.beth_habad_name} - ${location.city}, ${location.country} | ChlouhIN`
  const description =
    location.description ||
    `Coordonnées, adresse et horaires du Beth Habad de ${location.city}, ${location.country}. Contactez ${location.rabbi || 'le Chaliah'} sur ChlouhIN.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  }
}

export default async function BethHabadPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const location = await getLocation(slug)

  if (!location) {
    notFound()
  }

  return <BethHabadDetailClient location={location} />
}
