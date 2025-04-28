const { body, param } = require('express-validator');
const { validationResult } = require('express-validator');

const validarCrearArticulo = [
    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 100 caracteres'),
    body('marca')
        .notEmpty().withMessage('La marca es obligatoria')
        .isLength({ min: 2, max: 50 }).withMessage('La marca debe tener entre 2 y 50 caracteres')
];

const validarActualizarArticulo = [
    param('id')
        .isUUID().withMessage('ID inválido'),
    body('nombre')
        .optional()
        .isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 100 caracteres'),
    body('marca')
        .optional()
        .isLength({ min: 2, max: 50 }).withMessage('La marca debe tener entre 2 y 50 caracteres'),
    body('estado_de_activacion')
        .optional()
        .isIn(['activo', 'inactivo']).withMessage('El estado debe ser "activo" o "inactivo"')
];

const validarEliminarArticulo = [
    param('id')
        .isUUID().withMessage('ID inválido')
];

const validarResultados = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            message: 'Error de validación',
            errors: errors.array()
        });
    }
    next();
};

module.exports = {
    validarCrearArticulo,
    validarActualizarArticulo,
    validarEliminarArticulo,
    validarResultados
}; 