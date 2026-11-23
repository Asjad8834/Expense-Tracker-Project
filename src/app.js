import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import expenseRouter from "./routes/expense.routes.js"; 
import budgetRouter from "./routes/budget.routes.js";
import morgan from "morgan";
  

const app = express();


app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

// Middleware
app.use("/api/auth", authRouter);
app.use("/api/subscriptions", subscriptionRouter);
app.use("/api/expenses", expenseRouter);
app.use("/api/budgets", budgetRouter);


//Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Subscription and Expense Tracker API");
});


export default app;