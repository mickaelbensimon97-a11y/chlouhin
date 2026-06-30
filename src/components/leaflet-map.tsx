'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import '@/styles/custom-markers.css'
import { supabase } from '@/lib/supabase'
import { normalizeText } from '@/lib/normalize'
import { ChabadDetailCard } from './chabad-detail-card'
import { createChabadIcon, createClusterIcon } from './custom-marker'
import type { BethHabadLocation } from '@/lib/types'

// Correction de l'icône par défaut de Leaflet (bug connu avec Webpack)
function useLeafletDefaultIcon() {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    })
  }, [])
}

interface LeafletMapProps {
  searchCity?: string
  selectedLocation?: BethHabadLocation | null
  openDetailsLocation?: BethHabadLocation | null
  onLocationSelect?: (location: BethHabadLocation) => void
}

export default function LeafletMap({ searchCity, selectedLocation: propSelectedLocation, openDetailsLocation, onLocationSelect }: LeafletMapProps) {
  useLeafletDefaultIcon()
  const [allLocations, setAllLocations] = useState<BethHabadLocation[]>([])
  const [filteredLocations, setFilteredLocations] = useState<BethHabadLocation[]>([])
  const [loading, setLoading] = useState(true)
  const [mapCenter, setMapCenter] = useState<[number, number]>([20, 0])
  const [mapZoom, setMapZoom] = useState(2)
  const [selectedLocation, setSelectedLocation] = useState<BethHabadLocation | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  useEffect(() => {
    async function fetchBethHabadLocations() {
      try {
        const { data, error } = await supabase
          .from('shlouhim')
          .select('*')
          .not('latitude', 'is', null)
          .not('longitude', 'is', null)
        
        if (error) {
          console.error('Erreur lors de la récupération des Beth Habad:', error)
          return
        }
        
        console.log('Données récupérées:', data?.length, 'centres')
        console.log('Exemple de données:', data?.[0])
        
        const locations = (data || []) as BethHabadLocation[]
        setAllLocations(locations)
        setFilteredLocations(locations)
      } catch (error) {
        console.error('Erreur:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBethHabadLocations()
  }, [])

  // Géolocalisation de l'utilisateur
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.log('Géolocalisation non disponible:', error)
        }
      )
    }
  }, [])

  // Effet pour filtrer les locations selon la recherche
  useEffect(() => {
    if (!searchCity || searchCity.trim() === '') {
      setFilteredLocations(allLocations)
      setMapCenter([20, 0])
      setMapZoom(2)
      return
    }

    const query = normalizeText(searchCity)
    const filtered = allLocations.filter(location =>
      normalizeText(location.city).includes(query) ||
      normalizeText(location.country).includes(query)
    )

    setFilteredLocations(filtered)

    // Centrer la carte sur les résultats
    if (filtered.length > 0) {
      if (filtered.length === 1) {
        // Un seul résultat : centrer dessus
        const location = filtered[0]
        if (location.latitude && location.longitude) {
          setMapCenter([location.latitude, location.longitude])
          setMapZoom(12)
        }
      } else {
        // Plusieurs résultats : calculer le centre
        const validLocations = filtered.filter(loc => loc.latitude && loc.longitude)
        if (validLocations.length > 0) {
          const avgLat = validLocations.reduce((sum, loc) => sum + (loc.latitude || 0), 0) / validLocations.length
          const avgLng = validLocations.reduce((sum, loc) => sum + (loc.longitude || 0), 0) / validLocations.length
          setMapCenter([avgLat, avgLng])
          setMapZoom(6)
        }
      }
    }
  }, [searchCity, allLocations])

  // Centrer la carte depuis le panneau (sans ouvrir la fiche détaillée)
  useEffect(() => {
    if (propSelectedLocation) {
      if (propSelectedLocation.latitude && propSelectedLocation.longitude) {
        setMapCenter([propSelectedLocation.latitude, propSelectedLocation.longitude])
        setMapZoom(12)
      }
    }
  }, [propSelectedLocation])

  // Ouvrir directement la fiche détaillée (ex: lien depuis un favori)
  useEffect(() => {
    if (openDetailsLocation) {
      setSelectedLocation(openDetailsLocation)
      if (openDetailsLocation.latitude && openDetailsLocation.longitude) {
        setMapCenter([openDetailsLocation.latitude, openDetailsLocation.longitude])
        setMapZoom(12)
      }
    }
  }, [openDetailsLocation])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">Chargement des Beth Habad...</div>
      </div>
    )
  }

  return (
    <>
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        minZoom={2}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
        key={`${mapCenter[0]}-${mapCenter[1]}-${mapZoom}`}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredLocations.map((location: BethHabadLocation) => {
          return location.latitude && location.longitude && (
            <Marker 
              key={location.id} 
              position={[location.latitude, location.longitude]}
              eventHandlers={{
                click: (e) => {
                  e.originalEvent?.preventDefault()
                  e.originalEvent?.stopPropagation()
                  // Centrer la carte sur le marqueur
                  setMapCenter([location.latitude!, location.longitude!])
                  setMapZoom(15)
                  // Notifier la sélection
                  onLocationSelect?.(location)
                }
              }}
            >
              <Popup>
                <div className="text-sm">
                  <p className="font-semibold">{location.beth_habad_name || 'Nom non disponible'}</p>
                  <p className="text-gray-500">{location.city || ''}, {location.country || ''}</p>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedLocation(location)
                    }}
                    className="text-blue-600 text-xs mt-2 hover:underline bg-none border-none cursor-pointer"
                  >
                    Voir tous les détails →
                  </button>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
      
      {/* Fiche détaillée */}
      {selectedLocation && (
        <ChabadDetailCard 
          location={selectedLocation}
          onClose={() => setSelectedLocation(null)}
          userLocation={userLocation}
        />
      )}
    </>
  )
}
