import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"]
    },

    name: {
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
        minlength: [2, "Subscription name must be at least 2 characters long"],
        maxlength: [100, "Subscription name must be less than 100 characters long"]
    },

    type: {
        type: String,
        required: [true, "Subscription type is required"],
        enum: [
            "Entertainment",
            "Software",
            "Education",
            "Fitness",
            "Cloud",
            "Music",
            "Other"
        ]
    },

    amount: {
        type: Number,
        required: [true, "Subscription amount is required"],
        min: [0, "Subscription amount cannot be negative"]
    },

    currency: {
        type: String,
        required: [true, "Currency is required"],
        uppercase: true,
        trim: true,
        minlength: [3, "Currency must be 3 characters"],
        maxlength: [3, "Currency must be 3 characters"]
    },

    billingCycle: {
        type: String,
        required: [true, "Billing cycle is required"],
        enum: [
            "weekly",
            "monthly",
            "yearly"
        ]
    },

    startDate: {
        type: Date,
        required: [true, "Start date is required"]
    },

    renewalDate: {
        type: Date,
        required: [true, "Renewal date is required"]
    },

    status: {
        type: String,
        enum: [
            "active",
            "cancelled"
        ],
        default: "active"
    }

}, { timestamps: true });

const subscriptionModel = mongoose.model(
    "Subscription",
    subscriptionSchema
);

export default subscriptionModel;