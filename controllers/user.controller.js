import { User } from "../models/User.model.js";
import bcrypt from "bcrypt"
export const Register=async(req,res)=>{
    try {
        const {firstName,lastName,email,password}=req.body;
        if(!firstName,!lastName,!email,!password){
            return res.status(400).json({
                success:false,
                message:"all fields are required"
            })
        }
        if(password.length<6){
            return res.status(400).json({
                success:false,
                message:"password must be atleast 6 character"
            })
        }
        const existingEmail=await User.findOne({email:email})
        if(existingEmail){
            return res.status(400).json({
                success:false,
                message:"email already exists"
            })
        }
        const hashPassword=await bcrypt.hash(password,10);
        await User.create({
            firstName,
            lastName,
            email,
            password:hashPassword
        })
        return res.status(201).json({
            success:true,
            message:"account created successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"failed to register"
        })
    }
}