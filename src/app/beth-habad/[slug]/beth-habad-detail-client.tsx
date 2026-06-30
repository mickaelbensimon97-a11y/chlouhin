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
  Send,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFavorites } from '@/hooks/use-favorites'
import { useAuth } from '@/components/auth/auth-provider'
import { supabase } from '@/lib/supabase'
import type { BethHabadLocation } from '@/lib/types'

export function BethHabadDetailClient({ location }: { location: BethHabadLocation }) {
  const [copied, setCopied] = useState(false)
  const [messageContent, setMessageContent] = useState('')
  const [sending, setSending] = useState(false)
  const [messageSent, setMessageSent] = useState(false)
  const [messageError, setMessageError] = useState('')
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
      try {
        await navigator.share(shareData)
      } catch {
        // ignore
      }
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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !messageContent.trim()) return
    setSending(true)
    setMessageError('')

    const { error } = await supabase.from('messages').insert({
      sender_id: user.id,
      beth_habad_id: location.id,
      beth_habad_name: location.beth_habad_name,
      content: messageContent.trim(),
    })

    if (error) {
      setMessageError("Le message n'a pas pu être envoyé. Réessayez.")
      setSending(false)
      return
    }

    setMessageSent(true)
    setMessageContent('')
    setSending(false)
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
              {copied ? 'Copié !' : 'Copier l’adresse'}
            </Button>
          </div>
        </div>

        {/* Section message */}
        <div className="bg-white rounded-2xl ring-1 ring-border p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="h-5 w-5 text-primary" />
            <h2 className="text-base font-semibold text-foreground">
              Envoyer un message à ce Beth Habad
            </h2>
          </div>

          {!user ? (
            <p className="text-sm text-muted-foreground">
              <Link href="/login" className="text-primary hover:underline font-medium">
                Connectez-vous
              </Link>{' '}
              pour envoyer un message à ce centre.
            </p>
          ) : messageSent ? (
            <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm">
              <span className="font-medium">Message envoyé !</span>
              <span className="text-green-600">Il apparaîtra dans votre messagerie.</span>
              <button
                type="button"
                onClick={() => setMessageSent(false)}
                className="ml-auto text-green-600 hover:underline text-xs"
              >
                Envoyer un autre
              </button>
            </div>
          ) : (
            <form onSubmit={handleSendMessage} className="space-y-3">
              {messageError && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                  {messageError}
                </p>
              )}
              <textarea
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                rows={4}
                required
                placeholder={`Écrivez votre message pour ${location.beth_habad_name}…`}
                className="w-full px-3 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none"
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={sending || !messageContent.trim()}
                  className="flex items-center gap-2 rounded-full"
                >
                  <Send className="h-4 w-4" />
                  {sending ? 'Envoi…' : 'Envoyer'}
                </Button>
              </div>
            </form>
          )}
        </div>

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
