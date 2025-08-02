import express from "express";
import { Register } from "../controllers/user.controller.js";
import { User } from "../models/User.model.js";
const router=express.Router();

router.route("/register").post(Register)
export default router;