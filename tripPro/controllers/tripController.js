const TripRepository = require('../repository/sequelize/TripRepository')

exports.showTripList = (req, res, next) => {
    TripRepository.getTrips()
        .then(trips => {
            res.render('pages/trip/list', {
                trips: trips,
                navLocation: 'trip'
            })
        })
}

exports.showAddTripForm = (req, res, next) => {
    res.render('pages/trip/form', {
        trip: {},
        pageTitle: 'New Trip',
        formMode: 'createNew',
        btnLabel: 'Add trip',
        formAction: '/trips/add',
        navLocation: 'trip',
        validationErrors: {}
    })
}

exports.showEditTripForm = (req, res, next) => {
    const idTrip = req.params.idTrip
    TripRepository.getTripById(idTrip)
        .then(trip => {
            res.render('pages/trip/form', {
                trip: trip,
                formMode: 'edit',
                pageTitle: 'Edit trip',
                btnLabel: 'Edit trip',
                formAction: '/trips/edit',
                navLocation: 'trip',
                validationErrors: {}
            })
        })
}

exports.showTripDetails = (req, res, next) => {
    const idTrip = req.params.idTrip
    TripRepository.getTripById(idTrip)
        .then(trip => {
            res.render('pages/trip/form', {
                trip: trip,
                formMode: 'showDetails',
                pageTitle: 'Trip Details',
                formAction: '',
                navLocation: 'trip',
                validationErrors: {}
            })
        })
}

exports.addTrip = (req, res, next) => {
    const tripData = { ...req.body }
    TripRepository.createTrip(tripData)
        .then(result => {
            res.redirect('/trips')
        })
        .catch(err => {
            res.render('pages/trip/form', {
                trip: tripData,
                pageTitle: 'Adding a trip',
                formMode: 'createNew',
                btnLabel: 'Add trip',
                formAction: '/trips/add',
                navLocation: 'trip',
                validationErrors: err.details
            })
        })
}

exports.updateTrip = (req, res, next) => {
    const idTrip = req.body._id
    const tripData = { ...req.body }
    TripRepository.updateTrip(idTrip, tripData)
        .then(result => {
            res.redirect('/trips')
        })
        .catch(err => {
            res.render('pages/trip/form', {
                trip: tripData,
                pageTitle: 'Modifying a trip',
                formMode: 'edit',
                btnLabel: 'Edit trip',
                formAction: '/trips/edit',
                navLocation: 'trip',
                validationErrors: err.details
            })
        })
}

exports.deleteTrip = (req, res, next) => {
    const idTrip = req.params.idTrip
    TripRepository.deleteTrip(idTrip)
        .then( () => {
            res.redirect('/trips')
        })
}