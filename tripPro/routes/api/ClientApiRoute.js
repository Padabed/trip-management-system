const express = require('express')
const router = express.Router()

const clientApiController = require('../../api/ClientAPI')

router.get('/', clientApiController.getClients)
router.get('/:idClient', clientApiController.getClientById)
router.post('/', clientApiController.createClient)
router.put('/:idClient', clientApiController.updateClient)
router.delete('/:idClient', clientApiController.deleteClient)

module.exports = router
