import mongoose from "mongoose"

export const connectDB=async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/hotels")
        console.log("mongoDB connected successfully");
    } catch (error) {
        console.log(error);
    }
}