import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const session = request.cookies.get("session")?.value;

    if (pathname.startsWith("/_next") || pathname.includes("/api/")) {
        return NextResponse.next();
    }

    if (!session) {
        if (pathname.startsWith("/dashboard")) {
            return NextResponse.redirect(new URL("/", request.url));
        }
        return NextResponse.next();
    }

    try {
        const { payload } = await jwtVerify(session, SECRET_KEY);
        const userRole = payload.rol as string;
        
        if (pathname === "/") {
            const dashboardPath = userRole === "Administrador" ? "/dashboard/admin" : "/";
            return NextResponse.redirect(new URL(dashboardPath, request.url));
        }

        if (pathname.startsWith("/dashboard/admin") && userRole !== "Administrador") {
            return NextResponse.redirect(new URL("/", request.url));
        }

        return NextResponse.next();
    } catch (error) {
        if (pathname === "/") return NextResponse.next();
        
        return NextResponse.redirect(new URL("/", request.url));
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};