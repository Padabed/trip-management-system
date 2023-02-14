const ClientTripRepository = require('../repository/sequelize/ClientTripRepository')

exports.getClientTrip = (req, res, next) => {
    ClientTripRepository.getClientTrip()
        .then(cts => {
            res.status(200).json(cts)
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getClientTripById = (req, res, next) => {
    const idClientTrip = req.params.idCT
    ClientTripRepository.getClientTripById(idClientTrip)
        .then(cts => {
            if (!cts) {
                res.status(404).json({
                    message: 'Client_Trip with id: '+idClientTrip+' not found'
                })
            } else {
                res.status(200).json(cts)
            }
        })
}

exports.createClientTrip = (req, res, next) => {
    ClientTripRepository.createClientTrip(req.body)
        .then(newObj => {
            res.status(201).json(newObj)
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.updateClientTrip = (req, res, next) => {
    const idClientTrip = req.params.idCT
    ClientTripRepository.updateClientTrip(idClientTrip, req.body)
        .then(result => {
            res.status(200).json({message: 'Client_Trip updated!', ct: result})
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.deleteClientTrip = (req, res, next) => {
    const idClientTrip = req.params.idCT
    ClientTripRepository.deleteClientTrip(idClientTrip)
        .then(result => {
            res.status(200).json({message: 'Removed Client_trip', ct: result})
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}
