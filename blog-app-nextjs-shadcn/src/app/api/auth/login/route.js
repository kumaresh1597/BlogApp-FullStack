import jwt from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { serialize } from 'cookie';
import User from '@/models/UserSchema';
import { NextResponse } from 'next/server';
import connectDb from '@/database';


export const POST = async (req,res)=>{

    try {

        await connectDb();

        const data  = await req.json()
        console.log(data)

        const {loginId,password} = data;

        if(!loginId || !password){
            return NextResponse.json({
                status : 400,
                message : "Missing credentials"
            });
        }

        const userDb = await findUserWithLoginId({loginId});

        const match = await compare(password,userDb.password);

        // const match = password === userDb.password;

        if(!match){
            return NextResponse.json({
                status : 400,
                message : "Incorrect password, please enter correct password"
            });
        }

        const token = generateToken({userId : userDb._id});

        const serialized =  serialize('token', token, {
                    httpOnly: true,
                    sameSite: 'strict',
                    maxAge: 3600, // 1 hour expiration
                    path: '/',
                });

        const response = {
            status:200,
            message : "User logged in successfully",
            data : userDb,
            token : token
        }

        // return NextResponse.json(response);

        return new Response(JSON.stringify(response), {
            status: 200,
            headers: { "Set-Cookie": serialized },
          });

    } catch (err){
        return NextResponse.json(err);
    }
}

const findUserWithLoginId = ({loginId})=>{
    return new Promise(async (resolve,reject)=>{
        try{
            
            const userDb = await User.findOne({
                $or : [{email : loginId},{username:loginId}]
            }).select("+password");

            if (!userDb) reject("User does not exist, please register first");

            resolve(userDb);

        } catch(err){
            reject(err);
        }
    })
}

const generateToken = ({userId})=>{
    const data = {
        user : {
            id : userId
        }
    }
    const token = jwt.sign(data,process.env.SECRET_KEY);
    return token;
}

