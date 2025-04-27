const {Router} = require('express');

const router = Router();
const {
    getArticulos,
    getArticuloById,
    actualizarArticulo,
    crearArticulo,
    eliminarArticulo
} = require('../controllers/articlesControllers.js')

router.get('/', getArticulos);
router.post('/', crearArticulo);
router.patch('/:id',actualizarArticulo)
router.delete('/:id', eliminarArticulo)

module.exports = router;