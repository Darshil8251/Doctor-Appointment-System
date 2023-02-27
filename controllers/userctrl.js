const userModel =require('../Models/userModel');
const bcrypt=require('bcryptjs');
const connection = require('../config/db');
const main = require('../Models/userModel');

const JWT=require('jsonwebtoken');



// login controller
const LoginController=async (req,resp)=>{

  try {
    const data=await connection();
    const check=await data.find({Email:req.body.Email}).toArray();
    const password=check.map((item)=>{
      return item.Password;
    });
    const isMatch= await bcrypt.compare(req.body.Password,password[0]);
    if(isMatch){
       const token=JWT.sign({id:password[0]},process.env.JWT_SECRET,{expiresIn:'1d'});
      resp.status(200).send({message:'User login Successfully',succuss:true,token});
    }
    else{
      resp.status(400).send({message:'User not found',succuss:false});
    }
    
  } catch (error) {
      console.log(error);
      resp.status(500).send({message:`Error occured${error.message}`});
  }
}

// Register Controller
const RegisterController = async (req,resp)=>{
const data=await connection();
console.log(req.body.Email)
  try {
     const existingUser= await data.find({Email:req.body.Email}).toArray();
     if(existingUser.length!=0){
         return resp.status(200).send({message:'User Already register',succuss:false});
     }
    else{
      const Password=req.body.Password;
      const salt=await bcrypt.genSalt(10);
      const hashedPassword=await bcrypt.hash(Password,salt);
      req.body.Password=hashedPassword;
    data.insertOne(req.body);
    resp.status(200).send({message:"User Register Sucessfully",succuss:true});
}
  } catch (error) {
    console.log(error);
    resp.status(500).send({succuss:false,message:error.message});
  }
 
}

// Use for authetication

const authController =async (req,res)=>{
  try {
    const data=await connection();
    const user= await data.find({Email:res.body.Email}).toArray();
    console.log(user);
    console.log(user.Name);
  
    if(user.length==0){
      res.status(200).send({
        message:'Authetication Failed',
        succuss:false
      })
    } 
    else{
      res.status(200).send({
        succuss:true,
        data:{
          Name:user.Name,
          Email:user.Email
        }
      })
    }

    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:'auth error',
      succuss:false
    })
  }
}
module.exports={LoginController,RegisterController,authController};