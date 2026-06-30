'use client'

import { MapPin, Phone, Globe, Navigation, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFavorites } from '@/hooks/use-favorites'
import type { BethHabadLocation } from '@/lib/types'

interface SearchResultsPanelProps {
  results: BethHabadLocation[]
  searchQuery: string
  selectedLocation: BethHabadLocation | null
  onLocationSelect: (location: BethHabadLocation) => void
  onLocationHover?: (location: BethHabadLocation | null) => void
  isVisible: boolean
}

export function SearchResultsPanel({ 
  results, 
  searchQuery, 
  selectedLocation,
  onLocationSelect, 
  onLocationHover,
  isVisible 
}: SearchResultsPanelProps) {
  const { isFavorite, toggleFavorite } = useFavorites()

  if (!isVisible || !searchQuery || results.length === 0) return null

  const handleLocationClick = (location: BethHabadLocation) => {
    onLocationSelect(location)
  }

  const handleFavoriteToggle = (e: React.MouseEvent, location: BethHabadLocation) => {
    e.stopPropagation()
    toggleFavorite({
      id: location.id,
      beth_habad_name: location.beth_habad_name,
      city: location.city,
      country: location.country
    })
  }

  const handleDirections = (e: React.MouseEvent, location: BethHabadLocation) => {
    e.stopPropagation()
    if (location.latitude && location.longitude) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`
      window.open(url, '_blank')
    }
  }

  const handleCall = (e: React.MouseEvent, location: BethHabadLocation) => {
    e.stopPropagation()
    if (location.phone) {
      window.open(`tel:${location.phone}`, '_self')
    }
  }

  const handleWebsite = (e: React.MouseEvent, location: BethHabadLocation) => {
    e.stopPropagation()
    if (location.website) {
      window.open(location.website, '_blank')
    } else if (location.chabad_url) {
      window.open(location.chabad_url, '_blank')
    }
  }

  return (
    <div className="fixed left-4 top-32 bottom-4 w-96 bg-white rounded-2xl shadow-2xl shadow-black/15 ring-1 ring-border z-30 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="brand-gradient text-white p-4">
        <h3 className="text-lg font-semibold">Résultats de recherche</h3>
        <p className="text-white/80 text-sm">
          {results.length} Beth Habad trouvé{results.length > 1 ? 's' : ''} pour &quot;{searchQuery}&quot;
        </p>
      </div>

      {/* Results List */}
      <div className="flex-1 overflow-y-auto">
        {results.map((location) => (
          <div
            key={location.id}
            id={`location-${location.id}`}
            className={`p-4 border-b border-border last:border-0 cursor-pointer transition-all duration-200 hover:bg-muted ${
              selectedLocation?.id === location.id ? 'bg-primary/5 border-l-4 border-l-primary' : ''
            }`}
            onClick={() => handleLocationClick(location)}
            onMouseEnter={() => onLocationHover?.(location)}
            onMouseLeave={() => onLocationHover?.(null)}
          >
            {/* Main Info */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-foreground text-base leading-tight">
                    {location.beth_habad_name}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {location.city}, {location.country}
                  </p>
                </div>

                {/* Favorite Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-8 w-8 flex-shrink-0 rounded-full hover:bg-muted"
                  onClick={(e) => handleFavoriteToggle(e, location)}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      isFavorite(location.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-muted-foreground hover:text-red-500'
                    }`}
                  />
                </Button>
              </div>

              {/* Adresse complète */}
              <div className="bg-muted rounded-xl p-3">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1 text-sm">
                    {/* Adresse simple et claire */}
                    {(() => {
                      // Si location.location est un objet JSON, on le parse
                      let addressData = location.location;
                      if (typeof addressData === 'string') {
                        try {
                          addressData = JSON.parse(addressData);
                        } catch {
                          // Si ce n'est pas du JSON, on garde la string
                          addressData = location.location;
                        }
                      }

                      // Si c'est un objet avec les propriétés d'adresse
                      if (addressData && typeof addressData === 'object') {
                        // Construire l'adresse complète en une seule ligne
                        const fullAddress = [
                          (addressData as any)['address-line1'],
                          (addressData as any)['address-line2'],
                          (addressData as any).city || location.city,
                          (addressData as any)['zip-code'] || location.postal_code,
                          (addressData as any).state || location.state,
                          (addressData as any).country || location.country
                        ].filter(Boolean).join(', ');

                        return (
                          <p className="text-foreground font-medium leading-relaxed">
                            {fullAddress}
                          </p>
                        );
                      }

                      // Sinon affichage normal - adresse complète en une ligne
                      const fullAddress = [
                        location.location,
                        location.city,
                        location.postal_code,
                        location.state,
                        location.country
                      ].filter(Boolean).join(', ');

                      return (
                        <p className="text-foreground font-medium leading-relaxed">
                          {fullAddress}
                        </p>
                      );
                    })()}
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2">
                {location.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-sm text-foreground/80">{location.phone}</span>
                  </div>
                )}

                {location.rabbi && (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 flex items-center justify-center">
                      <span className="text-sm">👨‍💼</span>
                    </div>
                    <span className="text-sm text-foreground/80">{location.rabbi}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-4 pt-3 border-t border-border">
              {location.phone && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs h-9 rounded-full bg-white border-primary text-primary hover:bg-primary hover:text-white"
                  onClick={(e) => handleCall(e, location)}
                >
                  <Phone className="h-3 w-3 mr-1" />
                  Appeler
                </Button>
              )}

              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs h-9 rounded-full bg-white border-primary text-primary hover:bg-primary hover:text-white"
                onClick={(e) => handleDirections(e, location)}
              >
                <Navigation className="h-3 w-3 mr-1" />
                Itinéraire
              </Button>

              {(location.website || location.chabad_url) && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs h-9 rounded-full bg-white border-primary text-primary hover:bg-primary hover:text-white"
                  onClick={(e) => handleWebsite(e, location)}
                >
                  <Globe className="h-3 w-3 mr-1" />
                  Site
                </Button>
              )}
            </div>

            {/* Selection indicator */}
            {selectedLocation?.id === location.id && (
              <div className="mt-2 text-xs text-primary font-medium bg-primary/5 px-2 py-1 rounded-full inline-block">
                📍 Sélectionné sur la carte
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-3 bg-muted/60 border-t border-border text-center">
        <p className="text-xs text-muted-foreground">
          {results.length} résultat{results.length > 1 ? 's' : ''} affiché{results.length > 1 ? 's' : ''}
        </p>
      </div>
    </div>
  )
}
