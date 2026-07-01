'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { MessageSquare, Settings, MapPin, Clock, CheckCircle, XCircle, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/components/auth/auth-provider'
import { ProtectedRoute } from '@/components/auth/protected-route'

const ADMIN_EMAIL = 'mickaelbensimon97@gmail.com'

interface ChaliaProfile {
  id: number
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

const statutConfig = {
  en_attente: {
    label: 'En attente de validation',
    icon: Clock,
    classes: 'bg-amber-50 text-amber-700 ring-amber-200',
    desc: 'Votre dossier est en cours d\'examen. Vous serez notifié dès validation.',
  },
  valide: {
    label: 'Inscription validée ✓',
    icon: CheckCircle,
    classes: 'bg-green-50 text-green-700 ring-green-200',
    desc: 'Votre Beth Habad est visible dans l\'annuaire ChlouhIN.',
  },
  rejete: {
    label: 'Inscription rejetée',
    icon: XCircle,
    classes: 'bg-red-50 text-red-700 ring-red-200',
    desc: 'Votre dossier n\'a pas été retenu. Contactez-nous pour plus d\'informations.',
  },
}

function DashboardContent() {
  const { user } = useAuth()
  const [chaliaProfile, setChaliaProfile] = useState<ChaliaProfile | null | undefined>(undefined)
  const isAdmin = user?.email === ADMIN_EMAIL
  const isChaliah = user?.user_metadata?.user_type === 'chaliah'

  useEffect(() => {
    if (!user || !isChaliah) {
      setChaliaProfile(null)
      return
    }
    supabase
      .from('chaliah_profiles')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle()
      .then(({ data }) => setChaliaProfile((data as ChaliaProfile) || null))
  }, [user, isChaliah])

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'vous'

  return (
    <div className="min-h-screen bg-muted/40">
      {/* Header */}
      <div className="brand-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold tracking-tight">
            Bonjour, {firstName} 👋
          </h1>
          <p className="text-white/80 mt-1">Bienvenue sur votre espace personnel</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-5">

        {/* Admin shortcut */}
        {isAdmin && (
          <Link
            href="/admin"
            className="flex items-center justify-between bg-primary text-white rounded-2xl px-6 py-4 hover:bg-primary/90 transition-colors"
          >
            <div>
              <p className="font-semibold">Espace administration</p>
              <p className="text-white/80 text-sm">Gérer les inscriptions et les messages</p>
            </div>
            <span className="text-2xl">→</span>
          </Link>
        )}

        {/* Section Chaliah — statut inscription */}
        {isChaliah && chaliaProfile !== undefined && (
          <div className="bg-white rounded-2xl ring-1 ring-border overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h2 className="font-semibold text-foreground">Mon Beth Habad</h2>
              {chaliaProfile && (
                <span className={`text-xs px-2.5 py-1 rounded-full ring-1 font-medium ${statutConfig[chaliaProfile.statut].classes}`}>
                  {statutConfig[chaliaProfile.statut].label}
                </span>
              )}
            </div>

            {!chaliaProfile ? (
              <div className="p-6 text-center text-muted-foreground text-sm">
                <p className="mb-3">Aucun profil trouvé.</p>
                <Link href="/signup" className="text-primary hover:underline text-sm">
                  Compléter l&apos;inscription →
                </Link>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                <p className={`text-sm px-4 py-2.5 rounded-xl ring-1 ${statutConfig[chaliaProfile.statut].classes}`}>
                  {statutConfig[chaliaProfile.statut].desc}
                </p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary/60 shrink-0" />
                    {chaliaProfile.email}
                  </span>
                  {chaliaProfile.telephone && (
                    <span className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary/60 shrink-0" />
                      {chaliaProfile.telephone}
                    </span>
                  )}
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary/60 shrink-0" />
                    {chaliaProfile.adresse}, {chaliaProfile.ville}, {chaliaProfile.pays}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Cartes principales */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="bg-white rounded-2xl ring-1 ring-border p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl brand-gradient mb-4">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Messages</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Vos échanges avec les Beth Habad
            </p>
            <Button asChild className="w-full rounded-full">
              <Link href="/dashboard/messages">Voir les messages</Link>
            </Button>
          </div>

          <div className="bg-white rounded-2xl ring-1 ring-border p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted mb-4">
              <Settings className="h-5 w-5 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Paramètres</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Modifier votre profil et votre mot de passe
            </p>
            <Button variant="outline" asChild className="w-full rounded-full">
              <Link href="/settings/profile">Modifier le profil</Link>
            </Button>
          </div>

          <div className="bg-white rounded-2xl ring-1 ring-border p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted mb-4">
              <MapPin className="h-5 w-5 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Annuaire</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Trouver un Beth Habad près de vous
            </p>
            <Button variant="outline" asChild className="w-full rounded-full">
              <Link href="/annuaire">Parcourir</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}
