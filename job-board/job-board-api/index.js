const express  = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const corsOptions = require('./config/corsOptions');



const app = express();

// middlewares
app.use(express.json());
app.use(cors(corsOptions()));
app.use(cookieParser())


module.exports = app;