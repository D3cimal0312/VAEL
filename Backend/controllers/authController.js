import jwt from "jsonwebtoken";
import User from "../models/Users.js";


// !called a helper function ::used to generat a jwt token
const generateToken=(id,role="customer")=>{

  if(role!=="customer" && role!=="admin") return;
    return jwt.sign(
        {id,role},
        process.env.JWT_SECRET,
         {expiresIn:"1d"}  
    );
};


// !regisiter a new user


export const register =async (req,res)=>{
    try{
        const{firstName,lastName,email,password}=req.body;
        const existingUser=await User.findOne({email});

        if(existingUser){
      return res.status(400).json({ message: "Email already in use" });
        }

        const user =await User.create({firstName,lastName,email,password});

        // generating a jwt token
        const token =generateToken(user.id,user.role);
 if(!token) return res.status(500).json({message:"token generation issue"})
//! to change the rolw we wither will do from mongodb itself or later give access to existing admin to change cusomter role
         res.status(201).json({
      token,
      user: {
        id:    user.id,
        firstName:  user.firstName,
        lastName:  user.lastName,
        email: user.email,
        role:  user.role,
      },
    });
    }catch(err){
   console.error("REGISTER ERROR:", err); 
    res.status(500).json({ message: err.message });
    }
}


// !logining a exisiting user
export const login =async(req,res)=>{
    try{
        const {email,password}=req.body;

        const existingUser =await User.findOne({email}).select('+password');
        console.log(existingUser)
        if(!existingUser){
                  return res.status(401).json({ message: "Invalid email or password" });

        
                }
                
      if (!existingUser.isActive) {
     
      return res.status(403).json({ message: "Account has been deactivated" });
    }

        const isMatch =await existingUser.comparePassword(password);
            // internally yo kaam garne:  bcrypt.compare(candidatePassword, this.password

        if(!isMatch){
            return res.status(401).json({ message: "Invalid email or password" });
        }

   
// !sab verification pass vayesi make an token for the login user
  const token = generateToken(existingUser.id, existingUser.role);
   
  
  res.status(200).json({
      token,
      user: {
        id:    existingUser.id,
                firstName:  existingUser.firstName,
        lastName:  existingUser.lastName,
        email: existingUser.email,
        role:  existingUser.role,
      },
    });

  } catch (err) {
    
    res.status(500).json({ message: err.message });
    
    
  }
};