
import connectDb from "@/database";
import Blog from "@/models/BlogSchema";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";


export const GET = async (req) => {

    const url = new URL(req.url);
    const searchparams = new URLSearchParams(url.searchParams);

    const id = searchparams.get('id');
    const userid = searchparams.get('userid');

    try {
      await connectDb(); 
      if(id){
        const blogDb = await Blog.findOne({_id:id});
        return Response.json(blogDb);
      }
      else if(userid){
        console.log("Inside blog with userid")
        const blogDb = await Blog.aggregate([
          {
            $match : {author : new ObjectId(userid)}
        },
        {
            $sort : {creationTime : -1}
        }
        ])
        return Response.json(blogDb);
      }else{
        const allBlogs = await Blog.find({});
        return Response.json(allBlogs);
      }

    } catch (error) {
      //return logic here
      return Response.json("error");
    }
  };

  export const POST = async (req,res)=>{
    try {
        await connectDb();

        const data  =await req.json()
        console.log(data)

        const creationTime = Date.now();

        const {title,content,userId,category} = data;

        const blogObj = new Blog({
          title : title,
          content : content,
          author : userId,
          category : category,
          creationTime : creationTime
      })

        await blogObj.save();
  
        return NextResponse.json(blogObj);

  } catch (err){
    return NextResponse.json(err);
  }
}


