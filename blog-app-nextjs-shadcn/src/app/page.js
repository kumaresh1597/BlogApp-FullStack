import Allblogs from "@/components/Allblogs/Allblogs";


async function getAllBlogs() {
   const url = "http://localhost:3030/blogs/"
   //const localURL = 'http://localhost:3000/api/blog'
   const res = await fetch(url,{
      method:"GET",
      query:{

      },
      headers:{
         'Content-Type': 'application/json',
      },
      cache:"no-store",  // SSR
      // cache:"force-cache", // SSG
      // next:{
      //    revalidate:1  // ISR
      // }
   })
   const responsedata = await res.json();
   return responsedata;
 }

export default async function Home() {
    
   const blogsData = await getAllBlogs();
   console.log("No of blogs",blogsData.total);
   return (
     <div className="w-full">
         <Allblogs data={blogsData.data}/>
     </div>
   )
}
