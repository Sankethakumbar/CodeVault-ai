import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { verifyToken } from "@/lib/jwt";

export function proxy(request: NextRequest) {

  const token = request.cookies.get("token")?.value;

  // No token -> Redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Verify JWT
  const decoded = verifyToken(token);

  // Invalid or expired token
  if (!decoded) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Token is valid
  return NextResponse.next();
}


export const config = {
  matcher: [
    "/dashboard/:path*",
    "/notes/:path*",   // ← ADD — protects /notes/new, /notes/[id]/edit
  ],
};