import express from "express";
import {
  login,
  register,
  logout,
  changeUsername,
  verify,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.put("/:userId", verifyToken, changeUsername);
router.post("/verify", verify);
export default router;
