import NextAuth from "next-auth";

import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "./routes";
import { auth as Session } from "./auth";
import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);

// @ts-ignore
export default auth(async (req) => {
  const { nextUrl } = req;
  const session = await Session();
  const role = session?.user?.role;

  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  // matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
