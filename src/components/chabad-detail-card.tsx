'use client'

import { useState } from 'react'
import { X, Phone, Mail, Globe, MapPin, Copy, Heart, Share2, Navigation, Clock, User, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFavorites } from '@/hooks/use-favorites'
import { useAuth } from '@/components/auth/auth-provider'
import Link from 'next/link'
import type { BethHabadLocation } from '@/lib/types'

interface ChabadDetailCardProps {
  location: BethHabadLocation | null
  onClose: () => void
  userLocation?: { lat: number; lng: number } | null
}

export function ChabadDetailCard({ location, onClose, userLocation }: ChabadDetailCardProps) {
  const [copied, setCopied] = useState(false)
  const { isFavorite, toggleFavorite } = useFavorites()
  const { user } = useAuth()

  if (!location) return null

  const handleCall = () => {
    if (location.phone) {
      window.open(`tel:${location.phone}`, '_self')
    }
  }

  const handleEmail = () => {
    if (location.email) {
      window.open(`mailto:${location.email}`, '_blank')
    }
  }

  const handleWebsite = () => {
    if (location.website) {
      window.open(location.website, '_blank')
    } else if (location.chabad_url) {
      window.open(location.chabad_url, '_blank')
    }
  }

  const handleDirections = () => {
    if (location.latitude && location.longitude) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`
      window.open(url, '_blank')
    }
  }

  const handleCopyAddress = async () => {
    const address = `${location.beth_habad_name}\n${location.location || ''}\n${location.city}, ${location.country}`
    try {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Erreur lors de la copie:', err)
    }
  }

  const handleShare = async () => {
    const shareData = {
      title: location.beth_habad_name,
      text: `${location.beth_habad_name} - ${location.city}, ${location.country}`,
      url: window.location.href
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.error('Erreur lors du partage:', err)
      }
    } else {
      // Fallback: copier l'URL
      await navigator.clipboard.writeText(window.location.href)
    }
  }

  const handleToggleFavorite = () => {
    toggleFavorite({
      id: location.id,
      beth_habad_name: location.beth_habad_name,
      city: location.city,
      country: location.country
    })
  }

  const calculateDistance = () => {
    if (!userLocation || !location.latitude || !location.longitude) return null
    
    const R = 6371 // Rayon de la Terre en km
    const dLat = (location.latitude - userLocation.lat) * Math.PI / 180
    const dLon = (location.longitude - userLocation.lng) * Math.PI / 180
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(userLocation.lat * Math.PI / 180) * Math.cos(location.latitude * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    const distance = R * c
    
    return distance < 1 ? `${Math.round(distance * 1000)}m` : `${distance.toFixed(1)}km`
  }

  const distance = calculateDistance()

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Card - Centrée et bien visible */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden z-[10000]">
        {/* Header */}
        <div className="relative brand-gradient text-white p-6 pb-8">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>

          <div className="pr-12">
            <h2 className="text-xl font-bold mb-2 leading-tight">
              {location.beth_habad_name}
            </h2>
            <div className="flex items-center gap-2 text-white/80">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">
                {location.city}, {location.country}
                {distance && <span className="ml-2">• {distance}</span>}
              </span>
            </div>
          </div>

          {/* Actions rapides */}
          <div className="flex gap-2 mt-4">
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

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Informations principales */}
          <div className="space-y-4">
            {location.location && (
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Adresse</p>
                  <p className="text-sm text-gray-600">{location.location}</p>
                  {location.postal_code && (
                    <p className="text-sm text-gray-600">{location.postal_code}</p>
                  )}
                </div>
              </div>
            )}

            {location.rabbi && (
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Responsable</p>
                  <p className="text-sm text-gray-600">{location.rabbi}</p>
                </div>
              </div>
            )}

            {location.phone && (
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Téléphone</p>
                  <p className="text-sm text-primary cursor-pointer hover:underline" onClick={handleCall}>
                    {location.phone}
                  </p>
                </div>
              </div>
            )}

            {location.email && (
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <p className="text-sm text-primary cursor-pointer hover:underline" onClick={handleEmail}>
                    {location.email}
                  </p>
                </div>
              </div>
            )}

            {(location.website || location.chabad_url) && (
              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Site web</p>
                  <p className="text-sm text-primary cursor-pointer hover:underline" onClick={handleWebsite}>
                    Visiter le site
                  </p>
                </div>
              </div>
            )}

            {location.opening_hours && (
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Horaires</p>
                  <p className="text-sm text-gray-600">{location.opening_hours}</p>
                </div>
              </div>
            )}

            {location.description && (
              <div className="pt-2 border-t">
                <p className="text-sm font-medium text-gray-900 mb-2">Description</p>
                <p className="text-sm text-gray-600 leading-relaxed">{location.description}</p>
              </div>
            )}

            {location.latitude && location.longitude && (
              <div className="pt-2 border-t">
                <p className="text-sm font-medium text-gray-900 mb-2">Coordonnées GPS</p>
                <p className="text-xs text-gray-500 font-mono">
                  {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                </p>
              </div>
            )}
          </div>

          {/* Boutons d'action */}
          <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-border">
            {location.phone && (
              <Button onClick={handleCall} className="flex items-center gap-2 rounded-xl">
                <Phone className="h-4 w-4" />
                Appeler
              </Button>
            )}

            <Button
              variant="outline"
              onClick={handleDirections}
              className="flex items-center gap-2 rounded-xl"
            >
              <Navigation className="h-4 w-4" />
              Itinéraire
            </Button>

            {location.email && (
              <Button
                variant="outline"
                onClick={handleEmail}
                className="flex items-center gap-2 rounded-xl"
              >
                <Mail className="h-4 w-4" />
                Email
              </Button>
            )}

            <Button
              variant="outline"
              onClick={handleCopyAddress}
              className="flex items-center gap-2 rounded-xl"
            >
              <Copy className="h-4 w-4" />
              {copied ? 'Copié !' : 'Copier'}
            </Button>
          </div>

          {/* Bouton messagerie */}
          <div className="mt-4">
            <Link
              href={user ? `/dashboard/messages/${location.id}?name=${encodeURIComponent(location.beth_habad_name)}` : '/login'}
              onClick={onClose}
              className="flex items-center gap-3 w-full p-4 rounded-xl ring-1 ring-border hover:ring-primary/40 hover:bg-muted/30 transition-all duration-150 group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg brand-gradient shrink-0">
                <MessageSquare className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-foreground">Envoyer un message</p>
                <p className="text-xs text-muted-foreground">
                  {user ? `Écrire à ${location.beth_habad_name}` : 'Connectez-vous pour écrire'}
                </p>
              </div>
              <span className="text-primary text-sm group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
