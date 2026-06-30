'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Phone,
  Mail,
  Globe,
  MapPin,
  Copy,
  Heart,
  Share2,
  Navigation,
  Clock,
  User,
  MessageSquare,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFavorites } from '@/hooks/use-favorites'
import { useAuth } from '@/components/auth/auth-provider'
import type { BethHabadLocation } from '@/lib/types'

export function BethHabadDetailClient({ location }: { location: BethHabadLocation }) {
  const [copied, setCopied] = useState(false)
  const { isFavorite, toggleFavorite } = useFavorites()
  const { user } = useAuth()

  const handleCall = () => location.phone && window.open(`tel:${location.phone}`, '_self')
  const handleEmail = () => location.email && window.open(`mailto:${location.email}`, '_blank')
  const handleWebsite = () => {
    const url = location.website || location.chabad_url
    if (url) window.open(url, '_blank')
  }
  const handleDirections = () => {
    if (location.latitude && location.longitude) {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`,
        '_blank'
      )
    }
  }
  const handleCopyAddress = async () => {
    const address = `${location.beth_habad_name}\n${location.location || ''}\n${location.city}, ${location.country}`
    try {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }
  const handleShare = async () => {
    const shareData = {
      title: location.beth_habad_name,
      text: `${location.beth_habad_name} - ${location.city}, ${location.country}`,
      url: window.location.href,
    }
    if (navigator.share) {
      try { await navigator.share(shareData) } catch { /* ignore */ }
    } else {
      await navigator.clipboard.writeText(window.location.href)
    }
  }
  const handleToggleFavorite = () => {
    toggleFavorite({
      id: location.id,
      beth_habad_name: location.beth_habad_name,
      city: location.city,
      country: location.country,
    })
  }

  return (
    <div className="min-h-screen bg-muted/40">
      <div className="relative brand-gradient text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/annuaire"
            className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à l&apos;annuaire
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{location.beth_habad_name}</h1>
          <div className="flex items-center gap-2 text-white/85 mt-2">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{location.city}, {location.country}</span>
          </div>

          <div className="flex gap-2 mt-5">
            <Button
              variant="secondary"
              size="icon"
              className="bg-white/20 hover:bg-white/30 text-white border-0 rounded-full"
              onClick={handleToggleFavorite}
            >
              <Heart className={`h-4 w-4 ${isFavorite(location.id) ? 'fill-current' : ''}`} />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="bg-white/20 hover:bg-white/30 text-white border-0 rounded-full"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-5">
        {/* Fiche principale */}
        <div className="bg-white rounded-2xl ring-1 ring-border p-6 sm:p-8">
          <div className="space-y-5">
            {location.location && (
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Adresse</p>
                  <p className="text-sm text-muted-foreground">{location.location}</p>
                  {location.postal_code && (
                    <p className="text-sm text-muted-foreground">{location.postal_code}</p>
                  )}
                </div>
              </div>
            )}

            {location.rabbi && (
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Responsable</p>
                  <p className="text-sm text-muted-foreground">{location.rabbi}</p>
                </div>
              </div>
            )}

            {location.phone && (
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Téléphone</p>
                  <p className="text-sm text-primary cursor-pointer hover:underline" onClick={handleCall}>
                    {location.phone}
                  </p>
                </div>
              </div>
            )}

            {location.email && (
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Email</p>
                  <p className="text-sm text-primary cursor-pointer hover:underline" onClick={handleEmail}>
                    {location.email}
                  </p>
                </div>
              </div>
            )}

            {(location.website || location.chabad_url) && (
              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Site web</p>
                  <p className="text-sm text-primary cursor-pointer hover:underline" onClick={handleWebsite}>
                    Visiter le site
                  </p>
                </div>
              </div>
            )}

            {location.opening_hours && (
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Horaires</p>
                  <p className="text-sm text-muted-foreground">{location.opening_hours}</p>
                </div>
              </div>
            )}

            {location.description && (
              <div className="pt-4 border-t border-border">
                <p className="text-sm font-medium text-foreground mb-2">Description</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{location.description}</p>
              </div>
            )}

            {location.latitude && location.longitude && (
              <div className="pt-4 border-t border-border">
                <p className="text-sm font-medium text-foreground mb-2">Coordonnées GPS</p>
                <p className="text-xs text-muted-foreground font-mono">
                  {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 mt-8 pt-6 border-t border-border">
            {location.phone && (
              <Button onClick={handleCall} className="flex items-center gap-2 rounded-full">
                <Phone className="h-4 w-4" />
                Appeler
              </Button>
            )}

            <Button
              variant="outline"
              onClick={handleDirections}
              className="flex items-center gap-2 rounded-full"
            >
              <Navigation className="h-4 w-4" />
              Itinéraire
            </Button>

            {location.email && (
              <Button
                variant="outline"
                onClick={handleEmail}
                className="flex items-center gap-2 rounded-full"
              >
                <Mail className="h-4 w-4" />
                Email
              </Button>
            )}

            <Button
              variant="outline"
              onClick={handleCopyAddress}
              className="flex items-center gap-2 rounded-full"
            >
              <Copy className="h-4 w-4" />
              {copied ? 'Copié !' : "Copier l'adresse"}
            </Button>
          </div>
        </div>

        {/* Bouton messagerie */}
        {user ? (
          <Link
            href={`/dashboard/messages/${location.id}`}
            className="flex items-center gap-4 bg-white rounded-2xl ring-1 ring-border p-5 hover:ring-primary/40 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl brand-gradient shrink-0">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground text-sm">Envoyer un message</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Écrivez directement à {location.beth_habad_name}
              </p>
            </div>
            <span className="text-primary text-sm font-medium group-hover:translate-x-0.5 transition-transform">
              →
            </span>
          </Link>
        ) : (
          <Link
            href={`/login`}
            className="flex items-center gap-4 bg-white rounded-2xl ring-1 ring-border p-5 hover:ring-primary/40 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted shrink-0">
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground text-sm">Envoyer un message</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Connectez-vous pour écrire à ce centre
              </p>
            </div>
            <span className="text-primary text-sm font-medium group-hover:translate-x-0.5 transition-transform">
              →
            </span>
          </Link>
        )}

        <div className="text-center">
          <Link
            href={`/map?id=${location.id}`}
            className="text-sm text-primary hover:underline"
          >
            Voir cet emplacement sur la carte
          </Link>
        </div>
      </div>
    </div>
  )
}
