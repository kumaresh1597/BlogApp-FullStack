"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useRouter } from 'next/navigation'
import { EllipsisVertical,SearchIcon, Settings2Icon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from '../ui/dropdown-menu'


const Navbar = async ({user}) => {

  const[clicked,setClicked] = useState(false);

  const router = useRouter();
  const handleLogOut = async()=>{

    try {

      const res = await fetch('http://localhost:3000/api/auth/logout',{
        method:'POST'
      })
      const response = await res.json();
      alert(response.message);
      router.push('/')
    } catch (error) {
      alert(error)
    }

  }
  
  return (
    <div className='flex w-full justify-around items-center p-4 bg-slate-700 gap-4 border'>
        <div className='text-lg sm:text-2xl font-bold text-white'>Blog App</div>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input type="text" placeholder="Search.." />
          <Button className='active:bg-white active:text-black'>
            <span className='hidden sm:inline'>Search</span>
            <SearchIcon className='sm:hidden'/>
          </Button>
        </div>
        <div className='flex items-center gap-2'>
          <div className='sm:hidden'>
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <EllipsisVertical className='text-white'/>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
          <DropdownMenuItem className='active:bg-slate-600'>
            <Link href={'/blog/createblog'}>Create blog</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem className='active:bg-slate-600'>
            <div>Settings</div>
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem className='active:bg-slate-600'>
              {
                user?(<div onClick={handleLogOut}>Sign out</div>):(<Link href={'/login'}>LogIn</Link>)
              }
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
          </div>
        {
          user?(
          <Button className='hidden sm:inline active:bg-white active:text-black' onClick={handleLogOut}>LogOut</Button>):(
          <Link href={'/login'} style={{textDecoration:"none"}}><Button className='active:bg-white active:text-black hidden sm:inline'>LogIn</Button></Link>
          )
        } 
          <Link href={'/blog/createblog'}><Button className='hidden sm:inline active:bg-white active:text-black'>Create blog</Button></Link>
        </div>
    </div>
  )
}

export default Navbar