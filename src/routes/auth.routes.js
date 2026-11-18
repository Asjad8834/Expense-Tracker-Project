import express from "express";
import authController from "../controllers/auth.controller.js";

const authRouter = express.Router();


/**
  * @route POST /api/auth/register
  * @description Register a new user, takes in name, email, password role
  * @access Public
 */
authRouter.post("/register", authController.registerUser );


/**
 * @route POST /api/auth/login
 * @description Login a user, takes in email and password
 * @access Public
 */
authRouter.post("/login", authController.loginUser );

/**
 * @route POST /api/auth/logout
 * @description Logout a user, takes in email and password
 * @access Public
 */
authRouter.post("/logout", authController.logoutUser );



export default authRouter;
