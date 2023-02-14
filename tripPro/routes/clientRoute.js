const express = require('express')
const router = express.Router()
const clientController = require('../controllers/clientController')

router.get('/', clientController.showClientList)
router.get('/add', clientController.showAddClientForm)
router.get('/edit/:idClient', clientController.showEditClientForm)
router.get('/details/:idClient', clientController.showClientDetails)
router.post('/add', clientController.addClient)
router.get('/delete/:idClient', clientController.deleteClient)
router.post('/edit', clientController.updateClient)

module.exports = router
