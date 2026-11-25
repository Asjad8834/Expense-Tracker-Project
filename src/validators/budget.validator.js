import { z } from "zod";

// Instead of manually checking every request wthether it followws the correct type and if there are any unexpected fields present we use ZOD

/**
 * if (
    !category ||
    amount === undefined ||
    !currency ||
    !startDate ||
    !endDate
) { // Dont have to do this for evry endpoint
 */

const budgetSchema = z.object({
  // This tell zod that the body should be an object containing these fields

  category: z.enum([
      "Food",
      "Transport",
      "Entertainment",
      "Shopping",
      "Bills",
      "Healthcare",
      "Education",
      "Travel",
      "Other"
  ]),
  
  amount: z.number().min(0,"Budget amount cannot be negative"),

  currency: z.string().length(3,"Currency must be exactly 3 characters").toUpperCase(),

  startDate: z.coerce.date(),

  endDate: z.coerce.date()
  // Zod can tak ein input like "2026-11-01" and convert it into a javascript date

})

export default budgetSchema;