import { serialize } from "cookie";
import { NextResponse } from "next/server";

export const setCookie = async ({token})=>{

    try {
        console.log("Inside set cookies function")
        const serialized =  serialize('token', token, {
                    httpOnly: true,
                    sameSite: 'strict',
                    maxAge: 3600, // 1 hour expiration
                    path: '/',
                });

        return new Response(JSON.stringify(response), {
            status: 200,
            headers: { "Set-Cookie": serialized },
          });

    } catch (err){
        return NextResponse.json(err);
    }
}