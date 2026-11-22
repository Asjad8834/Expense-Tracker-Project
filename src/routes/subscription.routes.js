import express from "express";
import subscriptionController from "../controllers/subscription.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const subscriptionRouter = express.Router();


/**
 * @route POST /api/subscription/createSubscription
 * @description Create a new subscription, takes in name, amount, dueDate, category
 * @access Private
 */
subscriptionRouter.post("/createSubscription", authMiddleware.authUser, subscriptionController.createSubscription );
 

/**
 * @route GET /api/subscription/getSubscriptions
 * @description Get all subscriptions for the authenticated user
 * @access Private
 */
subscriptionRouter.get("/getSubscriptions", authMiddleware.authUser, subscriptionController.getSubscriptions );
 
/**
 * @route GET /api/subscription/getSubscription/:id
 * @description Get a subscription by ID for the authenticated user
 * @access Private
 */
subscriptionRouter.get("/getSubscription/:id", authMiddleware.authUser, subscriptionController.getSubscriptionById );


/**
 * @route PUT /api/subscription/updateSubscription/:id
 * @description Update a subscription by ID for the authenticated user
 * @access Private
 */
subscriptionRouter.put("/updateSubscription/:id", authMiddleware.authUser, subscriptionController.updateSubscription );


/**
 * @route DELETE /api/subscription/deleteSubscription/:id
 * @description Delete a subscription by ID for the authenticated user
 * @access Private
 */
subscriptionRouter.delete("/deleteSubscription/:id", authMiddleware.authUser, subscriptionController.deleteSubscription );


export default subscriptionRouter;