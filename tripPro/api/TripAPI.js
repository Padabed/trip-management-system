const TripRepository = require('../repository/sequelize/TripRepository')

exports.getTrips = (req, res, next) => {
    TripRepository.getTrips()
        .then(trips => {
            res.status(200).json(trips)
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getTripById = (req, res, next) => {
    const idTrip = req.params.idTrip
    TripRepository.getTripById(idTrip)
        .then(trip => {
            if (!trip) {
                res.status(404).json({
                    message: 'Trip with id: '+idTrip+' not found'
                })
            } else {
                res.status(200).json(trip)
            }
        })
}

exports.createTrip = (req, res, next) => {
    TripRepository.createTrip(req.body)
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

exports.updateTrip = (req, res, next) => {
    const idTrip = req.params.idTrip
    TripRepository.updateTrip(idTrip, req.body)
        .then(result => {
            res.status(200).json({message: 'Trip updated!', trip: result})
        })
        .catch(err => {
            console.log(err);
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.deleteTrip = (req, res, next) => {
    const idTrip = req.params.idTrip
    TripRepository.deleteTrip(idTrip)
        .then(res => {
            res.status(200).json({message: 'Removed Trip', trip: res})
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}
