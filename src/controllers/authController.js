const jwt = require('jsonwebtoken');
const sequelize = require('../config/db.js');
const UsuarioModel = require('../models/Usuario');
const Usuario = UsuarioModel(sequelize);

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { email } });
        
        if (!usuario) {
            return res.status(404).json({
                status: 'error',
                message: 'Usuario no encontrado'
            });
        }

        const passwordValido = await usuario.validarPassword(password);
        
        if (!passwordValido) {
            return res.status(401).json({
                status: 'error',
                message: 'Contraseña incorrecta'
            });
        }

        const token = jwt.sign(
            { 
                id: usuario.id,
                email: usuario.email,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            status: 'success',
            token,
            usuario: {
                id: usuario.id,
                email: usuario.email,
                rol: usuario.rol
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

const registrar = async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuarioExistente = await Usuario.findOne({ where: { email } });
        
        if (usuarioExistente) {
            return res.status(400).json({
                status: 'error',
                message: 'El email ya está registrado'
            });
        }

        const usuario = await Usuario.create({
            email,
            password,
            rol: 'usuario'
        });

        const token = jwt.sign(
            { 
                id: usuario.id,
                email: usuario.email,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            status: 'success',
            token,
            usuario: {
                id: usuario.id,
                email: usuario.email,
                rol: usuario.rol
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

module.exports = {
    login,
    registrar
}; 