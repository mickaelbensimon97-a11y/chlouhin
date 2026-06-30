import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function NotificationsSettingsPage() {
  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-muted/40">
      <div className="brand-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-white/80 mt-1">Gérez vos préférences de notification</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="space-y-5">
          <Card className="border-0 ring-1 ring-border rounded-2xl">
            <CardHeader>
              <CardTitle>Notifications par email</CardTitle>
              <CardDescription>
                Choisissez les notifications que vous souhaitez recevoir par email
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Nouveaux messages</p>
                  <p className="text-sm text-muted-foreground">Soyez notifié lorsque vous recevez un nouveau message</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Annonces des Beth Habad</p>
                  <p className="text-sm text-muted-foreground">Recevez les annonces des centres que vous suivez</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Nouveaux Chaliah dans votre région</p>
                  <p className="text-sm text-muted-foreground">Découvrez les nouveaux rabbins émissaires près de chez vous</p>
                </div>
                <input type="checkbox" className="w-4 h-4 accent-primary" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Newsletter mensuelle</p>
                  <p className="text-sm text-muted-foreground">Recevez un résumé des actualités du réseau</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 ring-1 ring-border rounded-2xl">
            <CardHeader>
              <CardTitle>Notifications push</CardTitle>
              <CardDescription>
                Notifications sur votre navigateur ou appareil mobile
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Messages instantanés</p>
                  <p className="text-sm text-muted-foreground">Recevez une alerte immédiate pour les nouveaux messages</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Rappels d&apos;événements</p>
                  <p className="text-sm text-muted-foreground">Soyez rappelé des événements à venir</p>
                </div>
                <input type="checkbox" className="w-4 h-4 accent-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 ring-1 ring-border rounded-2xl">
            <CardHeader>
              <CardTitle>Fréquence des notifications</CardTitle>
              <CardDescription>
                Choisissez la fréquence de réception des notifications groupées
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-foreground">
                  <input type="radio" name="frequency" />
                  <span>Immédiat</span>
                </label>
                <label className="flex items-center space-x-2 text-foreground">
                  <input type="radio" name="frequency" defaultChecked />
                  <span>Quotidien</span>
                </label>
                <label className="flex items-center space-x-2 text-foreground">
                  <input type="radio" name="frequency" />
                  <span>Hebdomadaire</span>
                </label>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button className="rounded-full px-6">Enregistrer les préférences</Button>
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
