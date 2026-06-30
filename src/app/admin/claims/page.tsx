import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function AdminClaimsPage() {
  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-muted/40">
      <div className="brand-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold tracking-tight">Validation des claims</h1>
          <p className="text-white/80 mt-1">Gérez les demandes de validation des centres et profils</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="space-y-5">
          <Card className="border-0 ring-1 ring-border rounded-2xl">
            <CardHeader>
              <CardTitle>Claims en attente</CardTitle>
              <CardDescription>
                Demandes de validation de centres Beth Habad et profils Chaliah
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="ring-1 ring-border rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-foreground">Beth Habad de Paris Centre</h3>
                      <p className="text-sm text-muted-foreground">Soumis par: rabbin.cohen@email.com</p>
                      <p className="text-xs text-muted-foreground/70">Il y a 2 jours</p>
                    </div>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                      En attente
                    </span>
                  </div>
                  <p className="text-sm text-foreground/80 mb-3">
                    Demande de création d&apos;un nouveau centre Beth Habad dans le centre de Paris
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="rounded-full">Voir les détails</Button>
                    <Button size="sm" className="rounded-full">Approuver</Button>
                    <Button size="sm" variant="destructive" className="rounded-full">Rejeter</Button>
                  </div>
                </div>

                <div className="ring-1 ring-border rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-foreground">Profil Chaliah - David Levy</h3>
                      <p className="text-sm text-muted-foreground">Soumis par: david.levy@email.com</p>
                      <p className="text-xs text-muted-foreground/70">Il y a 5 jours</p>
                    </div>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                      En attente
                    </span>
                  </div>
                  <p className="text-sm text-foreground/80 mb-3">
                    Validation du statut de Chaliah pour le rabbin David Levy
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="rounded-full">Voir les détails</Button>
                    <Button size="sm" className="rounded-full">Approuver</Button>
                    <Button size="sm" variant="destructive" className="rounded-full">Rejeter</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 ring-1 ring-border rounded-2xl">
            <CardHeader>
              <CardTitle>Statistiques</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">12</div>
                  <p className="text-sm text-muted-foreground">En attente</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">156</div>
                  <p className="text-sm text-muted-foreground">Approuvés</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">8</div>
                  <p className="text-sm text-muted-foreground">Rejetés</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
