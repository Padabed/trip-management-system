const Sequelize = require('sequelize')

const Client = require('../../model/sequelize/Client')
const Trip = require('../../model/sequelize/Trip')
const Client_Trip = require('../../model/sequelize/Client_Trip')

exports.getClientTrip = () => {
    return Client_Trip.findAll({include: [
            {
                model: Client,
                as: 'client'
            },
            {
                model: Trip,
                as: 'trip'
            }
        ]})
}

exports.getClientTripById = (idClientTrip) => {
    return Client_Trip.findByPk(idClientTrip, {include: [
            {
                model: Client,
                as: 'client'
            },
            {
                model: Trip,
                as: 'trip'
            }
        ]})
}

exports.createClientTrip = (data) => {
    console.log(JSON.stringify(data))

    return Client_Trip.create({
        idTrip: data.idTrip,
        idClient: data.idClient,
        registeredAt: data.registeredAt,
        paymentDate: data.paymentDate
    })
}

exports.updateClientTrip = (idClientTrip, data) => {
    return Client_Trip.update(data, {where: {idCT: idClientTrip}})
}

exports.deleteClientTrip = (idClientTrip) => {
    return Client_Trip.destroy({
        where: {idCT: idClientTrip}
    })
}

exports.deleteManyClientTrips = (idClientTrip) => {
    return Client_Trip.destroy.findAll({idCT: { [Sequelize.Op.in]: idClientTrip}})
}