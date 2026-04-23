import dotenv from 'dotenv';
dotenv.config();

import jwt from "jsonwebtoken";
import User from "../models/Users.js";


// !protect middle ware run it before route handlers
// chekc if has valid token or not

export const protect =async (req,res,next)=>{
    try{
        // pura string is taken then chekcing if has bearer or not 
        const inputToken=req.headers.authorization;

        if(!inputToken || !inputToken.startsWith("Bearer ")){
            return res.status(401).json({message:"not authorized"});

        }

        const token=inputToken.split(" ")[1];


        // !reversing a token to get the id and role
// console.log("JWT_SECRET:", process.env.JWT_SECRET)
        const decoded=jwt.verify(token, process.env.JWT_SECRET);

        // console.log("errorhere")


        req.user =await  User.findById(decoded.id).select("-password");

        if(!req.user){
            return res.status(401).json({ message: "User no longer exists" });
        }


        next();
    }catch(err){
        res.status(401).json({message:err.message})
console.log("token not here")

    }
}

// Todo:make a adminonly middlware for dashboard {check if the user is admin} imply verfiy rola
// !done
export const adminOnly=(req,res,next)=>{
// console.log(req.user.role)
try{
    if(req.user?.role!=="admin"){
         return res.status(403).json({ message: "Admin access only" });

    }
    next();

}catch(err){
        res.status(500).json({message:err.message})

}



        
    
}

//  for either guest login and admin login 
// even if user is not loggin it will give products of published and if user loggin is of admin then it will give all status products
// check get all products for admin role check 

export const optionalProtect = async(req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
//   console.log("optional running")/
console.log(token,"token")
  if (!token) return next(); 

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    console.log(req.user,"optional")
    next();
  } catch {
    console.log(req.user,"optional")

    next();
  }
};