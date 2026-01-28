import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const session = request.cookies.get("session")?.value;

    if (pathname.startsWith("/_next") || pathname.includes("/api/") || pathname.includes("favicon.ico")) {
        return NextResponse.next();
    }

    if (!session) {
        if (pathname === "/" || pathname.startsWith("/activate")) {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL("/", request.url));
    }

    try {
        const { payload } = await jwtVerify(session, SECRET_KEY);
        const userRole = payload.rol as string;
        
        if (pathname === "/" || pathname.startsWith("/activate")) {
            const dashboardPath = userRole === "Administrador" ? "/dashboard/admin" : "/dashboard"; 
            return NextResponse.redirect(new URL(dashboardPath, request.url));
        }
        if (pathname.startsWith("/dashboard/admin") && userRole !== "Administrador") {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }

        return NextResponse.next();

    } catch (error) {
        const response = NextResponse.redirect(new URL("/", request.url));
        response.cookies.delete("session");
        return response;
    }
}

// Configuración del Matcher
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};