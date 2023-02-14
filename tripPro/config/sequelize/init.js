const sequelize = require('./sequelize')

const Client = require('../../model/sequelize/Client')
const Trip = require('../../model/sequelize/Trip')
const Client_Trip = require('../../model/sequelize/Client_Trip')
const authUtil = require('../../util/authUtils')
const passHash = authUtil.hashPassword('12345')

module.exports = () => {
    Client.hasMany(Client_Trip, {as: 'ct', foreignKey: {name: 'idClient', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Client_Trip.belongsTo(Client, {as: 'client', foreignKey: {name: 'idClient', allowNull: false}})
    Trip.hasMany(Client_Trip, {as: 'ct', foreignKey: {name: 'idTrip', allowNull: false}, constraints: true, onDelete: 'CASCADE'})
    Client_Trip.belongsTo(Trip, {as: 'trip', foreignKey: {name: 'idTrip', allowNull: false}})

    let allClients, allTrips
    return sequelize
        .sync({force: true})
        .then( () => {
            return Client.findAll()
        })
        .then(clients => {
            if (!clients || clients.length == 0) {
                return Client.bulkCreate ([
                    {firstName: 'Nikita', lastName: 'Padabed', email: 'nikita.padabed@gmail.com', telephone: '+48572801483', password: passHash, pesel: '22222222', }
                ])
                    .then( () => {
                        return Client.findAll()
                    })
            } else {
                return clients
            }
        })
        .then( clients => {
            allClients = clients
            return Trip.findAll()
        })
        .then( trips => {
            if (!trips || trips.length == 0) {
                return Trip.bulkCreate ([
                    {name: 'Russia-Dubai', dateFrom: '2022-01-01', dateTo: '2023-01-01', maxPeople: 200}
                ])
                    .then( () => {
                        return Client.findAll
                    })
            } else {
                return trips
            }
        })
        .then( trips => {
            allTrips = trips
            return Client_Trip.findAll()
        })
        .then( cts => {
            if (!cts || cts.length == 0) {
                return Client_Trip.bulkCreate ([
                    {idClient: 1, idTrip: 1, registeredAt: '2022-01-01', paymentDate: '2022-01-01'}
                ])
            } else {
                return cts
            }
        })
}