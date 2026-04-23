import Category from "../models/Category.js"


// !creating new category
export const createCategory=async(req,res)=>{

    try{
        const category =await Category.create(req.body);
        if(!category) return res.status(404).json({
            message:"category creation issue"
        })
        res.status(200).json({data:category});
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

// !handling update category
export const updateCategory=async(req,res)=>{
    try{
        const category=await Category.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
        })

        if(!category) return res.status(404).json({
            message:"category not found"
        })
        res.status(200).json({data:category});
    }catch(err){
        res.status(500).json({message:err.messsage})
    }
}




// !getting all category
export const getAllCategory=async(req,res)=>{

    try{


         const sortDirection =req.query.sortOrder==="asc"? -1:1;

        const categories=await Category.find().sort({name:sortDirection});

        
        // !todo /categories?sortOrder=${sortOrder} later froont end ma url update

        if(categories.length===0)
            return res.status(404).json({message:"Unable to fetch any category data"})

        res.status(200).json({data:categories});

    }catch(err){
        res.status(500).json({message:err.message})
    }
}


// !getting a single category

export const getCategoryById=async(req,res)=>{
    try{
        const singlecategory= await Category.findById(req.params.id);

        if(!singlecategory){
            return res.status(404).json({message:"unable to find the category by id"})
        }

        res.status(200).json({data:singlecategory})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}



