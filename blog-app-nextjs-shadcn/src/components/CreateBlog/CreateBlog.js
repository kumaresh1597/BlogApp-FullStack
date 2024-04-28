"use client"
import React,{useState} from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '../ui/card'
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from '../ui/select'
import { Textarea } from '../ui/textarea'
import { Loader2 } from 'lucide-react'
// import { createBlog } from '@/lib/CreateBlog/createblog'

const CreateBlog = ({userid}) => {

    const [blog,setBlog] = useState({title:"",content:"",category:""});
    const [loading,setLoading] = useState(false);

    const updateInput = (e)=>{
        let x = e.target.name
        setBlog({...blog,  [x]: e.target.value})
    }

    const handleCreate = async (e)=>{
        setLoading(true);
        try {
            // const res = await createBlog({title:blog.title,content:blog.content,category:blog.category,userid:userid})
            const url = "http://localhost:3030/blogs/"
            //const localUrl = 'http://localhost:3000/api/blog'
            const res = await fetch(url,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    title:blog.title,
                    category:blog.category,
                    content:blog.content,
                    author: localStorage.getItem("userId")
                })
            })
            const response = await res.json();
            console.log(response);
            setLoading(false);
            alert("Blog created successfully");
            setBlog({title:"",content:"",category:""});
            
        } catch (error) {
           setLoading(false);
           alert(error) 
        }
    }

    const handleCancel = ()=>{
        window.location.reload();
    }

  return (
    <Card className=" w-full md:w-[400px] lg:w-[500px] bg-gray-200">
      <CardHeader>
        <CardTitle>Create Blogs</CardTitle>
        <CardDescription>Create your new blog.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Title of your blog" name='title' value={blog.title} onChange={updateInput}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={(e)=>(setBlog({...blog,category:e}))}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select"/>
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="News">News</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
                <Label htmlFor="content">Content</Label>
                <Textarea placeholder="Type your blog content here" name='content' value={blog.content}  onChange={updateInput}/>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handleCancel} variant="outline">Cancel</Button>
        {
            loading?(
                <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                </Button>
            ):(
                <Button onClick={handleCreate}>Create</Button>
            )
        }
        
      </CardFooter>
    </Card>
  )
}

export default CreateBlog