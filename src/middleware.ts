import { NextResponse } from "next/server";

// La session Supabase (via le client navigateur @supabase/supabase-js) est
// stockée côté client (localStorage), pas dans un cookie "auth-token".
// Ce middleware ne peut donc pas vérifier la vraie session ici sans le
// package @supabase/ssr. La protection réelle des pages /dashboard,
// /settings et /admin est assurée côté client par <ProtectedRoute> qui
// s'appuie sur la vraie session Supabase (voir src/components/auth).
export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
