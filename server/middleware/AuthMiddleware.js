import User from "../models/User.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const verifyToken = async (req, res, next) => {
  const cookie = req.headers.cookie
  try {
    const token = cookie.split("=")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    req.user = user;
    console.log(`verified token = ${req.user}`)
    next();
  } catch (error) { 
    res.status(404).send("Unauthorized");
  }
};
 