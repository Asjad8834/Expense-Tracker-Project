import jwt from "jsonwebtoken";
import config from "../config/config.js";

async function authUser(req, res, next){
  try{

    const { token } = req.cookies;
    // or const token = req.cookies.token;

    if(!token){
      return res.status(401).json({
        success: false,
        message:"Unauthorized, No token provided"
      })
    }

    //Verify the token
    const decoded = jwt.verify(token, config.JWT_SECRET);

    if(decoded.role !== "user"){
      return res.status(403).json({
        success: false,
        message:"Forbidden, You are not authorized to access this resource"
      })
    }

    req.user = decoded;
    next();

  }
  catch(error){
    return res.status(401).json({
      success: false,
      message:"Internal server error",
      error: error.message
    })
  }
}

async function authAdmin(req, res, next){
  try{

    const { token } = req.cookies;

    if(!token){
      return res.status(401).json({
        success: false,
        message:"Unauthorized, No token provided"
      })
    }

    //Verify the token
    const decoded = jwt.verify(token, config.JWT_SECRET);

    if(decoded.role !== "admin"){
      return res.status(403).json({
        success: false,
        message:"Forbidden, You are not authorized to access this resource"
      })
    }

    req.user = decoded;
    next();

  }
  catch(error){
    return res.status(500).json({
      success: false,
      message:"Internal server error",
      error: error.message
    })
  }
}


export default { authUser, authAdmin };