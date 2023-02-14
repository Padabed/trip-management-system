const Sequelize = require('sequelize')
const sequelize = require('../../config/sequelize/sequelize')

const Trip = sequelize.define('Trip', {
    idTrip: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dateFrom: {
        type: Sequelize.DATE,
        allowNull: false
    },
    dateTo: {
        type: Sequelize.DATE,
        allowNull: true
    },
    maxPeople: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = Trip
