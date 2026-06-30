import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function ConversationPage({ params }: { params: { id: string } }) {
  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Conversation</h1>
              <p className="text-gray-600 mt-1">ID: {params.id}</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/dashboard/messages">Retour aux messages</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="border-b">
            <CardTitle className="text-lg">Rabbin Cohen</CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col py-4">
            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto">
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 max-w-[70%]">
                  <p className="text-sm">Bonjour, je suis de passage dans votre ville la semaine prochaine. Y aura-t-il des offices?</p>
                  <p className="text-xs text-gray-500 mt-1">14:30</p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <div className="bg-blue-600 text-white rounded-lg p-3 max-w-[70%]">
                  <p className="text-sm">Bienvenue! Oui, nous avons offices tous les jours. Venez nous voir au Beth Habad.</p>
                  <p className="text-xs text-blue-100 mt-1">14:35</p>
                </div>
              </div>
              
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 max-w-[70%]">
                  <p className="text-sm">Merci beaucoup! Quelle est l&apos;adresse exacte?</p>
                  <p className="text-xs text-gray-500 mt-1">14:40</p>
                </div>
              </div>
            </div>
            
            {/* Zone de saisie */}
            <div className="border-t pt-4">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Écrivez votre message..."
                />
                <Button>Envoyer</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </ProtectedRoute>
  );
}
