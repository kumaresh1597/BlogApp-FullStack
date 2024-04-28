"use client"
import React,{useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { setCookie } from '@/lib/SetCookie/setCookie';

const LogIn = ({userid}) => {

    const router = useRouter();

    useEffect(()=>{
      if(userid){
        router.push(`/users/dashboard/${userid}`)
      }
    },[])

    const [user, setUser] = useState({username: "", password: ""})
    const [loading,setLoading] = useState(false);
    let{username,password} = user;

    function updateInput(e){
        let x = e.target.name
        setUser({...user,  [x]: e.target.value})
    }

    async function handleSubmit({username,password}){
        setLoading(true);
        if(!username || !password){
            setLoading(false)
            alert("Please fill all the feilds");
            return;
        }

        console.log("username : "+ username);
        console.log("password : "+password);

        try {
          const url = "http://localhost:3030/authentication"
          //const localUrl = 'http://localhost:3000/api/auth/login'
          const res = await fetch(url,{
            method:"POST",
            headers :{
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              strategy:"local",
              email : username,
              password : password
            })
          });
          const response = await res.json();
          console.log(response);

          // if(response.status !== 200){
          //   setLoading(false);
          //   alert(response);
          //   return;
          // }

          localStorage.setItem("token",response.accessToken);
          localStorage.setItem("userId",response.user._id);
          const resFromsetCookie = await fetch("http://localhost:3000/api/auth/setCookie",{
            method:"POST",
            headers :{
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              token : response.accessToken,
            })
          })
          const cookieResponse = await resFromsetCookie.json();
          console.log(cookieResponse);
          setLoading(false);
          alert(response);
          router.push(`/users/dashboard/${response.user._id}`);
 
        } catch (error) {
          setLoading(false);
          alert(error)
        }
    }

  return (
        <div className=' flex justify-center items-start sm:items-center w-full h-full bg-slate-50'>
          <div className='min-h-[400px] w-5/6 sm:w-1/2 flex flex-col items-center justify-around border bg-slate-700 rounded-sm p-4'>
            <div>
                <h1 className='text-2xl font-bold text-white'>LOG IN</h1>
            </div>
            <div className='w-10/12 flex flex-col items-center justify-center gap-3'>
              <Input type='text' placeholder='Username' name='username' onChange={updateInput} value={username}/>
              <Input type='password' placeholder='Password' name='password' onChange={updateInput} value={password}/>
              <div className='w-full flex items-center justify-center'>
                {
                  loading ? (
                    <Button disabled>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </Button>
                  ):(
                    <Button className='w-5/12' onClick={()=>handleSubmit({username,password})}>LogIn</Button>
                  )
                }
              </div>
            </div>
            <div>
                <p className='text-white text-lg'>Don't have an account?</p>
            </div> 
          </div>
      </div>
  )
}

export default LogIn