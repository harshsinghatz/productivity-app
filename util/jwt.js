const jwt=require('jsonwebtoken');

const SECRET_KEY=process.env.SECRET_KEY;

export const generateJWTToken = (data) => {
  return jwt.sign(data, SECRET_KEY);
};

export const verifyJWTToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (e) {
    console.log(e.message);
    return null;
  }
};

