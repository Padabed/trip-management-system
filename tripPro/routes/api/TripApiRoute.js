const express = require('express')
const router = express.Router()

const tripApiController = require('../../api/TripAPI')

router.get('/', tripApiController.getTrips)
router.get('/:idTrip', tripApiController.getTripById)
router.post('/', tripApiController.createTrip)
router.put('/:idTrip', tripApiController.updateTrip)
router.delete('/:idTrip', tripApiController.deleteTrip)

module.exports = router
