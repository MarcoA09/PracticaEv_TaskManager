import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/tasks.routes.js';
import groupRoutes from './routes/groups.routes.js';
import colaboradoresRoutes from './routes/colaboradores.routes.js';
const FRONTEND_URL = process.env.FRONTEND_URL;
const FRONTEND_URL_WQQJ = process.env.FRONTEND_URL_WQQJ;
const FRONTEND_URL_I24M = process.env.FRONTEND_URL_I24M;

const app = express();


const allowedOrigins = [
  'https://ev-r-task-manager-front.vercel.app',
  'https://ev-r-task-manager-front-wqqj.vercel.app',
  'https://ev-r-task-manager-front-i24m.vercel.app', /
];

app.use(cors({
  credentials: true, 
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);  
    }
    return callback(new Error('CORS policy does not allow access from this origin'));
  },
}));



app.options('*', cors());

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);  
app.use("/api", taskRoutes);  
app.use("/api", groupRoutes);  
app.use("/api", colaboradoresRoutes);  


export default app;
