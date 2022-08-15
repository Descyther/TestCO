import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import {indexRouter} from './routes/index.js';

let app = express();
const __dirname = path.resolve();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.dirname(__dirname)));

app.use('/', indexRouter);

export default app;
