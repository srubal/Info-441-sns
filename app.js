import express from 'express';
import path from 'path';
import {Post, Course, Account} from './db.js';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import appSettings from './auth_key.js';
import msIdExpress from 'microsoft-identity-express';
import sessions from 'express-session';

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
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "this is some secret key I am making up  vewkhivw44einvwvripouew t5e98n4w",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}))
const msid = new msIdExpress.WebAppAuthClientBuilder(appSettings).build();
app.use(msid.initialize());
app.get('/signin',
    msid.signIn({postLoginRedirect: '/api/a/'})
)
app.get('/signout', 
    msid.signOut({postLogoutRedirect: '/'})
)
app.get('/unauthorized', (req, res) => res.status(401).send('Permission Denied'))
app.get('/error', (req, res) => res.status(500).send('Server Error')) 
// api router
app.use('/api', apiRouter);
export default app;
