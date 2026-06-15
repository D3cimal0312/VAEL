import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  family: 4, // force IPv4
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

transporter.verify((err)=>{
  if(err){
    console.log(err);
  }else{
    console.log("Server is ready to take our messages");
  }
})

export default transporter;