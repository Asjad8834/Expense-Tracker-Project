import subscriptionModel from "../models/subscription.model.js";
import userModel from "../models/user.model.js";
import config from "../config/config.js";
import jwt from "jsonwebtoken";


/**
 * @route POST /api/subscriptions/createSubscription
 * @description Create a new subscription, takes in name, amount, dueDate, category
 * @access Private
 */
async function createSubscription(req, res){
  try{

    const { name, type, amount, currency, billingCycle } = req.body;

    // Validate that all the required input fields are provided
    if(!name || !type || !amount || !currency || !billingCycle){
      return res.status(400).json({
        success: false,
        message:"name, type, amount, currency and billingCycle are required"
      })
    }

    // Server will generate the start data
    const startDate = new Date();

    // Calculate renewal date based on the billing cycle
    const renewalDate = new Date(startDate);

    if(billingCycle === "weekly"){
      renewalDate.setDate(startDate.getDate() + 7);
    }
    else if(billingCycle === "monthly"){
      renewalDate.setMonth(startDate.getMonth() + 1);
    }
    else if(billingCycle === "yearly"){
      renewalDate.setFullYear(startDate.getFullYear() + 1);
    }

    // Create the subscription
    const subscription = await subscriptionModel.create({
      name,
      type,
      amount,
      currency,
      billingCycle,
      startDate,
      renewalDate,
      user: req.user.id // Assuming the user is authenticated and their ID is available in req.user
    });

    return res.status(201).json({
      success: true,
      message: "Subscription created successfully",
      data: subscription
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


/**
 * @route GET /api/subscriptions/getSubscriptions
 * @description Get all subscriptions for the authenticated user
 * @access Private
 */

async function getSubscriptions(req, res) {
    try {

        const subscriptions = await subscriptionModel.find({
            user: req.user.id
        });

        return res.status(200).json({
            success: true,
            count: subscriptions.length,
            data: subscriptions
        });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

/**
 * @route GET /api/subscriptions/getSubscription/:id
 * @description Get a single subscription by ID for the authenticated user
 * @access Private
 */

async function getSubscriptionById(req, res) {
    try {

        const id = req.params.id;

        const subscription = await subscriptionModel.findOne({
            _id: id,
            user: req.user.id
        });

        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: "Subscription not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: subscription
        });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}


/**
 * @route PUT /api/subscriptions/updateSubscription/:id
 * @description Update a subscription by ID for the authenticated user
 * @access Private
 */
async function updateSubscription(req, res) {
    try {

        const { id } = req.params;

        const { name, type, amount, currency, billingCycle, status } = req.body;

        const subscription = await subscriptionModel.findOne({
            _id: id,
            user: req.user.id
        });

        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: "Subscription not found"
            });
        }

        // Update only fields that were provided
        if (name !== undefined) {
            subscription.name = name;
        }

        if (type !== undefined) {
            subscription.type = type;
        }

        if (amount !== undefined) {
            subscription.amount = amount;
        }

        if (currency !== undefined) {
            subscription.currency = currency;
        }

        if (billingCycle !== undefined) {
            subscription.billingCycle = billingCycle;

            // Recalculate renewal date
            const renewalDate = new Date(subscription.startDate);

            if (billingCycle === "weekly") {
                renewalDate.setDate(
                    renewalDate.getDate() + 7
                );
            }
            else if (billingCycle === "monthly") {
                renewalDate.setMonth(
                    renewalDate.getMonth() + 1
                );
            }
            else if (billingCycle === "yearly") {
                renewalDate.setFullYear(
                    renewalDate.getFullYear() + 1
                );
            }

            subscription.renewalDate = renewalDate;
        }

        if (status !== undefined) {
            subscription.status = status;
        }

        await subscription.save();

        return res.status(200).json({
            success: true,
            message: "Subscription updated successfully",
            data: subscription
        });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

/**
 * @route DELETE /api/subscriptions/deleteSubscription/:id
 * @description Delete a subscription by ID for the authenticated user
 * @access Private
 */
async function deleteSubscription(req, res) {
    try {

        const { id } = req.params;

        const subscription = await subscriptionModel.findOneAndDelete({
            _id: id,
            user: req.user.id
        });

        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: "Subscription not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Subscription deleted successfully"
        });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}


  
export default { createSubscription, getSubscriptions, updateSubscription, getSubscriptionById, deleteSubscription };