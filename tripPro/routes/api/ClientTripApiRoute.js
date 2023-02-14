const express = require('express')
const router = express.Router()

const clientTripApiController = require('../../api/ClientTripAPI')

router.get('/', clientTripApiController.getClientTrip)
router.get('/:idCT', clientTripApiController.getClientTripById)
router.post('/', clientTripApiController.createClientTrip)
router.put('/:idCT', clientTripApiController.updateClientTrip)
router.delete('/:idCT', clientTripApiController.deleteClientTrip)

module.exports = router
