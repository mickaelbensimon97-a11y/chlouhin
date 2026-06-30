'use client'

import { useState } from 'react'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { signUp } from '@/lib/auth'

export default function SignupPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState<'traveler' | 'chaliah'>('traveler')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error: authError } = await signUp(email, password, fullName, userType)

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    if (data?.user) {
      setSuccess(true)
      setLoading(false)
      // Rediriger vers la page de connexion après 2 secondes
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-muted/40 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl ring-1 ring-border p-8 text-center">
          <div className="text-green-600 text-5xl mb-4">✓</div>
          <h2 className="text-xl font-semibold mb-2 text-foreground">Inscription réussie !</h2>
          <p className="text-muted-foreground mb-4">
            Vérifiez votre email pour confirmer votre compte.
          </p>
          <p className="text-sm text-muted-foreground/70">
            Redirection vers la page de connexion...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/40 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl ring-1 ring-border overflow-hidden">
        <div className="brand-gradient text-white text-center py-8 px-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-lg font-bold mx-auto mb-3">
            🕯️
          </span>
          <h1 className="text-2xl font-bold">Inscription</h1>
          <p className="text-white/80 mt-1 text-sm">
            Rejoignez la communauté ChlouhIN
          </p>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Nom complet</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Jean Dupont"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="votre@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Type de compte</label>
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value as 'traveler' | 'chaliah')}
                className="w-full px-3 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="traveler">Voyageur</option>
                <option value="chaliah">Chaliah (Rabbin émissaire)</option>
              </select>
            </div>

            <Button type="submit" className="w-full rounded-full" disabled={loading}>
              {loading ? 'Inscription...' : 'S\'inscrire'}
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Déjà un compte? </span>
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
