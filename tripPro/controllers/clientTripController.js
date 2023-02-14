const ClientTripRepository = require('../repository/sequelize/ClientTripRepository')
const ClientRepository = require("../repository/sequelize/ClientRepository");

exports.showClientTripList = (req, res, next) => {
    ClientTripRepository.getClientTrip()
        .then(cts => {
            res.render('pages/client_trip/list', {
                cts: cts,
                navLocation: 'ct'
            })
        })
}

exports.showAddClientTripForm = (req, res, next) => {
    res.render('pages/client_trip/form', {
        ct: {},
        pageTitle: 'New Client_Trip',
        formMode: 'createNew',
        btnLabel: 'Add Client_Trip',
        formAction: '/cts/add',
        navLocation: 'ct',
        validationErrors: {}
    })
}

exports.showEditClientTrip = (req, res, next) => {
    const idClientTrip = req.params._id
    ClientTripRepository.getClientTripById(idClientTrip)
        .then(ct => {
            res.render('pages/client_trip/form', {
                ct: ct,
                formMode: 'edit',
                pageTitle: 'Edit Client_Trip',
                btnLabel: 'Edit Client_Trip',
                formAction: '/cts/edit',
                navLocation: 'ct',
                validationErrors: {}
            })
        })
}

exports.showClientTripDetails = (req, res, next) => {
    const idClientTrip = req.params._id
    ClientRepository.getClientById(idClientTrip)
        .then(ct => {
            res.render('pages/client_trip/form', {
                ct: ct,
                formMode: 'showDetails',
                pageTitle: 'Client_Trip Details',
                formAction: '',
                navLocation: 'ct',
                validationErrors: {}
            })
        })
}

exports.addClientTrip = (req, res, next) => {
    const clientTripData = { ...req.body }
    ClientTripRepository.createClientTrip(clientTripData)
        .then(result => {
            res.redirect('/cts')
        })
        .catch(err => {
            res.render('pages/client_trip/form', {
                ct: clientTripData,
                pageTitle: 'Adding a Client_Trip',
                formMode: 'createNew',
                btnLabel: 'Add Client_Trip',
                formAction: '/cts/add',
                navLocation: 'ct',
                validationErrors: err.details
            })
        })
}

exports.updateClientTrip = (req, res, next) => {
    const idClientTrip = req.body._id
    const clientTripData = { ...req.body }
    ClientTripRepository.updateClientTrip(idClientTrip, clientTripData)
        .then(result => {
            res.redirect('/cts')
        })
        .catch(err => {
            res.render('pages/client_trip/form', {
                ct: clientTripData,
                pageTitle: 'Modifying Client_Trip',
                formMode: 'edit',
                btnLabel: 'Edit Client_Trip',
                formAction: '/cts/edit',
                navLocation: 'ct',
                validationErrors: err.details
            })
        })
}

exports.deleteClientTrip = (req, res, next) => {
    const idClientTrip = req.params._id
    ClientTripRepository.deleteClientTrip(idClientTrip)
        .then( () => {
            res.redirect('/cts')
        })
}

exports.deleteManyClientTrips = (req, res, next) => {
    const idClientTrip = req.params._id
    ClientTripRepository.deleteManyClientTrips(idClientTrip)
        .then( () => {
            res.redirect('/cts')
        })
}