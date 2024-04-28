import { serialize } from "cookie";
import { NextResponse } from "next/server";

export const POST = async (req,res)=>{

    try {
        const data  = await req.json()
        console.log(data)

        const {token} = data;

        if(!token){
            return NextResponse.json({
                status : 400,
                message : "Missing Token"
            });
        }

        const serialized =  serialize('token', token, {
                    httpOnly: true,
                    sameSite: 'strict',
                    maxAge: 3600, // 1 hour expiration
                    path: '/',
                });

        const response = {
            status:200,
            message : "Cookie set successfull"
        }

        return new Response(JSON.stringify(response), {
            status: 200,
            headers: { "Set-Cookie": serialized },
          });

    } catch (err){
        return NextResponse.json(err);
    }
}