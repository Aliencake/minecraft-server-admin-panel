import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Define the protected routes

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/rcon/:path*", "/"],
};
