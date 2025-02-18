import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use;

app.use(cookieParser());

// Import routes
import { healthCheckRoutes } from './routes/health-check.routes';
import { userRoutes } from './routes/user.routes';
import { youtubeRoutes } from './routes/youtube.routes';

// Routes Decleration
app.use('/api/v1/health-check', healthCheckRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/youtube', youtubeRoutes);

export default app;
