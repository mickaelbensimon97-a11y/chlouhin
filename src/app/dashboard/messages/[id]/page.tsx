'use client'

import { useEffect, useRef, useState, Suspense } from 'react'
import { useSearchParams, usePathname } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Send, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/components/auth/auth-provider'
import { ProtectedRoute } from '@/components/auth/protected-route'

interface Message {
  id: number
  content: string
  created_at: string
}

function formatDate(iso: string) {
  const d = new Date(iso)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
  if (days === 1) return 'Hier'
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

function ConversationContent() {
  const { user } = useAuth()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Extraire l'ID depuis le chemin /dashboard/messages/[id]
  const bethHabadId = pathname.split('/').pop() || ''

  const [messages, setMessages] = useState<Message[]>([])
  const [bethHabadName, setBethHabadName] = useState(
    decodeURIComponent(searchParams.get('name') || '')
  )
  const [content, setContent] = useState('')
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState('')
  const [loading, setLoading] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!user || !bethHabadId) return
    async function load() {
      const { data } = await supabase
        .from('messages')
        .select('id, content, created_at, beth_habad_name')
        .eq('sender_id', user!.id)
        .eq('beth_habad_id', bethHabadId)
        .order('created_at', { ascending: true })

      if (data && data.length > 0) {
        setBethHabadName(data[0].beth_habad_name)
        setMessages(data as Message[])
      } else if (!searchParams.get('name')) {
        // Fallback : récupérer le nom depuis shlouhim si pas dans l'URL
        const { data: loc } = await supabase
          .from('shlouhim')
          .select('beth_habad_name')
          .eq('id', bethHabadId)
          .maybeSingle()
        if (loc) setBethHabadName(loc.beth_habad_name)
      }
      setLoading(false)
    }
    load()
  }, [user, bethHabadId, searchParams])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !content.trim() || !bethHabadId) return
    setSending(true)
    setSendError('')

    const numericId = parseInt(bethHabadId, 10)
    if (isNaN(numericId)) {
      setSendError('Identifiant de centre invalide. Revenez depuis la fiche Beth Habad.')
      setSending(false)
      return
    }

    const { data, error } = await supabase
      .from('messages')
      .insert({
        sender_id: user.id,
        beth_habad_id: numericId,
        beth_habad_name: bethHabadName,
        content: content.trim(),
      })
      .select('id, content, created_at')
      .single()

    if (error) {
      setSendError(`Erreur : ${error.message}`)
    } else if (data) {
      setMessages((prev) => [...prev, data as Message])
      setContent('')
    }
    setSending(false)
  }

  return (
    <div className="min-h-screen bg-muted/40 flex flex-col">
      {/* Header */}
      <div className="brand-gradient text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <Link
            href="/dashboard/messages"
            className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white mb-3 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux messages
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold">{bethHabadName || 'Chargement…'}</h1>
              <Link
                href={`/beth-habad/${bethHabadId}`}
                className="text-xs text-white/70 hover:text-white transition-colors"
              >
                Voir la fiche →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Fil de messages */}
      <div className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-2xl ring-1 ring-border flex flex-col" style={{ minHeight: '480px' }}>
          <div className="flex-1 p-6 space-y-4 overflow-y-auto">
            {loading ? (
              <p className="text-center text-muted-foreground text-sm py-10">Chargement…</p>
            ) : messages.length === 0 ? (
              <div className="text-center text-muted-foreground text-sm py-10">
                <p className="mb-1">Aucun message envoyé à ce centre.</p>
                <p>Écrivez votre premier message ci-dessous.</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="flex justify-end">
                  <div className="max-w-[75%]">
                    <div className="brand-gradient text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed">
                      {msg.content}
                    </div>
                    <div className="flex items-center gap-1 justify-end mt-1">
                      <Clock className="h-3 w-3 text-muted-foreground/50" />
                      <span className="text-xs text-muted-foreground/60">
                        {formatDate(msg.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={bottomRef} />
          </div>

          {/* Zone de saisie */}
          <div className="border-t border-border p-4 space-y-2">
            {sendError && (
              <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                {sendError}
              </p>
            )}
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={`Écrire à ${bethHabadName || 'ce Beth Habad'}…`}
                className="flex-1 px-4 py-2.5 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                disabled={sending}
              />
              <Button
                type="submit"
                size="icon"
                disabled={sending || !content.trim()}
                className="rounded-full shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ConversationPage() {
  return (
    <ProtectedRoute>
      <Suspense fallback={<div className="min-h-screen brand-gradient" />}>
        <ConversationContent />
      </Suspense>
    </ProtectedRoute>
  )
}
