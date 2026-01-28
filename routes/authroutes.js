import { Router } from "express";
import User from "../models/User.js";
import genratetoken from "../utils /webtoken.js";
import bcrypt from 'bcrypt'
import Authenthicate from "../middleware/Authmiddleware.js";
const route = Router();

route.post('/signup', async (req, res) =>{
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password){
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
  const hashedpassword = await bcrypt.hash(password,10);
  await User.create({
      name,
      email,
     password: hashedpassword
    });

    return res.status(201).json({
      message: "Account created successfully",
    });
  } catch (error){
    return res.status(500).json({ message: `${error}` });
  }
});

route.post('/login' , async (req,res)=>{
   try {
    const {email , password} = req.body;
    if(!email || !password){
        return res.status(400).json({error : "All field required"});
    }
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({message : "Invalid credentials"})
    }
    const iscorrectpass = await bcrypt.compare(password,user.password);
    if(!iscorrectpass){
        return res.status(400).json({message : "Invalid credentials"});
    }
   const userid = user._id;
    genratetoken({userid,res});
    return res.status(200).json({message : "User logged in"});
   } catch (error){
   res.status(500).json({error : `${error}`});
   }
});

route.get('/me' , Authenthicate , (req , res)=>{
    res.json({user : req.user});
})

route.get('/logout' , (req,res)=>{
  res.clearCookie('jwt');
  return res.status(200).json({message : "logout out "})
})

export default route;