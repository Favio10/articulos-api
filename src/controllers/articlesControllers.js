const sequelize = require('../config/db.js');
const {Op} = require('sequelize');


const ArticulosModel = require('../models/Articulos');
const Articulos = ArticulosModel(sequelize);

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
        if (!articulos.length) {
            return res.status(404).json({message: 'No hay artículos disponibles.'});
        }
        res.status(200).json(articulos);
    } catch (error) {
        res.status(500).json({message: error.message});    
    }
};

const getArticuloById = async (req, res) => {
    const {id} = req.params;
    try {
        const articulo = await Articulos.findByPk(id);
        if (!articulo) {
            return res.status(404).json({message: 'Artículo no encontrado'});
        }
        res.status(200).json(articulo);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const actualizarArticulo = async (req, res) => {
    const {id} = req.params;
    const {nombre, marca, estado_de_activacion} = req.body;

    try {
        const articulo = await Articulos.findByPk(id);
        if (!articulo) {
            return res.status(404).json({message: 'Artículo no encontrado'});
        }
        await articulo.update({
            ...(nombre && { nombre }),
            ...(marca && { marca }),
            ...(estado_de_activacion && { estado_de_activacion }),
            fecha_modificacion: new Date()
        });
        res.status(200).json({message: 'Artículo actualizado', articulo});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const crearArticulo = async (req, res) => {
    const {nombre, marca} = req.body;

    if (!nombre || !marca) {
        return res.status(400).json({message: '¡Nombre y Marca son obligatorios!'});
    }
    try {
        const articulo = await Articulos.create({
            nombre,
            marca,
            estado_de_activacion: 'activo',
            fecha_modificacion: new Date(),
        });
        res.status(201).json({message: 'Articulo creado:', articulo});
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const eliminarArticulo = async (req, res) => {
    const {id} = req.params;
    try {
        const articulo = await Articulos.findByPk(id);
        if (!articulo) {
            return res.status(404).json({message: 'Artículo no encontrado'});
        }
        await articulo.update({
            estado_de_activacion: 'inactivo',
            fecha_modificacion: new Date()
        });
        res.status(200).json({message: 'Artículo desactivado', articulo});
    } catch (error) {
        res.status(500).json("Recuerda que puede estar activo o inactivo. ",{ message: error.message});
    }
};

module.exports = {
    getArticulos,
    getArticuloById,
    actualizarArticulo,
    crearArticulo,
    eliminarArticulo
};