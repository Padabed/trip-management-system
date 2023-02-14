const ClientRepository = require('../repository/sequelize/ClientRepository')

exports.getClients = (req, res, next) => {
    ClientRepository.getClients()
        .then(clients => {
            res.status(200).json(clients)
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getClientById = (req, res, next) => {
    const idClient = req.params.idClient
    ClientRepository.getClientById(idClient)
        .then(client => {
            if (!client) {
                res.status(404).json({
                    message: 'Client with id: '+idClient+' not found'
                })
            } else {
                res.status(200).json(client)
            }
        })
}

exports.createClient = (req, res, next) => {
    ClientRepository.createClzient(req.body)
        .then(newObj => {
            res.status(201).json(newObj)
        })
        .catch(err => {
            console.log(err)
            if(!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.updateClient = (req, res, next) => {
    const idClient = req.params.idClient
    ClientRepository.updateClient(idClient, req.body)
        .then(result => {
            res.status(200).json({message: 'Client updated!', client: result})
        })
        .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}

exports.deleteClient = (req, res, next) => {
    const idClient = req.params.idClient
    ClientRepository.deleteClient(idClient)
        .then(res => {
            res.status(200).json({message: 'Removed Client', client: res})
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })

    // const idClient = req.params.idClient
    // ClientRepository.deleteClient(idClient)
    //     .then( () => {
    //         res.redirect('/clients/delete/1')
    //     })
}
