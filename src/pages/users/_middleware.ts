import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';


export async function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();

    if (req.cookies?.user === undefined || req.cookies?.token === undefined) {
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}