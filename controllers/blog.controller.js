
export const createBlog=async(req,res)=>{
    try {
        const{title,category}=req.body;
        if(!title || !category){
            res.status(400).json({
                success:false,
                message:"all fields are required"
            })
        }
        const blog = await Blog.create({
            title,
            category,
            author:req.id
        })

        return res.status(201).json({
            success:true,
            blog,
            message:"Blog Created Successfully."
        })
    } catch (error) {
        console.log(error);
    }
}