import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({

  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"]
  },

  description:{
    type: String,
    required: [true, "Description is required"],
    trim: true,
    minlength: [2, "Expense description must be at least 2 characters long"],
    maxlength: [150, "Expense description must be less than 150 characters long"]
  },

  amount:{
    type: Number,
    required:[true, "Amount is required"],
    min:[0, "Expense amount cannot be negative"]
  },

  currency: {
    type: String,
    required: [true, "Currency is required"],
    uppercase: true,
    trim: true,
    minlength: [3, "Currency must be 3 characters"],
    maxlength: [3, "Currency must be 3 characters"]
  },

  category: {
    type: String,
    required: [true, "Expense category is required"],
    enum: [
        "Food",
        "Transport",
        "Entertainment",
        "Shopping",
        "Bills",
        "Healthcare",
        "Education",
        "Travel",
        "Other"
    ]
  },

  date: {
    type: Date,
    required: [true, "Expense date is required"]
  },

  subscription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscription",
    default: null
  }


}, {timestamps: true});


const expenseModel = mongoose.model("Expense", expenseSchema);

export default expenseModel;