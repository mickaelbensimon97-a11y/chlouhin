'use client'

import { useState } from 'react'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { signUp } from '@/lib/auth'
import { supabase } from '@/lib/supabase'

type UserType = 'traveler' | 'chaliah'

export default function SignupPage() {
  const [userType, setUserType] = useState<UserType>('traveler')

  // Champs communs
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Champs voyageur
  const [fullName, setFullName] = useState('')

  // Champs chaliah
  const [prenom, setPrenom] = useState('')
  const [nom, setNom] = useState('')
  const [telephone, setTelephone] = useState('')
  const [pays, setPays] = useState('')
  const [ville, setVille] = useState('')
  const [adresse, setAdresse] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const displayName = userType === 'chaliah' ? `${prenom} ${nom}` : fullName

    const { data, error: authError } = await signUp(email, password, displayName, userType)

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    // Si chaliah : sauvegarder le profil dans chaliah_profiles
    if (userType === 'chaliah' && data?.user) {
      const { error: profileError } = await supabase
        .from('chaliah_profiles')
        .insert({
          user_id: data.user.id,
          prenom,
          nom,
          email,
          telephone,
          pays,
          ville,
          adresse,
        })

      if (profileError) {
        setError(`Compte créé mais erreur profil : ${profileError.message}`)
        setLoading(false)
        return
      }
    }

    if (data?.user) {
      setSuccess(true)
      setLoading(false)
      setTimeout(() => router.push('/login'), 3000)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-muted/40 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl ring-1 ring-border p-8 text-center">
          <div className="text-5xl mb-4">✓</div>
          <h2 className="text-xl font-semibold mb-2 text-foreground">Inscription réussie !</h2>
          <p className="text-muted-foreground mb-2">
            Vérifiez votre email pour confirmer votre compte.
          </p>
          {userType === 'chaliah' && (
            <p className="text-sm text-muted-foreground/70">
              Votre dossier sera examiné et votre Beth Habad sera ajouté à l&apos;annuaire.
            </p>
          )}
          <p className="text-xs text-muted-foreground/50 mt-4">
            Redirection vers la connexion…
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/40 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl ring-1 ring-border overflow-hidden">
        {/* Header */}
        <div className="brand-gradient text-white text-center py-8 px-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-lg font-bold mx-auto mb-3">
            🕯️
          </span>
          <h1 className="text-2xl font-bold">Inscription</h1>
          <p className="text-white/80 mt-1 text-sm">Rejoignez la communauté ChlouhIN</p>
        </div>

        <div className="p-6">
          {/* Sélecteur de type */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setUserType('traveler')}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl ring-1 transition-all duration-150 text-sm font-medium ${
                userType === 'traveler'
                  ? 'ring-primary bg-primary/5 text-primary'
                  : 'ring-border text-muted-foreground hover:ring-primary/30'
              }`}
            >
              <span className="text-2xl">✈️</span>
              Voyageur
              <span className="text-xs font-normal text-muted-foreground">
                Trouver un Beth Habad
              </span>
            </button>
            <button
              type="button"
              onClick={() => setUserType('chaliah')}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl ring-1 transition-all duration-150 text-sm font-medium ${
                userType === 'chaliah'
                  ? 'ring-primary bg-primary/5 text-primary'
                  : 'ring-border text-muted-foreground hover:ring-primary/30'
              }`}
            >
              <span className="text-2xl">🕍</span>
              Chaliah
              <span className="text-xs font-normal text-muted-foreground">
                Inscrire mon Beth Habad
              </span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl">
                {error}
              </div>
            )}

            {/* Champs selon le type */}
            {userType === 'traveler' ? (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Nom complet</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  placeholder="Jean Dupont"
                  required
                />
              </div>
            ) : (
              <>
                <p className="text-xs text-muted-foreground bg-blue-50 border border-blue-100 rounded-xl px-3 py-2">
                  Ces informations seront utilisées pour référencer votre Beth Habad dans l&apos;annuaire.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Prénom</label>
                    <input
                      type="text"
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                      className="w-full px-3 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                      placeholder="Menahem"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Nom</label>
                    <input
                      type="text"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      className="w-full px-3 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                      placeholder="Levy"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Téléphone</label>
                  <input
                    type="tel"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    className="w-full px-3 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Pays</label>
                    <input
                      type="text"
                      value={pays}
                      onChange={(e) => setPays(e.target.value)}
                      className="w-full px-3 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                      placeholder="France"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Ville</label>
                    <input
                      type="text"
                      value={ville}
                      onChange={(e) => setVille(e.target.value)}
                      className="w-full px-3 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                      placeholder="Paris"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Adresse</label>
                  <input
                    type="text"
                    value={adresse}
                    onChange={(e) => setAdresse(e.target.value)}
                    className="w-full px-3 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    placeholder="12 rue de la Paix"
                    required
                  />
                </div>
              </>
            )}

            {/* Email + mot de passe (communs) */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                placeholder="votre@email.com"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            <Button type="submit" className="w-full rounded-full mt-2" disabled={loading}>
              {loading
                ? 'Inscription…'
                : userType === 'chaliah'
                  ? 'Inscrire mon Beth Habad'
                  : "S'inscrire"}
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Déjà un compte ? </span>
              <Link href="/login" className="text-primary hover:underline">
                Se connecter
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
