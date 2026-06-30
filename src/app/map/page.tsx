'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import MapLoader from '@/components/map-loader'
import { SearchResults } from '@/components/search-results'
import { SearchResultsPanel } from '@/components/search-results-panel'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { normalizeText } from '@/lib/normalize'
import type { BethHabadLocation } from '@/lib/types'

function MapPageContent() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get('search') || ''
  const initialId = searchParams.get('id')

  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [filteredCity, setFilteredCity] = useState(initialSearch)
  const [searchResults, setSearchResults] = useState<BethHabadLocation[]>([])
  const [showResults, setShowResults] = useState(false)
  const [showPanel, setShowPanel] = useState(!!initialSearch)
  const [selectedLocation, setSelectedLocation] = useState<BethHabadLocation | null>(null)
  const [openDetailsLocation, setOpenDetailsLocation] = useState<BethHabadLocation | null>(null)
  const [allLocations, setAllLocations] = useState<BethHabadLocation[]>([])

  // Charger toutes les locations au démarrage
  useEffect(() => {
    async function fetchLocations() {
      const { data } = await supabase
        .from('shlouhim')
        .select('*')
        .not('latitude', 'is', null)
        .not('longitude', 'is', null)

      if (data) {
        setAllLocations(data as BethHabadLocation[])
      }
    }
    fetchLocations()
  }, [])

  // Appliquer la recherche venant de l'URL (ex: /map?search=Paris) une fois les données chargées
  useEffect(() => {
    if (initialSearch && allLocations.length > 0) {
      const query = normalizeText(initialSearch)
      const filtered = allLocations.filter(location =>
        normalizeText(location.city).includes(query) ||
        normalizeText(location.country).includes(query) ||
        normalizeText(location.beth_habad_name).includes(query)
      )
      setSearchResults(filtered)
      setFilteredCity(initialSearch)
      setShowPanel(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allLocations])

  // Ouvrir directement la fiche d'un Beth Habad venant d'un lien favori (ex: /map?id=42)
  useEffect(() => {
    if (initialId && allLocations.length > 0) {
      const location = allLocations.find(loc => String(loc.id) === initialId)
      if (location) {
        setSelectedLocation(location)
        setOpenDetailsLocation(location)
        setFilteredCity(location.city)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allLocations])

  // Calcul des résultats pour la liste déroulante (sans forcer son affichage)
  useEffect(() => {
    if (searchQuery.trim().length > 2) {
      const query = normalizeText(searchQuery)
      const filtered = allLocations.filter(location =>
        normalizeText(location.city).includes(query) ||
        normalizeText(location.country).includes(query) ||
        normalizeText(location.beth_habad_name).includes(query)
      )
      setSearchResults(filtered)
    } else {
      setSearchResults([])
      setShowResults(false)
    }
  }, [searchQuery, allLocations])

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setShowResults(value.trim().length > 2)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setFilteredCity(searchQuery.trim())
      setShowResults(false)
      setShowPanel(true)
    }
  }

  const handleLocationClick = (location: BethHabadLocation) => {
    setSearchQuery(location.city)
    setFilteredCity(location.city)
    setShowResults(false)
    setShowPanel(true)
  }

  const handlePanelLocationSelect = (location: BethHabadLocation) => {
    setSelectedLocation(location)
    setFilteredCity(location.city)
    
    // Scroll vers le Beth Habad sélectionné dans le panneau
    const element = document.getElementById(`location-${location.id}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const clearSearch = () => {
    setSearchQuery('')
    setFilteredCity('')
    setShowResults(false)
    setShowPanel(false)
    setSelectedLocation(null)
  }

  return (
    <div className="min-h-screen bg-muted/40 flex flex-col">
      {/* En-tête avec barre de recherche */}
      <div className="brand-gradient text-white py-7 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Carte mondiale</h1>
              <p className="text-white/80 mt-1">
                Trouvez les Beth Habad près de chez vous
              </p>
            </div>

            {/* Barre de recherche */}
            <div className="flex-shrink-0 w-full md:w-96 relative">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder="Rechercher par ville, pays ou nom..."
                    className="w-full pl-11 pr-24 py-3 border-0 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-white text-foreground"
                    onFocus={() => searchQuery.length > 2 && setShowResults(true)}
                    onBlur={() => setTimeout(() => setShowResults(false), 200)}
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                    {filteredCity && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={clearSearch}
                        className="h-6 px-2 text-xs rounded-full bg-muted hover:bg-border text-foreground"
                      >
                        Effacer
                      </Button>
                    )}
                    <Button type="submit" size="sm" className="h-6 px-3 text-xs rounded-full">
                      Chercher
                    </Button>
                  </div>
                </div>
              </form>

              {/* Résultats de recherche */}
              {showResults && (
                <SearchResults
                  results={searchResults}
                  searchQuery={searchQuery}
                  onLocationClick={handleLocationClick}
                />
              )}

              {/* Indicateur de filtre actif */}
              {filteredCity && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-white/80">Filtré par:</span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white text-primary">
                    {filteredCity}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Panneau de résultats */}
      <SearchResultsPanel
        results={searchResults}
        searchQuery={searchQuery}
        selectedLocation={selectedLocation}
        onLocationSelect={handlePanelLocationSelect}
        isVisible={showPanel}
      />

      {/* Carte plein écran */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        <div className="w-full rounded-2xl overflow-hidden shadow-lg relative z-10 ring-1 ring-border" style={{ height: '75vh' }}>
          <MapLoader
            searchCity={filteredCity}
            selectedLocation={selectedLocation}
            openDetailsLocation={openDetailsLocation}
            onLocationSelect={setSelectedLocation}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-right">
          Données cartographiques © OpenStreetMap contributors
        </p>
      </div>
    </div>
  )
}

export default function MapPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-500">Chargement...</div>}>
      <MapPageContent />
    </Suspense>
  )
}
