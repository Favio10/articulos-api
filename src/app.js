
const express = require('express');
const cors = require('cors');
const articlesRoutes = require('./routes/articlesRoutes.js');


const app = express();
app.use(cors());
app.use(express.json());
app.use('/articulos', articlesRoutes)

module.exports = app;