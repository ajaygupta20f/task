import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import configurationRoutes from './routes/configurationRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';


const app = express();


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(cors({ origin: allowedOrigin }));


app.get('/health', (_req, res) => {
res.json({ status: 'ok' });
});


app.use('/api/configurations', configurationRoutes);


app.use(notFound);
app.use(errorHandler);


export default app;