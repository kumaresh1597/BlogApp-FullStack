import LogIn from '@/components/LoginSignup/LogIn'
import React from 'react'
import { cookies } from 'next/headers'
import User from '@/models/UserSchema'
import { verify } from 'jsonwebtoken'

export const verifyAuthentication = async ()=>{
    const cookieStore = cookies();
    const token = cookieStore.get("token");

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

const Login = async () => {

  const userDb = await verifyAuthentication();

  return (
    <div className='w-full h-full'>
    <LogIn userid = {userDb.id}/>
    </div>
  )
}

export default Login