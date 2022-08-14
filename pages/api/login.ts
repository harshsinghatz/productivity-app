import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import {generateJWTToken} from '../../util/jwt';
import bcrpyt from 'bcrypt';

const prisma=new PrismaClient();

async function LoginHandler(req:NextApiRequest, res:NextApiResponse){
  if(req.method!=="POST"){
    res.status(401).json({success:false,message:"Only post requests!!"})
  };

  const { email, password }:{email:string,password:string} = req.body;
  console.log(email,password);

  if(!email || !password){
    res.status(301).json({success:false,message:"Email/Password missing!"});
    return;
  }

  const user=await prisma.user.findFirst({
    where:{
      email:email
    }
  });

  if(!user){
    res.status(301).json({success:false,message:"Email not found, please sign up!"});
  }
  const result=bcrpyt.compareSync(password,user!.password)

  if(result){
    res.setHeader(
      "session-token",
      generateJWTToken({email:email})
    );
    res.status(200).json({success:true,message:"User logged in successfully!"});
    return;
  }

  res.status(300).json({success:false,message:"Wrong Password!"});
  return;
}

export default LoginHandler;