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
import { creatorRoutes } from './routes/creator.routes';
import { editorRoutes } from './routes/editor.routes';
import { youtubeRoutes } from './routes/youtube.routes';
import { videoRoutes } from './routes/videos.routes';

// Routes Decleration
app.use('/api/v1/health-check', healthCheckRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/creator', creatorRoutes);
app.use('/api/v1/editor', editorRoutes);
app.use('/api/v1/youtube', youtubeRoutes);
app.use('/api/v1/video', videoRoutes);

export default app;
