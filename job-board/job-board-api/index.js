const express  = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// local imports
const {corsOptions} = require('./config/corsOptions');
const Auth = require('./src/routers/auth.router');



const app = express();

// middlewares
app.use(express.json());
app.use(cors(corsOptions()));
app.use(cookieParser())

// routers
app.use('/api/jba/v1/auth', Auth);


module.exports = app;