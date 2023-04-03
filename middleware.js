import { NextResponse } from "next/server";
import decodeJWT from "./functions/decodeJWT";

export default function middleware(req) {
  const token = req.cookies.get("token");

  if (req.nextUrl.pathname == "/") {
    if (token) {
      return NextResponse.redirect(new URL("/home/timeline", req.url));
    }

    return;
  }

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (req.url.includes("/saved") || req.url.includes("/setting")) {
    const username = decodeJWT(token.value).username;

    if (!req.nextUrl.pathname.includes(`/${username}/`)) {
      return NextResponse.redirect(new URL("/404", req.url));
    }
  }
}

export const config = {
  matcher: [
    "/",
    "/:path/saved",
    "/:path/setting",
    "/comments/:path",
    "/home/timeline",
    "/likes/:path",
    "/post/new",
    "/post/edit/:path",
    "/user/notifications",
    "/user/search",
  ],
};
