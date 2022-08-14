import { NextApiRequest, NextApiResponse } from "next";
import { verifyJWTToken } from "./jwt";
import { NextApiHandler } from "next";


export const authenticate=(fn:NextApiHandler)=> async (req:NextApiRequest,res:NextApiResponse)=>{
  const headerName="session-token";
  const token = req.headers[headerName];
  console.log("I was here")

  if(!token || !verifyJWTToken(token)){
    console.log(token,verifyJWTToken(token));
    res.status(401).json({message:"You're not authenticated!"});
  }
  
  fn(req,res);
}

