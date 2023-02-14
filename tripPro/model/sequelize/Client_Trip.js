const Sequelize = require('sequelize')
const sequelize = require('../../config/sequelize/sequelize')

const Client_Trip = sequelize.define('Client_Trip', {
    idCT: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    idClient: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    idTrip: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    registeredAt: {
        type: Sequelize.DATE,
        allowNull: false
    },
    paymentDate: {
        type: Sequelize.DATE,
        allowNull: true
    }
})

module.exports = Client_Trip