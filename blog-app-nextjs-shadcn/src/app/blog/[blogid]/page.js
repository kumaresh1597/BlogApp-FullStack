import React from 'react'

async function getBlogWithId(id) {

    const url = "http://localhost:3030/blogs"
    //const localurl = "http://localhost:3000/api/blog?id="
  
    console.log("id : "+id)
    const res = await fetch(`${url}/${id}`,{
        method:"GET"
    })
    return res.json()
}

const EachBlog = async ({params}) => {

      const{blogid} = params;

      const blog = await getBlogWithId(blogid);

  return (
    <div className='flex flex-col gap-2 p-4 overflow-y-auto'>
        <p className='font-bold text-2xl'>{blog.title}</p>
        <p>{blog.content}</p>
    </div>
  )
}

export default EachBlog