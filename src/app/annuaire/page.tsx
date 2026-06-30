'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { MapPin, Phone, Globe, Search, ListFilter } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { normalizeText } from '@/lib/normalize'
import type { BethHabadLocation } from '@/lib/types'

export default function AnnuairePage() {
  const [locations, setLocations] = useState<BethHabadLocation[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [countryFilter, setCountryFilter] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'country'>('country')

  useEffect(() => {
    async function fetchLocations() {
      const { data } = await supabase
        .from('shlouhim')
        .select('*')

      if (data) {
        setLocations(data as BethHabadLocation[])
      }
      setLoading(false)
    }
    fetchLocations()
  }, [])

  const countries = useMemo(() => {
    const set = new Set(locations.map((l) => l.country).filter(Boolean))
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [locations])

  const filtered = useMemo(() => {
    const q = normalizeText(query)
    let results = locations.filter((l) => {
      const matchesQuery =
        !q ||
        normalizeText(l.beth_habad_name).includes(q) ||
        normalizeText(l.city).includes(q) ||
        normalizeText(l.country).includes(q)
      const matchesCountry = !countryFilter || l.country === countryFilter
      return matchesQuery && matchesCountry
    })

    results = results.slice().sort((a, b) => {
      if (sortBy === 'name') {
        return (a.beth_habad_name || '').localeCompare(b.beth_habad_name || '')
      }
      const countryCompare = (a.country || '').localeCompare(b.country || '')
      if (countryCompare !== 0) return countryCompare
      return (a.city || '').localeCompare(b.city || '')
    })

    return results
  }, [locations, query, countryFilter, sortBy])

  return (
    <div className="min-h-screen bg-muted/40">
      <div className="brand-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold tracking-tight">Annuaire des Beth Habad</h1>
          <p className="text-white/80 mt-1">
            Parcourez la liste complète des centres, sans passer par la carte
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filtres */}
        <div className="bg-white rounded-2xl ring-1 ring-border p-4 mb-6 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un nom, une ville, un pays..."
              className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="px-3 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          >
            <option value="">Tous les pays</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => setSortBy(sortBy === 'country' ? 'name' : 'country')}
            className="flex items-center justify-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm text-foreground hover:bg-muted transition-colors"
          >
            <ListFilter className="h-4 w-4" />
            Trier par {sortBy === 'country' ? 'nom' : 'pays'}
          </button>
        </div>

        {/* Résultats */}
        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Chargement de l&apos;annuaire...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl ring-1 ring-border">
            <p className="text-foreground font-medium mb-1">Aucun Beth Habad trouvé</p>
            <p className="text-sm text-muted-foreground">Essayez une autre recherche ou un autre pays</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              {filtered.length} Beth Habad{filtered.length > 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((location) => (
                <Link
                  key={location.id}
                  href={`/beth-habad/${location.id}`}
                  className="block bg-white rounded-2xl ring-1 ring-border p-5 hover:ring-primary/30 hover:shadow-md transition-all duration-200"
                >
                  <h3 className="font-semibold text-foreground truncate">
                    {location.beth_habad_name || 'Nom non disponible'}
                  </h3>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                    <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="truncate">{location.city}, {location.country}</span>
                  </div>

                  {location.phone && (
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-2">
                      <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                      <span>{location.phone}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs font-medium text-primary">Voir la fiche complète →</span>
                    {(location.website || location.chabad_url) && (
                      <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
