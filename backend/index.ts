import express, { Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Routers
import authRouter from './router/auth';
import userRouter from './router/user';
import categoryRouter from './router/category';
import budgetRouter from './router/budget';
import walletRouter from './router/wallet';
import transactionRouter from './router/transaction';

// Internal utilities and Middlewares
import { checker } from './controller/checker';

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

// Auth endpoint
app.use('/auth', authRouter);

// Health check enpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).send("Healthy");
});

// Documentation endpoint
// const swaggerAutogen = require('swagger-autogen')()
// const outputFile = './swagger.json'
// const endpointsFiles = ['./router/auth.ts', './router/user.ts', './router/category.ts', './router/budget.ts', './router/wallet.ts', './router/transaction.ts']
// swaggerAutogen(outputFile, endpointsFiles)

//Documentazione
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { customCssUrl: CSS_URL}) );

// Middleware for Authentification
app.use("/api", checker);

// Registration of the routers
app.use('', userRouter);
app.use('', categoryRouter);
app.use('', budgetRouter);
app.use('', walletRouter);
app.use('', transactionRouter); 

// Start the Express server, and expose the port
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

export default app;