"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, User, MessageSquare, Settings, LogOut, Home, Map, Heart, ShieldCheck } from "lucide-react";

const ADMIN_EMAIL = 'ohaleihabad@gmail.com'
import { useAuth } from "@/components/auth/auth-provider";

export function Navbar() {
  const { user, loading, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => {
    const linkClass = mobile
      ? "text-foreground hover:bg-muted px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2"
      : "text-white/90 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5";
    return (
      <>
        <Link href="/" className={linkClass}>
          Accueil
        </Link>
        <Link href="/map" className={linkClass}>
          Carte
        </Link>
        <Link href="/annuaire" className={linkClass}>
          Annuaire
        </Link>
        <Link href="/favoris" className={linkClass}>
          <Heart className="h-4 w-4" />
          Favoris
        </Link>
      </>
    );
  };

  const AuthButtons = ({ mobile = false }: { mobile?: boolean }) => {
    if (loading) {
      return (
        <div className="flex items-center space-x-4">
          <div className="h-8 w-8 bg-muted rounded-full animate-pulse"></div>
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-4">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback>
                    {user.user_metadata?.full_name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{user.user_metadata?.full_name || 'Utilisateur'}</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="flex items-center">
                  <Home className="mr-2 h-4 w-4" />
                  <span>Tableau de bord</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/messages" className="flex items-center">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Messages</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings/profile" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Paramètres</span>
                </Link>
              </DropdownMenuItem>
              {user.email === ADMIN_EMAIL && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="flex items-center">
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      <span>Administration</span>
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="flex items-center">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Déconnexion</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : mobile ? (
          <div className="flex items-center gap-2 w-full">
            <Button variant="outline" asChild className="flex-1 rounded-full">
              <Link href="/login">Connexion</Link>
            </Button>
            <Button asChild className="flex-1 rounded-full">
              <Link href="/signup">S&apos;inscrire</Link>
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild className="text-white hover:bg-white/10 rounded-full">
              <Link href="/login">Connexion</Link>
            </Button>
            <Button asChild className="bg-white text-[#1d4ed8] hover:bg-white/90 rounded-full shadow-sm">
              <Link href="/signup">S&apos;inscrire</Link>
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="sticky top-0 z-50 brand-gradient text-white shadow-md shadow-black/5 backdrop-blur supports-[backdrop-filter]:bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/15 text-base font-bold">
                🕯️
              </span>
              <span className="text-xl font-bold text-white tracking-tight">ChlouhIN</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:ml-8 md:space-x-1">
              <NavLinks />
            </div>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex md:items-center">
            <AuthButtons />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="flex flex-col space-y-1">
                    <NavLinks mobile />
                  </div>
                  <div className="border-t pt-4">
                    <AuthButtons mobile />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
