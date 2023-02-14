const ClientRepository = require('../repository/sequelize/ClientRepository')

exports.showClientList = (req, res, next) => {
    ClientRepository.getClients()
        .then(clients => {
            res.render('pages/client/list', {
                clients: clients,
                navLocation: 'clt'
            })
        })
}

exports.showAddClientForm = (req, res, next) => {
    res.render('pages/client/form', {
        clt: {},
        pageTitle: 'New Client',
        formMode: 'createNew',
        btnLabel: 'Add client',
        formAction: '/clients/add',
        navLocation: 'clt',
        validationErrors: {}
    })
}

exports.showEditClientForm = (req, res, next) => {
    const idClient = req.params.idClient
    ClientRepository.getClientById(idClient)
        .then(client => {
            res.render('pages/client/form', {
                clt: client,
                formMode: 'edit',
                pageTitle: 'Edit client',
                btnLabel: 'Edit client',
                formAction: '/clients/edit',
                navLocation: 'clt',
                validationErrors: {}
            })
        })
}

exports.showClientDetails = (req, res, next) => {
    const idClient = req.params.idClient
    ClientRepository.getClientById(idClient)
        .then(client => {
            res.render('pages/client/form', {
                clt: client,
                formMode: 'showDetails',
                pageTitle: 'Client Details',
                formAction: '',
                navLocation: 'clt',
                validationErrors: {}
            })
        })
}

exports.addClient = (req, res, next) => {
    const clientData = { ...req.body }
    ClientRepository.createClient(clientData)
        .then(result => {
            res.redirect('/clients')
        })
        .catch(err => {
            res.render('pages/client/form', {
                clt: clientData,
                pageTitle: 'Adding a client',
                formMode: 'createNew',
                btnLabel: 'Add client',
                formAction: '/clients/add',
                navLocation: 'clt',
                validationErrors: err.details
            })
        })
}

exports.updateClient = (req, res, next) => {
    const idClient = req.body._id
    const clientData = { ...req.body }
    ClientRepository.updateClient(idClient, clientData)
        .then(result => {
            res.redirect('/clients')
        })
        .catch(err => {
            res.render('pages/client/form', {
                clt: clientData,
                pageTitle: 'Modifying client',
                formMode: 'edit',
                btnLabel: 'Edit client',
                formAction: '/clients/edit',
                navLocation: 'clt',
                validationErrors: err.details
            })
        })
}

exports.deleteClient = (req, res, next) => {
    const idClient = req.params.idClient
    ClientRepository.deleteClient(idClient)
        .then( () => {
            res.redirect('/clients')
        })
}
