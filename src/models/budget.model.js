import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"]
    },

    category: {
        type: String,
        required: [true, "Budget category is required"],
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

    amount: {
        type: Number,
        required: [true, "Budget amount is required"],
        min: [0, "Budget amount cannot be negative"]
    },

    currency: {
        type: String,
        required: [true, "Currency is required"],
        uppercase: true,
        trim: true,
        minlength: [3, "Currency must be 3 characters"],
        maxlength: [3, "Currency must be 3 characters"]
    },

    startDate: {
        type: Date,
        required: [true, "Budget start date is required"]
    },

    endDate: {
        type: Date,
        required: [true, "Budget end date is required"]
    }

}, { timestamps: true });


const budgetModel = mongoose.model("Budget", budgetSchema);

export default budgetModel;