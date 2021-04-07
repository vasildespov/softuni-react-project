import {
  login,
  logout,
  register,
  verify,
} from "../controllers/users.js";

import express from "express";

// import { verifyToken } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
// router.put("/:userId", verifyToken, changeUsername);
router.post("/verify", verify);
export default router;
