import { NextResponse } from "next/server"
import { cookies } from "next/headers";

export const middleware = async (req)=>{

    const cookieStore = cookies();
    const token = cookieStore.get("token");

    if(!token){
        return NextResponse.redirect(new URL("/login",req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher : ['/users/:path*','/blog/createblog']
}

