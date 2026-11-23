import expenseModel from "../models/expense.model.js";
import subscriptionModel from "../models/subscription.model.js";

/**
 * @route POST /api/expense/createExpense
 * @description Create Expense, takes in description, amount, currency, category, date, subscription
 * @access Private
 */
async function createExpense(req, res){
  try{

    const { description, amount, currency, category, date, subscription } = req.body;

    // Validate required fields
    if (
            !description ||
            amount === undefined ||
            !currency ||
            !category ||
            !date
        ) {
            return res.status(400).json({
                success: false,
                message: "description, amount, currency, category and date are required"
            });
        }
    
    // If a subscription is provided
    // Make sure it belongs to a logged In user

    if(subscription){
      const subscriptionExists = await subscriptionModel.findOne({
        _id: subscription,
        user: req.user.id
      })

      if(!subscriptionExists){
        return res.status(404).json({
          success: false,
          message:"Subscription not found"
        })
      }
    }

    // Now we will create the expense
    const expense = await expenseModel.create({
      user: req.user.id,
      description,
      amount,
      currency,
      category,
      date,
      subscription: subscription || null
    })

    return res.status(201).json({
            success: true,
            message: "Expense created successfully",
            data: expense
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
 * @route GET api/expenses/getExpense
 * @description Returns a User's expenses
 * @access Private
 */
async function getExpense(req, res){
  try{

    //We are Implementing pagination by page no so we wil do
    // Get page number from query parameter
    const page = parseInt(req.query.page) || 1;
    // Query parameters come as Strings so we convert them into Integer

    // No of expenses per page
    const limit = 20;

    // Calculate how many expenses to skip for page 2
    const skip = (page - 1) * limit;

    const expenses = await expenseModel.find({
      user: req.user.id
    }).skip(skip).limit(limit);

    // Get total no of expenses
    const totalExpenses = await expenseModel.countDocuments({
      user: req.user.id
    })

    // Calculate total pages
    const totalPages = Math.ceil(totalExpenses / limit);

    if(!expenses){
      return res.status(400).json({
        success: false,
        message:"No expenses found"
      })
    }    
    
    return res.status(200).json({
      success: true,
      page,
      limit,
      totalExpenses,
      totalPages,
      count: expenses.length,
      data: expenses
    })
  
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
 * @route GET api/expenses/:id
 * @description Returns a User's particular expense
 * @access Private
 */
async function getExpenseById(req, res){
  try{

    const { id } = req.params;

    if(!id){
      return res.status(400).json({
        success: false,
        message:"Expense ID missing"
      })
    }

    const expense = await expenseModel.findOne({
      _id: id,
      user: req.user.id
    })

    if(!expense){
      return res.status(401).json({
        success: false,
        message:"No expense found"
      })
    }

    return res.status(200).json({
      success: true,
      data: expense
    })

  }
  catch(error){
    return res.status(500).json({
      success: false,
      message:"Internal Server Error",
      error: error.message
    })
  }
}

/**
 * @route PUT api/expenses/:id
 * @description Update a User's expense
 * @access Private
 */
async function updateExpense(req, res){
  try{

    const { id } = req.params;

    const { description, amount, currency, category, date, subscription } = req.body;

    const expense = await expenseModel.findOne({
      _id: id,
      user: req.user.id
    })

    if(!expense){
      return res.status(400).json({
        success: false,
        message:"No expense found"
      })
    }

    if(description !== undefined){
      expense.description = description;
    }

    if(amount !== undefined){
      expense.amount = amount
    }

    if(currency !== undefined){
      expense.currency = currency
    }

    if (category !== undefined) {
            expense.category = category;
    }

    if (date !== undefined) {
            expense.date = date;
    }

    if (subscription !== undefined) {
            expense.subscription = subscription;
    }

    await expense.save();

    return res.status(200).json({
      success: true,
      message:"Expense updated successfully",
      data: expense
    })

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
 * @route DELETE api/expenses/:id
 * @description Returns a User's expenses
 * @access Private
 */
async function deleteExpense(req, res){
  try{

    const id = req.params.id;

    const expense = await expenseModel.findOne({
      _id: id,
      user: req.user.id
    })

    // We could have also done expenseModel.findOneAndDelete and pass the parameters

    if(!expense){
      return res.status(400).json({
        success: false,
        message:"No expense found"
      })
    }

    await expense.deleteOne();

    return res.status(200).json({
      success: true,
      message:"Expense deleted successfully"
    })

  }
  catch(error){
    return res.status(500).json({
      success: false,
      message:"Internal Server Error",
      error: error.message
    })
  }
}


export default { createExpense, getExpense, getExpenseById, updateExpense, deleteExpense };