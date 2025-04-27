const {Router} = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.send('Ruta GET de articulos')
})
router.post('/', (req, res) => {
    res.send('Ruta POST de articulos')
})
router.patch('/', (req, res) => {
    res.send('Ruta PUT de articulos')
})
router.patch('/', (req, res) => {
    res.send('Ruta DELETE de articulos')
})

module.exports = router;