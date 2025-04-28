const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
dotenv.config();
const {LOCAL_DB_USER, LOCAL_DB_PASSWORD, LOCAL_DB_HOST} = process.env;

const sequelize = new Sequelize(
    `postgres://${LOCAL_DB_USER}:${LOCAL_DB_PASSWORD}@${LOCAL_DB_HOST}/articulos`,
    {
        logging: true,
        native: false, 
    }
)


module.exports = sequelize;