const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
    const Usuario = sequelize.define('usuarios', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rol: {
            type: DataTypes.ENUM('admin', 'usuario'),
            allowNull: false,
            defaultValue: 'usuario'
        }
    }, {
        timestamps: true,
        hooks: {
            beforeCreate: async (usuario) => {
                if (usuario.password) {
                    const salt = await bcrypt.genSalt(10);
                    usuario.password = await bcrypt.hash(usuario.password, salt);
                }
            },
            beforeUpdate: async (usuario) => {
                if (usuario.changed('password')) {
                    const salt = await bcrypt.genSalt(10);
                    usuario.password = await bcrypt.hash(usuario.password, salt);
                }
            }
        }
    });

    Usuario.prototype.validarPassword = async function(password) {
        return await bcrypt.compare(password, this.password);
    };

    return Usuario;
}; 