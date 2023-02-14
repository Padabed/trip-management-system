const Client = require('../../model/sequelize/Client')
const Trip = require('../../model/sequelize/Trip')
const Client_Trip = require('../../model/sequelize/Client_Trip')
const tripSchema = require("../../model/joi/Trip")

exports.getTrips = () => {
    return Trip.findAll()
}

exports.getTripById = (idTrip) => {
    return Trip.findByPk(idTrip,
        {
            include: [{
                model: Client_Trip,
                as: 'ct',
                include: [{
                    model: Client,
                    as: 'client'
                }]
            }]
        })
}

exports.createTrip = (newTrip) => {
    const vRes = tripSchema.validate(newTrip, {
        abortEarly: false
    })
    if (vRes.error) {
        return Promise.reject(vRes.error)
    }
    return Trip.create({
        name: newTrip.name,
        dateFrom: newTrip.dateFrom,
        dateTo: newTrip.dateTo,
        maxPeople: newTrip.maxPeople
    })
}

exports.updateTrip = (idTrip, tripData) => {
    const vRes = tripSchema.validate(tripData, {
        abortEarly: false
    })
    if (vRes.error) {
        return Promise.reject(vRes.error)
    }
    // const name = tripData.name
    // const dateFrom = tripData.dateFrom
    // const dateTo = tripData.dateTo
    // const maxPeople = tripData.maxPeople
    return Trip.update(tripData, {where: {idTrip: idTrip}})
}

exports.deleteTrip = (idTrip) => {
    return Trip.destroy({
        where: {idTrip: idTrip}
    })
}