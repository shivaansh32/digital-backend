import mongoose from "mongoose";
import { Schema } from "mongoose";
import user from "./User.js";
const noteschema = new Schema({
    // dates 
    date :{
        type : Date,
    },
    // how was you day and all
    title :{
        type : String,
        trim : true
    },
    Content :{
    type : "string",
   required : true,
    },
    UserID :{
        type : Schema.Types.ObjectId,
        ref : "user",
        requierd : true
    }
},{timestamps : true});

const notes = mongoose.model('notes' , noteschema) 

export default notes;