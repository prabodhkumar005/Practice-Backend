import express from "express";
import { getAllUser, Login, Logout, Register, updateProfile } from "../controllers/user.controller.js";
import { User } from "../models/User.model.js";
import { singleUpload } from "../middleware/multer.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
const router=express.Router();

router.route("/register").post(Register)
router.route("/login").post(Login)
router.route("/logout").get(Logout)
router.route("/getUsers").get(getAllUser)
router.route("/profile/update").put(isAuthenticated,singleUpload,updateProfile)
export default router;