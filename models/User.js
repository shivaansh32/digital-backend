import mongoose from "mongoose";
import { Schema } from "mongoose";

const userschema = new Schema({
    name : {
        type : String,
        required : true,
    }, 
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    }
} , {timestamps : true});

const User = mongoose.model('User' , userschema);
export default User;