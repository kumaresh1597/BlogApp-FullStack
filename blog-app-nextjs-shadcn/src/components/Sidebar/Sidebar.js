"use client"
import React from 'react'
import { useContext,useState } from 'react'
import MyContext from '@/context/Mycontext'
import { Button } from '../ui/button'
import Link from 'next/link'
import { SettingsIcon,CloudLightningIcon,NewspaperIcon,ComputerIcon,LightbulbIcon,BadgeIcon } from 'lucide-react'
import { ArrowRightIcon,ArrowLeftIcon,MenuIcon } from 'lucide-react'


const Sidebar = () => {

    const {setCategory} = useContext(MyContext);
    const[clicked,setClicked] = useState(false);

    const handleClick = ()=>{
      setClicked(prev=>!prev);
    }
    
  return (
    <div className='flex bg-slate-50'>
      <div className={`flex w-screen sm:flex-col justify-between sm:w-[250px] sm:min-w-[250px] p-4 bg-gray-200 ${clicked && 'ease-out sm:hidden'}`}>
          <div className='flex w-full justify-around gap-3 p-2 sm:flex-col overflow-x-auto no-scrollbar border'>
            <a href={'/'}><Button className='w-[80px] text-sm sm:w-full bg-slate-700 active:bg-slate-700'  onClick={()=>setCategory("Trending")}><CloudLightningIcon/> Trending</Button></a>
            <Link href={'/'}><Button className='w-[80px] text-sm sm:w-full bg-slate-700 active:bg-slate-700'  onClick={()=>setCategory("News")}><NewspaperIcon/> News</Button></Link>
            <Link href={'/'}><Button className='w-[80px] text-sm sm:w-full bg-slate-700 active:bg-slate-700' onClick={()=>setCategory("Sports")}><BadgeIcon/> Sports</Button></Link>
            <Link href={'/'}><Button className='w-[80px] text-sm sm:w-full bg-slate-700 active:bg-slate-700' onClick={()=>setCategory("Science")}><LightbulbIcon/> Science</Button></Link>
            <Link href={'/'}><Button className='w-[80px] text-sm sm:w-full bg-slate-700 active:bg-slate-700' onClick={()=>setCategory("Technology")}><ComputerIcon/> Technology</Button></Link>
          </div>
          <div className='hidden sm:flex sm:flex-col p-2'>
          <Button className='w-[50px] sm:w-full bg-slate-700 active:bg-slate-700'><SettingsIcon/> <span className='hidden sm:inline'>Settings</span></Button>
          </div> 
      </div>
      <div className=" hidden sm:inline h-[20px] w-[20px]" onClick={handleClick}>
        <MenuIcon/>
      </div> 
    </div>
  )
}

export default Sidebar
