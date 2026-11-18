import mongoose from "mongoose";
import config from "../config/config.js"

async function connectDb(){
  try{
    
    await mongoose.connect(config.MONGO_URI);
    console.log("Database Connected");

  }
  catch(error){
    console.error("Database connection error", error);
    process.exit(1);
  }
}

export default connectDb;