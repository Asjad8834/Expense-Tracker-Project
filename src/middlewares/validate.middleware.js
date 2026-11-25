import budgetSchema from "../validators/budget.validator.js";

function validateBudget(req, res, next){

  const result = budgetSchema.safeParse(req.body);
  // safeParse() doest throw an exception when validation fails. Instead, it gives us a result

  if(!result.success){
    return res.status(400).json({
      success: false,
      message:"Input Validation failed",
      errors: result.error.issues
    })
    // Zod can tell us what went wrong
  }

  req.body = result.data;

  next();

}


export default { validateBudget };