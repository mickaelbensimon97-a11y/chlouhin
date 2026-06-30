import Link from "next/link";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/15 text-base font-bold">
                🕯️
              </span>
              <span className="text-lg font-bold tracking-tight">ChlouhIN</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Le réseau mondial qui connecte voyageurs et Beth Habad, partout dans le monde.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3 text-white/90">Explorer</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/map" className="hover:text-white transition-colors">Carte des Beth Habad</Link></li>
              <li><Link href="/annuaire" className="hover:text-white transition-colors">Annuaire complet</Link></li>
              <li><Link href="/favoris" className="hover:text-white transition-colors">Mes favoris</Link></li>
              <li><Link href="/map?search=Jerusalem" className="hover:text-white transition-colors">Jérusalem</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3 text-white/90">Compte</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/login" className="hover:text-white transition-colors">Connexion</Link></li>
              <li><Link href="/signup" className="hover:text-white transition-colors">S&apos;inscrire</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Tableau de bord</Link></li>
              <li><Link href="/settings/profile" className="hover:text-white transition-colors">Paramètres</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3 text-white/90">À propos</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/a-propos" className="hover:text-white transition-colors">Notre mission</Link></li>
              <li><Link href="/signup" className="hover:text-white transition-colors">Devenir Chaliah</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} ChlouhIN. Tous droits réservés.
          </p>
          <p className="text-xs text-white/50 flex items-center gap-1.5">
            Fait avec <Heart className="h-3.5 w-3.5 fill-red-400 text-red-400" /> pour la communauté
          </p>
        </div>
      </div>
    </footer>
  );
}
