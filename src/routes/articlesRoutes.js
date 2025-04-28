const {Router} = require('express');

const router = Router();
const {
    getArticulos,
    getArticuloById,
    actualizarArticulo,
    crearArticulo,
    eliminarArticulo
} = require('../controllers/articlesControllers.js')

const {
    validarCrearArticulo,
    validarActualizarArticulo,
    validarEliminarArticulo,
    validarResultados
} = require('../middlewares/articuloValidator.js');


router.get('/', getArticulos);
router.get('/:id', getArticuloById);
router.post('/', validarCrearArticulo, validarResultados, crearArticulo);
router.patch('/:id', validarActualizarArticulo, validarResultados, actualizarArticulo);
router.patch('/:id', validarEliminarArticulo, validarResultados, eliminarArticulo);

module.exports = router;