"use client"
import React, { useContext} from 'react'
import MyContext from '@/context/Mycontext'
import Link from 'next/link'
import { Button } from '../ui/button'

const Allblogs = ({data}) => {

    const{category} = useContext(MyContext);
    console.log("category : "+category);

    let filteredblogs = [];

    if(category === "Trending"){
        filteredblogs = data;
    } else{
        filteredblogs = data.filter((blog)=>(blog.category === category));
    }
    
  return (
    <div className='w-full h-full flex flex-col gap-5 p-4 overflow-y-auto bg-slate-50'>
        <h1 className='text-center text-3xl font-bold'>{category}</h1>
        <ul className='w-full grid grig-cols-1 sm:grid-cols-2 items-start gap-4'>
            {
                filteredblogs.length > 0 ? (
                    filteredblogs.map((blog,idx)=>(
                        <li key={idx} className='w-full h-[200px] min-h-[200px] flex flex-col items-start justify-around gap-3 border p-4 bg-slate-100 shadow-lg rounded-md hover:scale-105 transition duration-300 ease-in-out'>
                        <h1 className='font-bold text-lg'>{blog.title}</h1>
                        <p className='w-full h-1/2 text-wrap truncate'>{blog.content}</p>
                        <Link href={`/blog/${blog._id}`}><Button className='bg-slate-300 hover:bg-slate-800 hover:text-white active:bg-slate-300 active:text-black' variant="outline">Read more..</Button></Link>
                    </li>
                    ))
                ) : (<p>No blogs</p>)
            }
        </ul>
    </div>
  )
}

export default Allblogs