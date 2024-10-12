import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import cors from 'cors';
import authRoute from './routes/authRoutes.js';
import categoryRoute from './routes/categoryRoutes.js' 



// configure .env
dotenv.config();

// database config connection
connectDB();

// Rest Object
const app = express();

// midelwares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/category', categoryRoute)

// rest API
app.get('/', (req, res) => res.send('Please set to productiond'));

// PORT
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`
    Server started on port ${port} and mode ${process.env.DEV_MODE} at http://localhost:${port}`.bgWhite.black));