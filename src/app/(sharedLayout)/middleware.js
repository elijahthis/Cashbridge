import { NextResponse } from "next/server";

export function middleware(request) {
	// Example function to validate auth
	// if (isAuthValid(request)) {
	// 	return NextResponse.next();
	// }

	const loginUrl = new URL("/signin", request.url);
	loginUrl.searchParams.set("from", request.nextUrl.pathname);

	return NextResponse.redirect(loginUrl);
}
