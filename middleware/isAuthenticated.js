import jwt from "jsonwebtoken"
export const isAuthenticated=(req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({
                success:false,
                message:"user not authenticated"
            })
        }
        const decode=jwt.verify(token,process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                success:false,
                message:"invalid token"
            })
        }
        req.id=decode.userId;
        next();
    } catch (error) {
        console.log(error);
    }
}