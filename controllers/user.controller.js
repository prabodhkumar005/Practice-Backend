import { User } from "../models/User.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";
export const Register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName, !lastName, !email, !password) {
            return res.status(400).json({
                success: false,
                message: "all fields are required"
            })
        }
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "password must be atleast 6 character"
            })
        }
        const existingEmail = await User.findOne({ email: email })
        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: "email already exists"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        await User.create({
            firstName,
            lastName,
            email,
            password: hashPassword
        })
        return res.status(201).json({
            success: true,
            message: "account created successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "failed to register"
        })
    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email && !password) {
            res.status(400).json({
                success: false,
                message: "all fields are required"
            })
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "incorrect email or password"
            })
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                message: "invalid credentials"
            })
        }
        const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: "strict" }).json({
            success: true,
            message: `Welcome back ${user.firstName}`,
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to Login",
        })
    }
}
export const Logout=async(_,res)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            success:true,
            message:"logout successfully"
        })
    } catch (error) {
        console.log(error);
    }
}

export const getAllUser=async(req,res)=>{
    try {
        const users=await User.find().select('-password');
        console.log(users);
    if(users){
        return res.status(200).json({
            success:true,
            message:"user list fetched successfully",
            total:users.length,
            users

        })
    }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"failed to fetch users"
        })
    }
}


export const updateProfile = async(req, res) => {
    try {
        console.log(req.id);
        const userId= req.id
        console.log(userId)
        const {firstName, lastName, occupation,linkedin} = req.body;
        const file = req.file;

        const fileUri = getDataUri(file)
        let cloudResponse = await cloudinary.uploader.upload(fileUri)

        const user = await User.findById(userId).select("-password")
        
        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false
            })
        }

        // updating data
        if(firstName) user.firstName = firstName
        if(lastName) user.lastName = lastName
        if(occupation) user.occupation = occupation
        if(linkedin) user.linkedin = linkedin
        if(file) user.photoUrl = cloudResponse.secure_url

        await user.save()
        return res.status(200).json({
            message:"profile updated successfully",
            success:true,
            user
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update profile"
        })
    }
}