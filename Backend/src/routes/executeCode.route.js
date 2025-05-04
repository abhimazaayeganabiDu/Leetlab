import express from 'express';
import { checkLogin } from '../middleware/login.middleware.js';
import { executeCode } from '../controllers/executeCode.controller.js';

const app = express.Router();

app.use(checkLogin)

app.post('/execute-code',executeCode);

export default app;