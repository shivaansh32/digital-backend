import dotenv from 'dotenv'
import  jwt from 'jsonwebtoken'
dotenv.config()

const genratetoken = ({userid , res})=>{
  const token =  jwt.sign({
    userid
   } ,process.env.JWT_KEY, {
    expiresIn : "7d"
   }) 
   res.cookie('jwt', token , {
    maxAge : 7*24*60*60*1000, 
    httpOnly : true,
    samesite : "lax"
   });
   console.log(token);
   return token;
};
export default genratetoken;