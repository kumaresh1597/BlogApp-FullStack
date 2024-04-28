import React from 'react'
import CreateBlog from '@/components/CreateBlog/CreateBlog'
import { cookies } from 'next/headers'
import User from '@/models/UserSchema'
import { verify } from 'jsonwebtoken'


export const verifyAuthentication = async ()=>{
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  console.log(token);

  if(!token) {
    return false;
  }

  const value = token.value;

    try{
        
      const decodeToken = verify(value,process.env.SECRET_KEY); 
      const userDb = await  User.findOne({_id : decodeToken.user.id});
  
      if(!userDb){
        return false;
      }

      return decodeToken.user;

    } catch(err){
        console.log(err)
    }
}

const page = async () => {

    const userDb = await verifyAuthentication();
    console.log("user details : ",userDb);

  return (
    <div className='w-full h-full sm:h-auto flex items-start sm:items-center justify-center bg-slate-50'> 
      <CreateBlog/>
    </div>
  )
} 

export default page