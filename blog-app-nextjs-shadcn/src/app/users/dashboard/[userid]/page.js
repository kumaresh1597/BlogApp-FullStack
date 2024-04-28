import React from 'react'
import Allblogs from '@/components/Allblogs/Allblogs'


async function getBlogsWithUserId(id) {
  
  console.log("userid : "+id)
  const res = await fetch(`http://localhost:3000/api/blog?userid=${id}`,{
      method:"GET",
      cache:"no-store"
  })
  return res.json()
}

const page = async ({params}) => {
  
   const{userid} = params;
   const blogs = await getBlogsWithUserId(userid);
   console.log(blogs.length);

  return (
    <div>
      <Allblogs data={blogs}/>
    </div>
  )
}

export default page