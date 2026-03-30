import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import connectMainDB from './config/maindb.js'

dotenv.config();


const app = express();


app.use(cors());
app.use(express.json());

connectMainDB() 

app.get('/',(req,res)=>{
    res.json({
        message:'server is running'
    })
})

app.listen(process.env.PORT || 5000 ,()=>{
    console.log(`SERVER RUNNING ON PORT ${process.env.PORT || 5000}`)
})