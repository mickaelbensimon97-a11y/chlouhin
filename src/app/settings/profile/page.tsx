import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function ProfileSettingsPage() {
  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-muted/40">
      <div className="brand-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold tracking-tight">Paramètres du profil</h1>
          <p className="text-white/80 mt-1">Gérez vos informations personnelles</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="space-y-5">
          <Card className="border-0 ring-1 ring-border rounded-2xl">
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
              <CardDescription>
                Mettez à jour vos informations de base
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Prénom</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                    defaultValue="Jean"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Nom</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                    defaultValue="Dupont"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  defaultValue="jean.dupont@email.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Téléphone</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="+33 6 12 34 56 78"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Bio</label>
                <textarea
                  className="w-full px-3 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                  placeholder="Parlez-vous brièvement..."
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 ring-1 ring-border rounded-2xl">
            <CardHeader>
              <CardTitle>Type de compte</CardTitle>
              <CardDescription>
                Définissez votre type de compte principal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-foreground">
                  <input type="radio" name="account-type" defaultChecked />
                  <span>Voyageur</span>
                </label>
                <label className="flex items-center space-x-2 text-foreground">
                  <input type="radio" name="account-type" />
                  <span>Chaliah (Rabbin émissaire)</span>
                </label>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button className="rounded-full px-6">Enregistrer les modifications</Button>
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
