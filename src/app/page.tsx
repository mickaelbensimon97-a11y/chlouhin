"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  MapPin,
  Users,
  Globe,
  Star,
  ArrowRight,
  Compass,
  ShieldCheck,
  Sparkles,
  Quote,
  HelpCircle,
} from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/map?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden brand-gradient text-white py-24 px-4 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-sm font-medium mb-5">
              🕯️ Réseau mondial des Beth Habad
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold mb-5 tracking-tight leading-[1.1]">
              Trouvez votre Beth Habad, partout dans le monde
            </h1>
            <p className="text-lg sm:text-xl text-white/85 mb-10 max-w-xl">
              Découvrez des milliers de centres communautaires juifs et connectez-vous avec des Chaliah où que vous voyagiez.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-2xl shadow-black/20 p-2 flex gap-2 max-w-xl">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher une ville, un pays..."
                  className="w-full pl-11 pr-4 py-3.5 text-foreground rounded-xl focus:outline-none"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="rounded-xl px-6 font-medium"
              >
                Rechercher
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              Destinations populaires
            </h2>
            <Link href="/map" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              Voir la carte <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              {
                name: "Paris",
                query: "Paris",
                country: "France",
                photo: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=320&fit=crop&auto=format&q=80",
              },
              {
                name: "Jérusalem",
                query: "Jerusalem",
                country: "Israël",
                photo: "/images/jerusalem.svg",
              },
              {
                name: "New York",
                query: "New York",
                country: "USA",
                photo: "/images/770.svg",
              },
              {
                name: "Londres",
                query: "London",
                country: "Royaume-Uni",
                photo: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=320&fit=crop&auto=format&q=80",
              },
            ].map((dest) => (
              <Link
                key={dest.name}
                href={`/map?search=${encodeURIComponent(dest.query)}`}
                className="group"
              >
                <Card className="overflow-hidden border-0 ring-1 ring-border hover:ring-primary/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer py-0 gap-0">
                  <div className="relative h-36 overflow-hidden bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={dest.photo}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {dest.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{dest.country}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-bold text-foreground tracking-tight mb-3">
              Pourquoi choisir ChlouhIN ?
            </h2>
            <p className="text-muted-foreground">
              Une plateforme pensée pour vous accompagner partout, à chaque étape de votre voyage.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: MapPin,
                title: "Trouvez facilement",
                description: "Localisez les Beth Habad près de votre destination avec notre carte interactive et recherche avancée.",
              },
              {
                icon: Users,
                title: "Communauté active",
                description: "Connectez-vous avec des Chaliah dévoués prêts à vous accueillir et vous guider dans votre voyage.",
              },
              {
                icon: Globe,
                title: "Réseau mondial",
                description: "Accédez à des milliers de centres dans plus de 100 pays, où que vous soyez dans le monde.",
              },
            ].map(({ icon: Icon, title, description }) => (
              <Card key={title} className="border-0 ring-1 ring-border hover:ring-primary/30 hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <div className="w-12 h-12 brand-gradient rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[0.95rem] leading-relaxed">
                    {description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-bold text-foreground tracking-tight mb-3">
              Comment ça marche ?
            </h2>
            <p className="text-muted-foreground">
              Trois étapes simples pour trouver votre communauté, où que vous soyez.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Search,
                step: "1",
                title: "Recherchez",
                description: "Indiquez une ville, un pays ou une adresse pour lancer votre recherche.",
              },
              {
                icon: Compass,
                step: "2",
                title: "Localisez",
                description: "Repérez les Beth Habad les plus proches sur notre carte interactive.",
              },
              {
                icon: ShieldCheck,
                step: "3",
                title: "Connectez-vous",
                description: "Contactez directement le Chaliah pour préparer votre visite ou votre séjour.",
              },
            ].map(({ icon: Icon, step, title, description }) => (
              <div key={step} className="relative bg-white rounded-2xl ring-1 ring-border p-6 pt-8">
                <span className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full brand-gradient text-white text-sm font-bold shadow-sm">
                  {step}
                </span>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-bold text-foreground tracking-tight mb-3">
              Ils ont utilisé ChlouhIN
            </h2>
            <p className="text-muted-foreground">
              Des voyageurs et des Chaliah du monde entier partagent leur expérience.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Mendy R.",
                role: "Voyageur, Paris",
                quote: "En arrivant à Bangkok je ne connaissais personne. Grâce à ChlouhIN j'ai trouvé un Beth Habad en 5 minutes et j'ai été accueilli comme en famille.",
              },
              {
                name: "Rav Yossi K.",
                role: "Chaliah, Lisbonne",
                quote: "La plateforme nous permet d'être visible auprès des voyageurs qui passent par chez nous. Le contact est direct et simple.",
              },
              {
                name: "Sarah L.",
                role: "Voyageuse, Tel Aviv",
                quote: "J'utilise la carte à chaque voyage pour organiser mes étapes. C'est devenu un réflexe avant de partir.",
              },
            ].map((t) => (
              <Card key={t.name} className="border-0 ring-1 ring-border rounded-2xl">
                <CardContent className="pt-6">
                  <Quote className="h-6 w-6 text-primary/40 mb-3" />
                  <p className="text-sm text-foreground/90 leading-relaxed mb-5">
                    &quot;{t.quote}&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full brand-gradient flex items-center justify-center text-white text-sm font-semibold">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Chaliah CTA split */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center rounded-3xl overflow-hidden ring-1 ring-border bg-white">
            <div className="relative h-56 md:h-full brand-gradient flex items-center justify-center">
              <div className="pointer-events-none absolute inset-0 opacity-20">
                <div className="absolute -top-10 -left-10 h-48 w-48 rounded-full bg-white blur-3xl" />
              </div>
              <Sparkles className="h-16 w-16 text-white/80" />
            </div>
            <div className="p-8 md:p-12">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3 py-1 text-sm font-medium mb-4">
                Vous êtes Chaliah ?
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-3">
                Faites connaître votre Beth Habad
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Inscrivez votre centre, gérez vos informations et soyez visible auprès de milliers de voyageurs qui recherchent une communauté près de chez vous.
              </p>
              <Button asChild className="rounded-full px-6">
                <Link href="/signup">
                  Inscrire mon Beth Habad <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground tracking-tight mb-3">
              Questions fréquentes
            </h2>
            <p className="text-muted-foreground">
              Tout ce qu&apos;il faut savoir avant de commencer.
            </p>
          </div>
          <div className="space-y-3">
            {[
              {
                q: "ChlouhIN est-il gratuit ?",
                a: "Oui, la recherche et la consultation des Beth Habad sont entièrement gratuites pour les voyageurs.",
              },
              {
                q: "Comment ajouter mon Beth Habad sur la carte ?",
                a: "Créez un compte Chaliah, puis renseignez les informations de votre centre depuis votre tableau de bord. Votre fiche sera vérifiée avant publication.",
              },
              {
                q: "Les informations sont-elles à jour ?",
                a: "Les Chaliah peuvent mettre à jour leurs horaires et coordonnées à tout moment depuis leur espace personnel.",
              },
              {
                q: "Puis-je sauvegarder mes recherches ?",
                a: "Oui, ajoutez n'importe quel Beth Habad à vos favoris pour le retrouver rapidement avant votre prochain voyage.",
              },
            ].map((item) => (
              <div key={item.q} className="bg-white ring-1 ring-border rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">{item.q}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden brand-gradient text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 opacity-15">
          <div className="absolute -bottom-20 left-1/3 h-72 w-72 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
            Prêt à explorer ?
          </h2>
          <p className="text-lg text-white/85 mb-9">
            Rejoignez des milliers de voyageurs qui utilisent ChlouhIN pour trouver leur communauté
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              asChild
              className="bg-white text-[#1d4ed8] hover:bg-white/90 px-8 py-3 text-base rounded-xl shadow-lg"
            >
              <Link href="/map">Explorer la carte</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="bg-transparent text-white border-white/40 hover:bg-white/10 px-8 py-3 text-base rounded-xl"
            >
              <Link href="/signup">S&apos;inscrire gratuitement</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "5000+", label: "Beth Habad" },
              { value: "100+", label: "Pays" },
              { value: "50K+", label: "Utilisateurs" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-white ring-1 ring-border py-8 px-4">
                <div className="text-3xl sm:text-4xl font-bold brand-gradient-text mb-1">{stat.value}</div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            ))}
            <div className="rounded-2xl bg-white ring-1 ring-border py-8 px-4">
              <div className="text-3xl sm:text-4xl font-bold brand-gradient-text mb-1">4.9</div>
              <div className="text-muted-foreground text-sm flex items-center justify-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                Note moyenne
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
