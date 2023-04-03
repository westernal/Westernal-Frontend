import { NextResponse } from "next/server";

export default function middleware(req) {
  let token = req.cookies.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: [
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
