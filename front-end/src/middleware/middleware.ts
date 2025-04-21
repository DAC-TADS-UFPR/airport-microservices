import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  // read the JWT from the "access_token" cookie
  const token = req.cookies.get("access_token")?.value;
  const { pathname } = req.nextUrl;

  // allow public routes
  if (["/", "/registrar"].includes(pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    const { payload }: any = await jwtVerify(token, new TextEncoder().encode(process.env.NEXT_PUBLIC_ENCRYPT));
    // accommodate payloads where role is either at root or under user
    const role = payload.role ?? payload.user?.role;

    if (pathname.startsWith("/admin") && role === "EMPLOYEE") {
      return NextResponse.next();
    }
    if (pathname.startsWith("/user") && role === "CLIENT") {
      return NextResponse.next();
    }

    // unauthorized
    return NextResponse.redirect(new URL("/", req.url));
  } catch {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
