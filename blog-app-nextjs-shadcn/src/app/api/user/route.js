import connectDb from "@/database";
import User from "@/models/UserSchema";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

export const GET = async (request) => { 

    try {
      await connectDb(); 
      await verifyAuthentication();
      const allUsers = await User.find({});
      return NextResponse.json(allUsers);
    } catch (error) {
      //return logic here
      return new Response(error);
    }
  };

  export const POST = async (req,res)=>{
    try {
        await connectDb();

        const data  =await req.json()
        console.log(data)

        const { name,username,email,password } = data;

        const userObj = new User({
            name : name,
            username : username,
            email: email,
            password : password
        });

        await userObj.save();
  
        return NextResponse.json(userObj);

  } catch (err){
    return NextResponse.json(err);
  }
}

const verifyAuthentication = ()=>{
  return new Promise(async (resolve,reject)=>{

    const cookieStore = cookies();
    const token = cookieStore.get("token");
    if(!token) {
      reject("token not present, not authorized");
      return
    }

    const value = token.value;
    console.log(value);

      try{
          
        const decodeToken = verify(value,process.env.SECRET_KEY);
        console.log(decodeToken.user);
    
        const userDb = await  User.findOne({_id : decodeToken.user.id});
    
        if(!userDb){
          reject("User not found or not authorized");
        }

        resolve();

      } catch(err){
          reject(err);
      }
  })
}