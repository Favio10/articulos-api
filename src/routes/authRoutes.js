const { Router } = require('express');
const { body } = require('express-validator');
const { login, registrar } = require('../controllers/authController.js');
const { validarResultados } = require('../middlewares/articuloValidator.js');

const router = Router();

const validarLogin = [
    body('email')
        .isEmail().withMessage('Email inválido'),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
];

const validarRegistro = [
    body('email')
        .isEmail().withMessage('Email inválido'),
    body('password')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];

router.post('/login', validarLogin, validarResultados, login);
router.post('/registro', validarRegistro, validarResultados, registrar);

module.exports = router; 