import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function MessagesPage() {
  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-muted/40">
      <div className="brand-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
          <p className="text-white/80 mt-1">Votre messagerie</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-5">
          {/* Liste des conversations */}
          <div className="lg:col-span-1">
            <Card className="border-0 ring-1 ring-border rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg">Conversations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="p-3 hover:bg-muted rounded-xl cursor-pointer ring-1 ring-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Rabbin Cohen</p>
                      <p className="text-sm text-muted-foreground truncate">Bonjour, je...</p>
                    </div>
                    <div className="text-xs text-muted-foreground/70">14:30</div>
                  </div>
                </div>

                <div className="p-3 hover:bg-muted rounded-xl cursor-pointer ring-1 ring-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Sarah Levy</p>
                      <p className="text-sm text-muted-foreground truncate">Merci pour...</p>
                    </div>
                    <div className="text-xs text-muted-foreground/70">Hier</div>
                  </div>
                </div>

                <div className="p-3 hover:bg-muted rounded-xl cursor-pointer ring-1 ring-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">David Benaim</p>
                      <p className="text-sm text-muted-foreground truncate">Question sur...</p>
                    </div>
                    <div className="text-xs text-muted-foreground/70">2j</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Zone de conversation */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col border-0 ring-1 ring-border rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg">Sélectionnez une conversation</CardTitle>
                <CardDescription>
                  Choisissez une conversation dans la liste pour commencer à discuter
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <p>Aucune conversation sélectionnée</p>
                  <p className="text-sm mt-2">Cliquez sur une conversation pour l&apos;afficher</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
