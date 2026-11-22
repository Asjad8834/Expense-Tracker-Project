import express from 'express';
import expenseController from "../controllers/expense.controller.js";

import authMiddleware from '../middlewares/auth.middleware.js';
import authController from '../controllers/auth.controller.js';

const expenseRouter = express.Router();


/**
 * @route POST /api/expense/create
 * @description Create an Expense takes in description, amount, currency, category, date, ssubscription
 * @access Private
 */
expenseRouter.post("/createExpense", authMiddleware.authUser, expenseController.createExpense);

/**
 * @route GET api/expense/getExpense
 * @description Returns the expenses for a particular user
 * @access Private
 */
expenseRouter.get("/getExpense", authMiddleware.authUser,expenseController.getExpense);




export default expenseRouter;