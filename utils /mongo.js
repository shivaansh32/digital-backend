import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("mongodb connected succesfully");
    } catch (error) {
        console.log("mongodb connection failed", error);
    }
}
export default connectDB;