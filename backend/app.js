import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import promMid from 'express-prometheus-middleware';
import cors from 'cors';
import authenticateToken from './routes/helpers/auth.js';
import indexRouter from './routes/index.js';

const app = express();
const __dirname = path.resolve();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.dirname(__dirname)));
app.use('', authenticateToken, promMid({
  metricsPath: '/metrics',
  collectDefaultMetrics: true,
  requestDurationBuckets: [0.1, 0.5, 1, 1.5],
  requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
  responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
}));

app.use('', indexRouter);

export default app;
