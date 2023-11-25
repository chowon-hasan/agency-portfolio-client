import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export const middleware = async (request) => {
  const { pathname } = request.nextUrl;
  try {
    let cookie = request.cookies.get("jwt-token")?.value;
    if (!cookie || !cookie.startsWith("Bearer ")) {
      throw new Error("Invalid Token");
    }
    const secret = new TextEncoder().encode(process.env.jwt_secret_key);
    await jwtVerify(cookie.split("Bearer ")[1], secret);
    return NextResponse.next();
  } catch (error) {
    const encodePath = encodeURIComponent(pathname);
    return NextResponse.redirect(
      new URL(`/login?redirectUrl=${encodePath}`, request.url)
    );
  }
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/dashboard/:path*",
};
