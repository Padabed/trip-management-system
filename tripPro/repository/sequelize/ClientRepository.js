const Client = require('../../model/sequelize/Client')
const Trip = require('../../model/sequelize/Trip')
const Client_Trip = require('../../model/sequelize/Client_Trip')
const clientSchema = require('../../model/joi/Client')
const {hashPassword} = require('../../util/authUtils');

exports.getClients = () => {
    return Client.findAll()
}

exports.findByEmail = (email) => {
    return Client.findOne({
        where: {email: email}
    })
}

exports.getClientById = (idClient) => {
    return Client.findByPk(idClient,
        {
            include: [{
                model: Client_Trip,
                as: 'ct',
                include: [{
                    model: Trip,
                    as: 'trip'
                }]
            }]
        })
}

exports.createClient = (newClient) => {
    const vRes = clientSchema.validate(newClient, {
        abortEarly: false
    })
    if (vRes.error) {
        return Promise.reject(vRes.error)
    }
    return Client.create({
        firstName: newClient.firstName,
        lastName: newClient.lastName,
        email: newClient.email,
        password: hashPassword(newClient.password),
        telephone: newClient.telephone,
        pesel: newClient.pesel
    })
}

exports.updateClient = (idClient, clientData) => {
    const vRes = clientSchema.validate(clientData, {
        abortEarly: false
    })
    if (vRes.error) {
        return Promise.reject(vRes.error)
    }
    // const firstName = clientData.firstName
    // const lastName = clientData.lastName
    // const email = clientData.email
    clientData.password = hashPassword(clientData.password)

    // const telephone = clientData.telephone
    // const pesel = clientData.pesel
    return Client.update(clientData,
        {
            where:
                {
                    idClient: idClient
                }
        });
}

exports.deleteClient = (idClient) => {
    return Client.destroy({
        where: {idClient: idClient}
    })
}