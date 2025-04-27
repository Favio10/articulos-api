const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Articulos', {
        id:{
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        fecha_modificacion:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        marca:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        estado_de_activacion:{
            type: DataTypes.ENUM('activo', 'inactivo'),
            allowNull: false,
            defaultValue: 'activo',
        }
    }, {timestamps: false,})
}