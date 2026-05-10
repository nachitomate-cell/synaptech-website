import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that don't need auth
const PUBLIC_PATHS = ["/login"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Check for Firebase session cookie
  // Firebase sets "__session" when using session cookies
  const session = request.cookies.get("__session")?.value;

  if (!session && pathname.startsWith("/dashboard")) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
