'use client'

import Link from 'next/link'
import { Heart, MapPin, Trash2, MapPinned } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useFavorites } from '@/hooks/use-favorites'

export default function FavorisPage() {
  const { favorites, removeFromFavorites } = useFavorites()

  return (
    <div className="min-h-screen bg-muted/40">
      <div className="brand-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold flex items-center gap-2 tracking-tight">
            <Heart className="h-6 w-6 fill-white" />
            Mes favoris
          </h1>
          <p className="text-white/80 mt-1">
            Retrouvez ici tous les Beth Habad que vous avez ajoutés en favoris
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {favorites.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl ring-1 ring-border">
            <Heart className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
            <p className="text-foreground font-medium mb-1">Vous n&apos;avez pas encore de favoris</p>
            <p className="text-sm text-muted-foreground mb-6">
              Ajoutez un Beth Habad en favoris depuis sa fiche détaillée sur la carte
            </p>
            <Button asChild className="rounded-full px-6">
              <Link href="/map">Explorer la carte</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {favorites
              .slice()
              .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
              .map((fav) => (
                <Card key={fav.id} className="overflow-hidden border-0 ring-1 ring-border hover:ring-primary/30 hover:shadow-md transition-all duration-200">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-foreground truncate">
                          {fav.beth_habad_name || 'Nom non disponible'}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                          <span className="truncate">{fav.city}, {fav.country}</span>
                        </div>
                        <p className="text-xs text-muted-foreground/70 mt-2">
                          Ajouté le {new Date(fav.addedAt).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-full flex-shrink-0"
                        onClick={() => removeFromFavorites(fav.id)}
                        title="Retirer des favoris"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <Button
                      asChild
                      variant="outline"
                      className="w-full mt-4 flex items-center gap-2 rounded-full"
                    >
                      <Link href={`/map?id=${fav.id}`}>
                        <MapPinned className="h-4 w-4" />
                        Voir sur la carte
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
