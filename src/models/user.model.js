import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  name:{
    type: String,
    required: [true, "Please provide a name"],
    trim: true,
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [50, "Name must be less than 50 characters long"]
  },

  email:{
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    lowercase: true,
    match: [
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    "Please provide a valid email"],
    trim: true
  },

  password:{
    type: String,
    required: [true, "Please provide a password"],
    minlength: [5, "Password must be at least 5 characters long"]
  },

  role:{
    type: String,
    enum: ["user", "admin"],
    default: "user"
  }
}, {timestamps: true});


const userModel = mongoose.model("User", userSchema);

export default userModel;