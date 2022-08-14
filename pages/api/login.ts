import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import {generateJWTToken} from '../../util/jwt';
import bcrpyt from 'bcrypt';

const prisma=new PrismaClient();

export default async function LoginHandler(req:NextApiRequest, res:NextApiResponse) {
  if(req.method!=="GET"){
    res.end("Only get requests!!")
  };

  const { email, password }:{email:string,password:string} = req.body;
  console.log(email,password);

  if(!email || !password){
    res.end("Email/Password missing!");
    return;
  }

  const user=await prisma.user.findFirst({
    where:{
      email:email
    }
  });

  if(!user){
    res.end("Email not found, please sign up!");
    return;
  }
  const result=bcrpyt.compareSync(password,user.password)

  if(result){
    res.setHeader(
      "session-token",
      generateJWTToken({email:email})
    );
    res.end("Login sucessfull!!");
    return;
  }

  res.end("Wrong password!");

  return;
}
