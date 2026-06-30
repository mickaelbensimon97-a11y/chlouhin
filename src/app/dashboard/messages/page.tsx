'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { MessageSquare, ArrowLeft, Clock } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/components/auth/auth-provider'
import { ProtectedRoute } from '@/components/auth/protected-route'

interface Message {
  id: number
  beth_habad_id: number
  beth_habad_name: string
  content: string
  created_at: string
}

interface Conversation {
  beth_habad_id: number
  beth_habad_name: string
  lastMessage: string
  lastDate: string
  messages: Message[]
}

function formatDate(iso: string) {
  const d = new Date(iso)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
  if (days === 1) return 'Hier'
  if (days < 7) return `Il y a ${days}j`
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

function MessagesContent() {
  const { user } = useAuth()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selected, setSelected] = useState<Conversation | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    async function fetchMessages() {
      const { data } = await supabase
        .from('messages')
        .select('id, beth_habad_id, beth_habad_name, content, created_at')
        .eq('sender_id', user!.id)
        .order('created_at', { ascending: false })

      if (data) {
        // Grouper par beth_habad_id
        const map = new Map<number, Conversation>()
        for (const msg of data as Message[]) {
          if (!map.has(msg.beth_habad_id)) {
            map.set(msg.beth_habad_id, {
              beth_habad_id: msg.beth_habad_id,
              beth_habad_name: msg.beth_habad_name,
              lastMessage: msg.content,
              lastDate: msg.created_at,
              messages: [],
            })
          }
          map.get(msg.beth_habad_id)!.messages.push(msg)
        }
        const convos = Array.from(map.values())
        setConversations(convos)
        if (convos.length > 0) setSelected(convos[0])
      }
      setLoading(false)
    }

    fetchMessages()
  }, [user])

  return (
    <div className="min-h-screen bg-muted/40">
      <div className="brand-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
          <p className="text-white/80 mt-1">Vos messages envoyés aux Beth Habad</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Chargement…</div>
        ) : conversations.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl ring-1 ring-border">
            <MessageSquare className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-foreground font-medium mb-1">Aucun message envoyé</p>
            <p className="text-sm text-muted-foreground mb-5">
              Visitez une fiche Beth Habad pour envoyer votre premier message.
            </p>
            <Link
              href="/annuaire"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Parcourir l&apos;annuaire
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-5">
            {/* Liste des conversations */}
            <div className="lg:col-span-1 space-y-2">
              {conversations.map((conv) => (
                <button
                  key={conv.beth_habad_id}
                  type="button"
                  onClick={() => setSelected(conv)}
                  className={`w-full text-left p-4 rounded-2xl ring-1 transition-all duration-150 ${
                    selected?.beth_habad_id === conv.beth_habad_id
                      ? 'bg-primary/5 ring-primary/40'
                      : 'bg-white ring-border hover:ring-primary/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-foreground text-sm truncate">
                      {conv.beth_habad_name}
                    </p>
                    <span className="text-xs text-muted-foreground/70 shrink-0">
                      {formatDate(conv.lastDate)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 truncate">
                    {conv.lastMessage}
                  </p>
                </button>
              ))}
            </div>

            {/* Détail de la conversation */}
            <div className="lg:col-span-2">
              {selected ? (
                <div className="bg-white rounded-2xl ring-1 ring-border flex flex-col" style={{ minHeight: '480px' }}>
                  <div className="px-6 py-4 border-b border-border">
                    <p className="font-semibold text-foreground">{selected.beth_habad_name}</p>
                    <Link
                      href={`/beth-habad/${selected.beth_habad_id}`}
                      className="text-xs text-primary hover:underline"
                    >
                      Voir la fiche →
                    </Link>
                  </div>

                  <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                    {[...selected.messages].reverse().map((msg) => (
                      <div key={msg.id} className="flex justify-end">
                        <div className="max-w-[75%]">
                          <div className="brand-gradient text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm">
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
                    ))}
                  </div>

                  <div className="px-6 py-4 border-t border-border">
                    <Link
                      href={`/beth-habad/${selected.beth_habad_id}`}
                      className="block w-full text-center text-sm text-primary hover:underline"
                    >
                      Envoyer un nouveau message →
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function MessagesPage() {
  return (
    <ProtectedRoute>
      <MessagesContent />
    </ProtectedRoute>
  )
}
