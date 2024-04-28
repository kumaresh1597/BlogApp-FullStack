import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export const POST = async (req,res)=>{
    
    cookies().delete("token");

    return NextResponse.json({
        status:200,
        message:"User logged out successfully",
    })
}