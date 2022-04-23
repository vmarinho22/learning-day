import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    const url = req.nextUrl.clone();

    if (req?.cookies?.user && req?.cookies?.token) {
        url.pathname = '/home';
        return NextResponse.redirect(url);
    }
    return NextResponse.next();

}