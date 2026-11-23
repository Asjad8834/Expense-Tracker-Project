import express from "express";
import budgetController from "../controllers/budget.controller.js";
import authUser from "../middlewares/auth.middleware.js";

const budgetRouter = express.Router();

/*
 * @routes POST /api/budgets
 * @description Create a new budget
 * @access Private
 */
budgetRouter.post(
    "/",
    authUser,
    budgetController.createBudget
);

/*
 * @routes GET /api/budgets
 * @description Get all budgets belonging to the logged-in user
 * @access Private
 */
budgetRouter.get(
    "/",
    authUser,
    budgetController.getBudgets
);

/*
 * @routes GET /api/budgets/:id
 * @description Get a specific budget by ID
 * @access Private
 */
budgetRouter.get(
    "/:id",
    authUser,
    budgetController.getBudgetById
);

/*
 * @routes PUT /api/budgets/:id
 * @description Update a specific budget
 * @access Private
 */
budgetRouter.put(
    "/:id",
    authUser,
    budgetController.updateBudget
);

/*
 * @routes DELETE /api/budgets/:id
 * @description Delete a specific budget
 * @access Private
 */
budgetRouter.delete(
    "/:id",
    authUser,
    budgetController.deleteBudget
);

export default budgetRouter;