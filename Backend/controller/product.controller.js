import Product from "../models/Product.js"


// POST request
// !ccreating new product
export const createProduct=async(req,res)=>{
    try{
        const product =await Product.create(req.body);
        res.status(201).json({data:product});
    }catch(error){
        res.status(400).json({message:error.message});
    }
};

// PUT request
// !updating the existing product
export const updateProduct=async(req,res)=>{
    try{
        const product=await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true,
                runValidators:true,  // this runs schema validators on updating too
            }
        )
        if(!product){
            return res.status(404).json({
                success:false,message:"Product was not found"
            });
        }
        res.status(200).json({data:product});
    }catch(error){
        res.status(400).json({message:error.message})
    }
}


// DELETE REQUEST
// Standard is to not delete but archieve a data so order history stays proper
// !delete garda customer order/purchse history ma issue na hos vanera

export const deleteProduct=async(req,res)=>{
    try{
        const product =await Product.findByIdAndUpdate(
            req.params.id,
            {status:"archived"}, // just make the data is not go from db to front or filter in front end
            {new:true,},
        )
    if(!product){
        return res.status(400).json({message:"Product not found to delete"});
    }
    res.status(200).json({message:"Product has been deleted/archived successfully"});
    } catch(error){
        res.status(500).json({message:error.message});
    }

}


// GET request
// !get req ma backend bata filter garera front end ma send garne garne xam

export const getAllProducts=async(req,res)=>{
    try {
        // ~req bata j j data aauxa tes sab ko lai eutta variblae dim
        const {category,gender,isNew,isSale,tags,sort  = "createdAt", order = "desc",page=1,limit=25,q}=req.query;
    
        // !making filter to get th required data
        const filter = req.user?.role === "admin" ? {} : { status: "published" };  //yesma taking what the user get to see be admin or user
        

        // !filter ma value set garne as per the get req url type
        if(gender) filter.gender={ $in:[gender.toLowerCase(),"unisex"]};
        if(category) filter.category=category.toLowerCase();
        if(isNew==='true') filter.isNew=true;

        if(isSale==='true') filter.isSale=true;
        if(tags) filter.tags={$in: tags.split(",").map(t=>t.trim().toLowerCase())};

        if(q) filter.$text={$search:q};


        // 
        // !this is called whitelisting where we can saved what acceptable url query so slum searches dont go to MongoDB
        const allowedSorts =["pricing","rating","createdAt"]; 


        // !setting up how we sort up the incomming data 
        // query /search khe xa vaye meta textcore mongo keyword le sort garxam natra whiteslisted data bata sort garxam vanera

        const sortObj=q?{score:{$meta:"textscore"}}: { [allowedSorts.includes(sort) ? sort : "createdAt"]: order === "asc" ? 1 : -1 };

        // !the select keyword here is used to filter in incomming data by excluding it (exludes the one with -  and can be used to include specific data by not using -)
 const products = await Product.find(filter).sort(sortObj).select("-__v");



 res.status(200).json({
    count:products.length,
    data:products,
 });
 
    }catch(error){
        res.status(500).json({message:error.message});
    }
}


export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({
      slug:   req.params.slug, 
      status: "published",       
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({  data: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
