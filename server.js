import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import cors from 'cors';
import authRoute from './routes/authRoutes.js';
import categoryRoute from './routes/categoryRoutes.js' 
import productRoute from './routes/productRoutes.js';
import compression from 'compression';





// configure .env
dotenv.config();

// database config connection
connectDB();

// Rest Object
const app = express();

app.use(compression());

// middlewares
const allowedOrigins = [
    "http://localhost:5174",
    "http://localhost:8000",
    "http://localhost:8080",
    "https://mern-ecommerce-app-ten.vercel.app"
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/category', categoryRoute)
app.use('/api/v1/product', productRoute)


// rest API
app.get('/', (req, res) => res.send('Please set to production'));

// PORT
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server started on mode ${process.env.DEV_MODE} at http://localhost:${port}`.bgGreen.black.bold));