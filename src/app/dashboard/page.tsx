import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-muted/40">
        <div className="brand-gradient text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold tracking-tight">Tableau de bord</h1>
            <p className="text-white/80 mt-1">Bienvenue sur votre espace personnel</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <Card className="border-0 ring-1 ring-border rounded-2xl">
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>
                  Votre messagerie
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold brand-gradient-text mb-2">3</div>
                <p className="text-sm text-muted-foreground mb-4">Messages non lus</p>
                <Button asChild className="w-full rounded-full">
                  <Link href="/dashboard/messages">Voir les messages</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 ring-1 ring-border rounded-2xl">
              <CardHeader>
                <CardTitle>Profil</CardTitle>
                <CardDescription>
                  Gérez votre profil
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Mettez à jour vos informations personnelles et vos préférences
                </p>
                <Button variant="outline" asChild className="w-full rounded-full">
                  <Link href="/settings/profile">Modifier le profil</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 ring-1 ring-border rounded-2xl">
              <CardHeader>
                <CardTitle>Beth Habad</CardTitle>
                <CardDescription>
                  Gestion de votre centre
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Publiez des annonces et gérez les événements
                </p>
                <Button variant="outline" className="w-full rounded-full">
                  Gérer le centre
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card className="border-0 ring-1 ring-border rounded-2xl">
              <CardHeader>
                <CardTitle>Activité récente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Aucune activité récente
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
