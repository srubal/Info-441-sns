import express from 'express';
import path from 'path';
import Post, {Course, Account} from './db.js';
import cookieParser from 'cookie-parser';
import logger from 'morgan';


import apiRouter from './routes/api/ApiRouter.js';

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
app.use( function (req, res, next) {
    req.db = Post;
    next();
})
// api router
app.use('/api', apiRouter);
export default app;
