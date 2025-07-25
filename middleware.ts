import { createClient } from "@/app/_lib/supabase/server"; // Your server-side Supabase client
import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const supabase = createClient();
  const {
    data: { session },
  } = await (await supabase).auth.getSession();
  const protectedPath = "/app";
  const isProtectedPath = request.nextUrl.pathname.startsWith(protectedPath);

  if (!session && isProtectedPath) {
    const redirectUrl = new URL("/", request.nextUrl.origin);
    return NextResponse.redirect(redirectUrl);
  }

  if (session && request.nextUrl.pathname === "/") {
    const redirectUrl = new URL("/app/dashboard", request.nextUrl.origin);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/app/:path*"],
};
