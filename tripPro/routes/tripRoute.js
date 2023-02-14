const express = require('express')
const router = express.Router()
const tripController = require('../controllers/tripController')

router.get('/', tripController.showTripList)
router.get('/add', tripController.showAddTripForm)
router.get('/edit/:idTrip', tripController.showEditTripForm)
router.get('/details/:idTrip', tripController.showTripDetails)
router.post('/add', tripController.addTrip)
router.get('/delete/:idTrip', tripController.deleteTrip)
router.post('/edit', tripController.updateTrip)

module.exports = router
