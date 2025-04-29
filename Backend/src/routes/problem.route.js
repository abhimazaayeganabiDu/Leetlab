import express from 'express'
import { checkAdmin, checkLogin } from '../middleware/login.middleware.js';
import { createProblem } from '../controllers/problem.controller.js';

const app = express.Router();

// check if user is logged or not
app.use(checkLogin)

app.post("/create-problem", createProblem)
// app.get("/get-problem/:id",)
// app.get("/get-solved-problem")

// // check user is admin or not 
// app.use(checkAdmin)

// app.post("create-problem",)
// app.put("/update-problem/:id")
// app.delete("/delete-problem/:id",)


export default app;