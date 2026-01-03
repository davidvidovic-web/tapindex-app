import { NextResponse } from "next/server";
import { auth } from "@/auth";
import type { NextRequest } from "next/server";

export default auth((req: NextRequest & { auth?: any }) => {
  const { pathname } = req.nextUrl;
  
  // Protect dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (!req.auth) {
      // Use absolute URL construction with fallback to NEXT_PUBLIC_SITE_URL
      const baseUrl = req.url.startsWith('http') 
        ? new URL(req.url).origin 
        : process.env.NEXT_PUBLIC_SITE_URL || 'https://tapwaterrating.com';
      const loginUrl = new URL("/admin/login", baseUrl);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    
    // Check if user has admin role
    if (req.auth?.user?.role !== "admin") {
      const baseUrl = req.url.startsWith('http') 
        ? new URL(req.url).origin 
        : process.env.NEXT_PUBLIC_SITE_URL || 'https://tapwaterrating.com';
      const loginUrl = new URL("/admin/login", baseUrl);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*"]
};