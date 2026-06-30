'use client'

import { useState } from 'react'
import { Mail, MessageSquare, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Pas de backend de messagerie pour l'instant : on confirme simplement la réception côté UI.
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-muted/40">
      <div className="brand-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold tracking-tight">Contact</h1>
          <p className="text-white/80 mt-1">
            Une question, une suggestion, un Beth Habad à signaler ? Écrivez-nous.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-2xl ring-1 ring-border p-5">
            <Mail className="h-5 w-5 text-primary mb-3" />
            <h3 className="font-medium text-foreground mb-1">Par email</h3>
            <p className="text-sm text-muted-foreground">contact@chlouhin.com</p>
          </div>
          <div className="bg-white rounded-2xl ring-1 ring-border p-5">
            <MessageSquare className="h-5 w-5 text-primary mb-3" />
            <h3 className="font-medium text-foreground mb-1">Réponse rapide</h3>
            <p className="text-sm text-muted-foreground">Sous 48h en moyenne</p>
          </div>
          <div className="bg-white rounded-2xl ring-1 ring-border p-5">
            <MapPin className="h-5 w-5 text-primary mb-3" />
            <h3 className="font-medium text-foreground mb-1">Signaler une erreur</h3>
            <p className="text-sm text-muted-foreground">Adresse, horaires ou contact incorrects</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl ring-1 ring-border p-6 md:p-8 max-w-2xl mx-auto">
          {sent ? (
            <div className="text-center py-8">
              <div className="text-green-600 text-5xl mb-4">✓</div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Message envoyé !</h2>
              <p className="text-muted-foreground">
                Merci, nous reviendrons vers vous dès que possible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Nom</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Votre nom"
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
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full px-3 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Comment pouvons-nous vous aider ?"
                  required
                />
              </div>

              <Button type="submit" className="w-full rounded-full">
                Envoyer le message
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
