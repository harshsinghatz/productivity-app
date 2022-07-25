import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export default async function SignUpHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password, name, dateOfBirth } = req.body;

  const userCount = await prisma.user.count({
    where: {
      email: email,
    },
  });

  if (userCount !== 0) {
    res.status(400).json({
      message: "User already exists!",
    });
  }

  const user = await prisma.user.create({
    data: {
      ...req.body,
    },
  });

  res.status(200).json({
    message: "User created, login!",
  });

  return;
}
