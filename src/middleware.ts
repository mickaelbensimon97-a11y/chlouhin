import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Pages protégées qui nécessitent une authentification
  const protectedPaths = [
    "/dashboard",
    "/settings",
  ];
  
  // Pages admin qui nécessitent des droits d'administrateur
  const adminPaths = [
    "/admin",
  ];
  
  // Vérifier si l'utilisateur est authentifié (simulation avec un cookie)
  const isAuthenticated = request.cookies.get("auth-token")?.value;
  
  // Rediriger vers login si non authentifié et page protégée
  if (protectedPaths.some(path => pathname.startsWith(path)) && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  // Rediriger vers login si non admin et page admin
  if (adminPaths.some(path => pathname.startsWith(path)) && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
