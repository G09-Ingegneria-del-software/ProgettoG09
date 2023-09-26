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
// TODO: split logic into routers in external files
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});


// Start the Express server, and expose the port
app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});