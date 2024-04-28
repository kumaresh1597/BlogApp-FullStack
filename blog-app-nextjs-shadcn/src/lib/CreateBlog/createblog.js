
export const createBlog = async({title,content,category,userid})=>{
    try {
        const res = await fetch('http://localhost:3000/api/blog',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title:title,
                    category:category,
                    content:content,
                    userId: userid
                })
            })
            const response = await res.json();
            console.log(response);
            return response
        
    } catch (error) {
        return error
    }
}

