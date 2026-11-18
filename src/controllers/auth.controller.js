import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

/**
 * @route POST /api/auth/register
 * @description Register a new user takes in name,email,      password, role
 * @access public
 */
async function registerUser(req, res){
  try{

    const { name, email, password } = req.body;

    // Validate that all the required input fields are provided
    if(!name || !email || !password){
      return res.status(400).json({
        success: false,
        message:"name, email and password are required"
      })
    }

    // Check if the user already exists
    const userAlreadyExists = await userModel.findOne({
      $or:[
        {name},
        {email}
      ]
    })

    if(userAlreadyExists){
      return res.status(409).json({
        success: false,
        message:"User Already Exists"
      })
    }

    // We will hash the user password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the User
     const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      //role already made it default in the schema
     })

     // We will assign a token to this user
     const token = jwt.sign({
      id: user._id,
      role: user.role
     }, config.JWT_SECRET, {expiresIn: "1d"});

     // Store that token in the cookies
     res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 // 1 day
     });

     // Send the response
     return res.status(201).json({
      success: true,
      message:"User Registered Successfully",
      user:{
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      //token
     })

  }
  catch(error){
    return res.status(500).json({
      success: false,
      message:"Internal server error",
      error: error.message
    })
  }
}


/**
 * @route POST /api/auth/login
 * @description Login a user takes in email and password
 * @access public
 */
async function loginUser(req, res){
  try{

    const { email, password } = req.body;

    if(!email || !password){
      return res.status(400).json({
        success: false,
        message:"Email and password are required"
      })
    }

    //Fetch the details of the user with this email
    const user = await userModel.findOne({ email });

    if(!user){
      return res.status(401).json({
        success: false,
        message:"User not found"
      })
    }

    // Check the user's passowrd and compar eit with the password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
      return res.status(401).json({
        success: false,
        message:"Invalid credentials"
      })
    }

    // Assign it a token
    const token = jwt.sign({
      id: user._id,
      role: user.role
    }, config.JWT_SECRET, { expiresIn:"1D" });

    // Store it in the cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    });

    return res.status(200).json({
      success: true,
      message:"User logged in successfully",
      user:{
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }});

  }
  catch(error){
    return res.status(500).json({
      success: false,
      message:"Internal server error",
      error: error.message
    })
  }
}

/**
 * @route POST /api/auth/logout
 * @description Logout a user takes in email and password
 * @access public
 */
async function logoutUser(req, res){
  try{
    // Clear the cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "lax"
    });

    return res.status(200).json({
      success: true,
      message:"User logged out successfully"
    });
  }
  catch(error){
    return res.status(500).json({
      success: false,
      message:"Internal server error",
      error: error.message
    })
  }
}

export default { registerUser, loginUser, logoutUser };