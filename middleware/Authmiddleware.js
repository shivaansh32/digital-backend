import user from '../models/User.js';
import dotenv from 'dotenv'
import jwt from "jsonwebtoken";
dotenv.config()

const Authenthicate = async (req , res , next)=>{
   try {
    const token = req.cookies.jwt;
    if(!token){
       return res.status(404).json({error : "no token found"});
    }
    const decoded =  jwt.verify(token, process.env.JWT_KEY);
    if(!decoded){
        return res.status(401).json({error : "invalid token"});
    }
    const User = await user.findById(decoded.userid).select('-password');
   req.user = User;
   return next();
   } catch (error) {
    return res.status(500).json({errormsg : `${error}`})
   }
}
export default Authenthicate;