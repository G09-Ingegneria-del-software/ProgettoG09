import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';

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

// MongoDB connection
// TODO: add connection to MongoDB

// Registration of the routers
import userRouter from './router/user';
import categoryRouter from './router/category';
import budgetRouter from './router/budget';
import chatRouter from './router/chat';
import walletRouter from './router/wallet';
import transactionRouter from './router/transaction';

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/budget', budgetRouter);
app.use('/api/chat', chatRouter);
app.use('/api/wallet', walletRouter);
app.use('/api/transaction', transactionRouter); 

// Start the Express server, and expose the port
app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});