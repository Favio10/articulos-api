const express = require('express');
const cors = require('cors');
const articlesRoutes = require('./routes/articlesRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const { verificarToken, verificarRol } = require('./middlewares/auth.js');

const app = express();


app.use(cors());
app.use(express.json());


app.use('/auth', authRoutes);

app.use(verificarToken);

app.use('/articulos', articlesRoutes);

module.exports = app;