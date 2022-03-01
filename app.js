import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import accountRouter from './routes/a/UserActions.js';
import courseRouter from './routes/c/Course.js';
import postRouter from './routes/p/Post.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', postRouter);
app.use('/account', accountRouter);
app.use('/courses', courseRouter);
export default app;
