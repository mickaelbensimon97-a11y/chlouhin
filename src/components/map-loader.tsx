'use client'

import dynamic from 'next/dynamic'
import type { BethHabadLocation } from '@/lib/types'

interface MapLoaderProps {
  searchCity?: string
  selectedLocation?: BethHabadLocation | null
  openDetailsLocation?: BethHabadLocation | null
  onLocationSelect?: (location: BethHabadLocation) => void
}

// ssr: false DOIT être déclaré dans un Client Component (règle Next.js 16+)
const LeafletMap = dynamic(() => import('@/components/leaflet-map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-3" />
        <p className="text-gray-500 text-sm">Chargement de la carte…</p>
      </div>
    </div>
  ),
})

export default function MapLoader({ searchCity, selectedLocation, openDetailsLocation, onLocationSelect }: MapLoaderProps) {
  return (
    <LeafletMap
      searchCity={searchCity}
      selectedLocation={selectedLocation}
      openDetailsLocation={openDetailsLocation}
      onLocationSelect={onLocationSelect}
    />
  )
}
