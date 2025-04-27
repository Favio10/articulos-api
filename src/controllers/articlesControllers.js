const {Articulos} = require('../models/Articulos');
const {Op} = require('sequelize');


const getArticulos = async (req, res) => {
    try {
        const {nombre, estado} = req.query;
        const articulos = await Articulos.findAll({
            where: {
                ...(nombre && {
                    nombre: { [Op.like]: `%${nombre}%`}
                }),
                ...(estado && {
                    estado_de_activacion: estado
                }),
            },
        });
    res.status(200).json(articulos);
}
    catch (error) {
        res.status(500).json({message: error.message});    
    }
};

const getArticuloById = async (req, res) => {
    const {id} = req.params;
    try {
        const articulo = await Articulos.findByPk(id);
        if (!articulo) {
            return res.status(404).json({message: 'Articulo no encontrado'});
        }
        res.status(200).json(articulo);
        } catch (error) {
            res.status(500).json({message: error.message});
    }
};

const actualizarArticulo = async (req, res) => {};

const crearArticulo = async (req, res) => {};

const eliminarArticulo = async (req, res) => {};

module.exports = {
    getArticulos,
    getArticuloById,
    actualizarArticulo,
    crearArticulo,
    eliminarArticulo
};