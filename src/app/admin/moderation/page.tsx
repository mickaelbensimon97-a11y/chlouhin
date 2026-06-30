import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function AdminModerationPage() {
  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-muted/40">
      <div className="brand-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold tracking-tight">Modération des contenus</h1>
          <p className="text-white/80 mt-1">Gérez les contenus signalés et modérez les publications</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="space-y-5">
          <Card className="border-0 ring-1 ring-border rounded-2xl">
            <CardHeader>
              <CardTitle>Contenus signalés</CardTitle>
              <CardDescription>
                Publications et profils signalés par la communauté
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="ring-1 ring-border rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-foreground">Annonce - Beth Habad Lyon</h3>
                      <p className="text-sm text-muted-foreground">Signalé par: utilisateur.anonyme@email.com</p>
                      <p className="text-xs text-muted-foreground/70">Il y a 1 heure</p>
                    </div>
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                      Signalé
                    </span>
                  </div>
                  <p className="text-sm text-foreground/80 mb-2">
                    Raison: Contenu inapproprié
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    &quot;Information incorrecte sur les horaires des offices...&quot;
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="rounded-full">Voir le contenu</Button>
                    <Button size="sm" className="rounded-full">Supprimer</Button>
                    <Button size="sm" variant="outline" className="rounded-full">Ignorer le signalement</Button>
                  </div>
                </div>

                <div className="ring-1 ring-border rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-foreground">Message conversation privée</h3>
                      <p className="text-sm text-muted-foreground">Signalé par: sarah.levy@email.com</p>
                      <p className="text-xs text-muted-foreground/70">Il y a 3 heures</p>
                    </div>
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                      Signalé
                    </span>
                  </div>
                  <p className="text-sm text-foreground/80 mb-2">
                    Raison: Harcèlement
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    &quot;Messages répétés et non sollicités...&quot;
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="rounded-full">Voir la conversation</Button>
                    <Button size="sm" className="rounded-full">Sanctionner l&apos;utilisateur</Button>
                    <Button size="sm" variant="outline" className="rounded-full">Ignorer le signalement</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 ring-1 ring-border rounded-2xl">
            <CardHeader>
              <CardTitle>Queue de modération</CardTitle>
              <CardDescription>
                Nouveaux contenus nécessitant une validation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="ring-1 ring-border rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-foreground">Nouveau profil Chaliah</h3>
                      <p className="text-sm text-muted-foreground">Soumis par: mohamed.benali@email.com</p>
                      <p className="text-xs text-muted-foreground/70">Il y a 30 minutes</p>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      En attente
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Profil de rabbin émissaire nécessitant validation
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="rounded-full">Examiner</Button>
                    <Button size="sm" className="rounded-full">Approuver</Button>
                    <Button size="sm" variant="destructive" className="rounded-full">Rejeter</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 ring-1 ring-border rounded-2xl">
            <CardHeader>
              <CardTitle>Actions récentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-foreground">Suppression d&apos;un contenu signalé</span>
                  <span className="text-muted-foreground">Il y a 2h</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-foreground">Validation d&apos;un profil Chaliah</span>
                  <span className="text-muted-foreground">Il y a 5h</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-foreground">Bannissement d&apos;un utilisateur</span>
                  <span className="text-muted-foreground">Hier</span>
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
