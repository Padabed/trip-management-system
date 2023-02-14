const Sequelize = require('sequelize')
const sequelize = require('../../config/sequelize/sequelize')

const Client = sequelize.define('Client', {
    idClient: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    telephone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    pesel: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
})

module.exports = Client