import budgetModel from "../models/budget.model.js";

/**
 * @routes POST /api/budgets
 * @description Create a new budget
 * @access Private
 */

async function createBudget(req, res) {
    try {

        const {
            category,
            amount,
            currency,
            startDate,
            endDate
        } = req.body;

        // Validate required fields
        if (
            !category ||
            amount === undefined ||
            !currency ||
            !startDate ||
            !endDate
        ) {
            return res.status(400).json({
                success: false,
                message: "category, amount, currency, startDate and endDate are required"
            });
        }

        // Make sure end date is after start date
        if (new Date(endDate) <= new Date(startDate)) {
            return res.status(400).json({
                success: false,
                message: "End date must be after start date"
            });
        }

        // Create the budget
        const budget = await budgetModel.create({
            user: req.user.id,
            category,
            amount,
            currency,
            startDate,
            endDate
        });

        return res.status(201).json({
            success: true,
            message: "Budget created successfully",
            data: budget
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


/*
 * @routes GET /api/budgets
 * @description Get all budgets belonging to the logged-in user
 * @access Private
 */
async function getBudgets(req, res) {
    try {

        const budgets = await budgetModel.find({
            user: req.user.id
        });

        return res.status(200).json({
            success: true,
            count: budgets.length,
            data: budgets
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


/*
 * @routes GET /api/budgets/:id
 * @description Get a specific budget by ID
 * @access Private
 */
async function getBudgetById(req, res) {
    try {

        const budget = await budgetModel.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!budget) {
            return res.status(404).json({
                success: false,
                message: "Budget not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: budget
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


/*
 * @routes PUT /api/budgets/:id
 * @description Update a specific budget
 * @access Private
 */
async function updateBudget(req, res) {
    try {

        const {
            category,
            amount,
            currency,
            startDate,
            endDate
        } = req.body;

        // Find the budget and verify ownership
        const budget = await budgetModel.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!budget) {
            return res.status(404).json({
                success: false,
                message: "Budget not found"
            });
        }

        // Update only fields that were provided
        if (category !== undefined) {
            budget.category = category;
        }

        if (amount !== undefined) {
            budget.amount = amount;
        }

        if (currency !== undefined) {
            budget.currency = currency;
        }

        if (startDate !== undefined) {
            budget.startDate = startDate;
        }

        if (endDate !== undefined) {
            budget.endDate = endDate;
        }

        // Make sure the final dates are valid
        if (budget.endDate <= budget.startDate) {
            return res.status(400).json({
                success: false,
                message: "End date must be after start date"
            });
        }

        await budget.save();

        return res.status(200).json({
            success: true,
            message: "Budget updated successfully",
            data: budget
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


/*
 * @routes DELETE /api/budgets/:id
 * @description Delete a specific budget
 * @access Private
 */
async function deleteBudget(req, res) {
    try {

        const budget = await budgetModel.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!budget) {
            return res.status(404).json({
                success: false,
                message: "Budget not found"
            });
        }

        await budget.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Budget deleted successfully"
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


export default {
    createBudget,
    getBudgets,
    getBudgetById,
    updateBudget,
    deleteBudget
};