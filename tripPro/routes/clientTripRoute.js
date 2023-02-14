const express = require('express')
const router = express.Router()
const clientTripController = require('../controllers/clientTripController')

router.get('/', clientTripController.showClientTripList)
router.get('/add', clientTripController.showAddClientTripForm)
router.get('/edit/:_id', clientTripController.showEditClientTrip)
router.get('/details/:_id', clientTripController.showClientTripDetails)
router.post('/add', clientTripController.addClientTrip)
router.get('/delete/:_id', clientTripController.deleteClientTrip)
router.post('/edit', clientTripController.updateClientTrip)

module.exports = router
