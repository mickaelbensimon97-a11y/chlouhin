'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, X, Mail, Phone, MapPin, Clock, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/components/auth/auth-provider'

const ADMIN_EMAIL = 'ohaleihabad@gmail.com'

interface ChaliaProfile {
  id: number
  user_id: string
  prenom: string
  nom: string
  email: string
  telephone: string | null
  pays: string
  ville: string
  adresse: string
  statut: 'en_attente' | 'valide' | 'rejete'
  created_at: string
}

interface ContactMessage {
  id: number
  name: string
  email: string
  message: string
  created_at: string
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}

const statutLabel: Record<string, { label: string; classes: string }> = {
  en_attente: { label: 'En attente', classes: 'bg-amber-50 text-amber-700 ring-amber-200' },
  valide:     { label: 'Validé',     classes: 'bg-green-50 text-green-700 ring-green-200' },
  rejete:     { label: 'Rejeté',     classes: 'bg-red-50 text-red-700 ring-red-200' },
}

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [tab, setTab] = useState<'chaliah' | 'contact'>('chaliah')
  const [profiles, setProfiles] = useState<ChaliaProfile[]>([])
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<number | null>(null)

  // Garde admin
  useEffect(() => {
    if (!authLoading && (!user || user.email !== ADMIN_EMAIL)) {
      router.replace('/dashboard')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (!user || user.email !== ADMIN_EMAIL) return

    async function fetchAll() {
      const [{ data: p }, { data: c }] = await Promise.all([
        supabase
          .from('chaliah_profiles')
          .select('*')
          .order('created_at', { ascending: false }),
        supabase
          .from('contact_messages')
          .select('*')
          .order('created_at', { ascending: false }),
      ])
      setProfiles((p as ChaliaProfile[]) || [])
      setContactMessages((c as ContactMessage[]) || [])
      setLoading(false)
    }

    fetchAll()
  }, [user])

  const updateStatut = async (id: number, statut: 'valide' | 'rejete') => {
    setUpdating(id)
    await supabase.from('chaliah_profiles').update({ statut }).eq('id', id)
    setProfiles((prev) => prev.map((p) => p.id === id ? { ...p, statut } : p))
    setUpdating(null)
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen brand-gradient flex items-center justify-center">
        <div className="text-white text-sm">Chargement…</div>
      </div>
    )
  }

  if (!user || user.email !== ADMIN_EMAIL) return null

  const enAttente = profiles.filter((p) => p.statut === 'en_attente').length

  return (
    <div className="min-h-screen bg-muted/40">
      {/* Header */}
      <div className="brand-gradient text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold tracking-tight">Administration</h1>
          <p className="text-white/80 mt-1 text-sm">Espace réservé — ChlouhIN</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl ring-1 ring-border p-5 text-center">
            <p className="text-3xl font-bold text-foreground">{profiles.length}</p>
            <p className="text-sm text-muted-foreground mt-1">Inscriptions Chaliah</p>
          </div>
          <div className="bg-white rounded-2xl ring-1 ring-border p-5 text-center">
            <p className="text-3xl font-bold text-amber-600">{enAttente}</p>
            <p className="text-sm text-muted-foreground mt-1">En attente</p>
          </div>
          <div className="bg-white rounded-2xl ring-1 ring-border p-5 text-center">
            <p className="text-3xl font-bold text-foreground">{contactMessages.length}</p>
            <p className="text-sm text-muted-foreground mt-1">Messages contact</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab('chaliah')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              tab === 'chaliah'
                ? 'brand-gradient text-white shadow-sm'
                : 'bg-white ring-1 ring-border text-muted-foreground hover:ring-primary/30'
            }`}
          >
            Inscriptions Chaliah
            {enAttente > 0 && (
              <span className="ml-2 bg-white/25 text-white text-xs px-1.5 py-0.5 rounded-full">
                {enAttente}
              </span>
            )}
          </button>
          <button
            onClick={() => setTab('contact')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              tab === 'contact'
                ? 'brand-gradient text-white shadow-sm'
                : 'bg-white ring-1 ring-border text-muted-foreground hover:ring-primary/30'
            }`}
          >
            Messages de contact
          </button>
        </div>

        {/* Contenu */}
        {tab === 'chaliah' && (
          <div className="space-y-4">
            {profiles.length === 0 ? (
              <div className="bg-white rounded-2xl ring-1 ring-border p-10 text-center text-muted-foreground">
                Aucune inscription pour l&apos;instant.
              </div>
            ) : (
              profiles.map((p) => {
                const s = statutLabel[p.statut] || statutLabel.en_attente
                return (
                  <div key={p.id} className="bg-white rounded-2xl ring-1 ring-border p-6">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="space-y-2 flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="font-semibold text-foreground">
                            {p.prenom} {p.nom}
                          </h3>
                          <span className={`text-xs px-2.5 py-1 rounded-full ring-1 font-medium ${s.classes}`}>
                            {s.label}
                          </span>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Mail className="h-3.5 w-3.5 shrink-0" />
                            {p.email}
                          </span>
                          {p.telephone && (
                            <span className="flex items-center gap-1.5">
                              <Phone className="h-3.5 w-3.5 shrink-0" />
                              {p.telephone}
                            </span>
                          )}
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 shrink-0" />
                            {p.adresse}, {p.ville}, {p.pays}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 shrink-0" />
                            {formatDate(p.created_at)}
                          </span>
                        </div>
                      </div>

                      {p.statut === 'en_attente' && (
                        <div className="flex gap-2 shrink-0">
                          <Button
                            size="sm"
                            className="rounded-full gap-1.5 bg-green-600 hover:bg-green-700"
                            disabled={updating === p.id}
                            onClick={() => updateStatut(p.id, 'valide')}
                          >
                            <Check className="h-3.5 w-3.5" />
                            Valider
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-full gap-1.5 text-red-600 border-red-200 hover:bg-red-50"
                            disabled={updating === p.id}
                            onClick={() => updateStatut(p.id, 'rejete')}
                          >
                            <X className="h-3.5 w-3.5" />
                            Rejeter
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        )}

        {tab === 'contact' && (
          <div className="space-y-4">
            {contactMessages.length === 0 ? (
              <div className="bg-white rounded-2xl ring-1 ring-border p-10 text-center text-muted-foreground">
                Aucun message pour l&apos;instant.
              </div>
            ) : (
              contactMessages.map((msg) => (
                <div key={msg.id} className="bg-white rounded-2xl ring-1 ring-border p-6">
                  <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full brand-gradient flex items-center justify-center shrink-0">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{msg.name}</p>
                        <a
                          href={`mailto:${msg.email}`}
                          className="text-xs text-primary hover:underline"
                        >
                          {msg.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">
                        {formatDate(msg.created_at)}
                      </span>
                      <a
                        href={`mailto:${msg.email}?subject=Re: votre message ChlouhIN`}
                        className="inline-flex items-center gap-1.5 text-xs bg-primary text-white px-3 py-1.5 rounded-full hover:bg-primary/90 transition-colors"
                      >
                        <Mail className="h-3 w-3" />
                        Répondre
                      </a>
                    </div>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed bg-muted/40 rounded-xl px-4 py-3">
                    {msg.message}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
