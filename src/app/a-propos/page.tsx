import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Globe, Heart, MapPin, Users } from "lucide-react";

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-muted/40">
      <div className="relative overflow-hidden brand-gradient text-white">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-sm font-medium mb-5">
            🕯️ Notre mission
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Connecter chaque voyageur à une communauté
          </h1>
          <p className="text-lg text-white/85 max-w-2xl mx-auto">
            ChlouhIN existe pour qu&apos;aucun voyageur juif ne se sente seul, où qu&apos;il se trouve dans le monde.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose-none space-y-6 text-foreground/90 leading-relaxed">
          <p>
            Depuis des décennies, les Chaliah (rabbins émissaires) s&apos;installent dans des villes du monde entier pour
            ouvrir des Beth Habad : des lieux d&apos;accueil, de prière et d&apos;entraide ouverts à tous. Mais pour un
            voyageur de passage, savoir qu&apos;un centre existe à destination n&apos;est pas toujours simple.
          </p>
          <p>
            ChlouhIN a été créé pour combler ce manque : une carte et un annuaire à jour, pensés pour qu&apos;un
            voyageur puisse trouver en quelques secondes le Beth Habad le plus proche, prendre contact, et s&apos;y
            rendre en confiance.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 mt-12">
          {[
            { icon: MapPin, title: "Localiser", description: "Des milliers de centres référencés et géolocalisés dans le monde entier." },
            { icon: Users, title: "Connecter", description: "Un contact direct avec les Chaliah, sans intermédiaire." },
            { icon: Heart, title: "Accueillir", description: "Une communauté qui s'agrandit, centre après centre." },
          ].map(({ icon: Icon, title, description }) => (
            <div key={title} className="bg-white rounded-2xl ring-1 ring-border p-6 text-center">
              <div className="w-12 h-12 rounded-2xl brand-gradient flex items-center justify-center mx-auto mb-4">
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-2xl ring-1 ring-border p-8 text-center">
          <Globe className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Vous êtes Chaliah ?</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Inscrivez votre Beth Habad et faites-le connaître auprès des voyageurs qui passent près de chez vous.
          </p>
          <Button asChild className="rounded-full px-6">
            <Link href="/signup">Inscrire mon Beth Habad</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
