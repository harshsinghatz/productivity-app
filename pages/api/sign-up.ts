import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import bcrpyt from 'bcrypt';

const prisma = new PrismaClient();

export default async function SignUpHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if(req.method!=="POST"){
    res.send({
      message:"Only POST request"
    })
  };
  const { email,password} = req.body;

  const userCount = await prisma.user.count({
    where: {
      email,
    },
  });

  if (userCount !== 0) {
    res.status(400).json({
      message: "User already exists!",
    });
    return;
  }

  const hashVal:string= bcrpyt.hashSync(password,10);
  // bcrpyt.hash(process.env.BCRYPT_SECRET!,10).then(async function(hash:string){
  //   hashVal=hash;
  // })

  console.log(hashVal);

  

  const user= await prisma.user.create({
    data: {
      ...req.body,
      password:hashVal
    },
  });
  res.status(200).json({
    message: "User created, login!",
    user
  });
  return;
}
