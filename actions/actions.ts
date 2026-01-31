"use server";

import { cookies } from "next/headers";

export async function setSedeNavState(isClosed: boolean) {
    const cookieStore = await cookies();

    cookieStore.set("sede-nav-closed", String(isClosed), {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
    });
}