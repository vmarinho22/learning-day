import cookies from '@services/cookies';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';


export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    const url = req.nextUrl.clone();
    const {setCookie} = cookies();

    if (!req?.cookies?.user && !req?.cookies?.token) {
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }
    return NextResponse.next();

}