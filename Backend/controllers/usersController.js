import Users from "../models/Users.js";


// !reading the users
export const getAllUsers=async(req,res)=>{

    try{
        const {query}=req.query;

        let filter={};
        let sortObj={};
         if (query && query.trim()) {
            filter.$text = { $search: query };
           sortObj = {score:{$meta:"textScore"}};
         }
            const users=await Users.find(filter).sort(sortObj);
            if(users.length===0){
                return res.status(404).json({message:"unable to fine any users"});
            }

            res.status(200).json({data:users})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

// !getting a single user
export const getUserById=async(req,res)=>{
    
        try{
            const user=await Users.findById(req.params.id,
            );
            if(!user){
                return res.status(404).json({message:"unable to fine any users"});
            }

            res.status(200).json({data:user})
    }catch(err){
        res.status(500).json({messsage:err.message})
    }

}

// !updating a single user data
export const updateUser=async(req,res)=>{
console.log("customer update check")

    try{

          const targetUser = await Users.findById(req.params.id);
  if (!targetUser) return res.status(404).json({ message: "Requested user was not found" });
if(targetUser==="admin" ){
    return res.status(403).json({ message: "You cannot modify another admin's details" });
}

        const allowedFields=["isActive","role"];


        const updates={}
allowedFields.forEach(field=>{
    if(req.body[field]!==undefined) updates[field]=req.body[field]
})

        const user = await Users.findByIdAndUpdate(
            req.params.id,
            updates,
    {
        new:true,
        runValidators:true,
    },
)
        if(!user) return res.status(404).json({message:"requested user wasnot found"});

        res.status(200).json({data:user})

    }catch(err){
        res.status(500).json({message:err.message})
    }
}

export const updateMe=async(req,res)=>{
    try{
         const allowedFields = ['firstName', 'lastName', 'email', 'address']

        const updates={}
allowedFields.forEach(field=>{
    if(req.body[field]!==undefined) updates[field]=req.body[field]
})

        const user = await Users.findByIdAndUpdate(
            req.params.id,
            updates,
    {
        new:true,
        runValidators:true,
    },
)
        if(!user) return res.status(404).json({message:"requested user wasnot found"});

        res.status(200).json({data:user})

    }catch(err){
        res.status(500).json({message:err.message})
    }
}


