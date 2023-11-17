import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load the environment variables from the .env file
dotenv.config();

// Creation of the Express application and port number
const app: Application = express();
const port = process.env.PORT || 8000;

// Middleware settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req: Request, res: Response, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Logging settings
var morgan = require('morgan');
app.use(morgan('dev'))

// MongoDB connection
mongoose
.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/expense-tracker')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Registration of the routers
import userRouter from './router/user';
import categoryRouter from './router/category';
import budgetRouter from './router/budget';
import walletRouter from './router/wallet';
import transactionRouter from './router/transaction';

app.get('/health', (req: Request, res: Response) => {
  res.status(200).send("Healthy");
});

app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/budget', budgetRouter);
app.use('/api/wallet', walletRouter);
app.use('/api/transaction', transactionRouter); 

// Start the Express server, and expose the port
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});