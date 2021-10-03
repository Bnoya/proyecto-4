const express = require('express');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const { users } = require('./objects/index.js');

const db = require('./objects/index.js');
const app = express();

db.sequelize.sync();

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

const SECRET_KEY = 'lifeisgood';