'use client'

import type { BethHabadLocation } from '@/lib/types'

interface SearchResultsProps {
  results: BethHabadLocation[]
  searchQuery: string
  onLocationClick?: (location: BethHabadLocation) => void
}

export function SearchResults({ results, searchQuery, onLocationClick }: SearchResultsProps) {
  if (!searchQuery) return null

  return (
    <div className="absolute top-full left-0 right-0 bg-white ring-1 ring-border rounded-2xl shadow-xl shadow-black/10 z-50 max-h-96 overflow-hidden mt-2">
      {results.length === 0 ? (
        <div className="p-5 text-center text-muted-foreground text-sm">
          Aucun Beth Habad trouvé pour &quot;{searchQuery}&quot;
        </div>
      ) : (
        <div>
          <div className="p-3 px-4 brand-gradient text-white text-sm font-medium">
            {results.length} Beth Habad trouvé{results.length > 1 ? 's' : ''} pour &quot;{searchQuery}&quot;
          </div>
          <div className="max-h-80 overflow-y-auto">
            {results.map((location) => (
              <div
                key={location.id}
                className="p-3.5 px-4 border-b border-border last:border-0 hover:bg-muted cursor-pointer transition-colors"
                onClick={() => onLocationClick?.(location)}
              >
                <div className="font-medium text-foreground">
                  {location.beth_habad_name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {location.city}, {location.country}
                </div>
                {location.phone && (
                  <div className="text-xs text-muted-foreground mt-1">
                    📞 {location.phone}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
