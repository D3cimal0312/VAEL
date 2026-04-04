import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import connectMainDB from './config/maindb.js'

import productRoutes  from "./routes/product.routes.js";
dotenv.config();


const app = express();


app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

connectMainDB() 

app.get('/',(req,res)=>{
    res.json({
        message:'server is running'
    })
})

app.use("/products",productRoutes);

app.listen(process.env.PORT || 5000 ,()=>{
    console.log(`SERVER RUNNING ON PORT ${process.env.PORT || 5000}`)
})