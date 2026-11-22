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
 * @route GET api/expense/getExpense
 * @description Returns a User's expenses
 * @access Private
 */
async function getExpense(req, res){
  try{

    const expenses = await expenseModel.find({
      user: req.user.id
    });

    if(!expenses){
      return res.status(400).json({
        success: false,
        message:"No expenses found"
      })
    }

    setTimeout(()=>{
      console.log("Hello how u doing mate");
    }, 3000);
    
    return res.status(200).json({
      success: true,
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



export default { createExpense, getExpense }