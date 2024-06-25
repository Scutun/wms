const Router = require('express')
const router = new Router()
const wearhouseController = require('../controllers/wearhouse.controller')

router.post('/wearhouse/create', wearhouseController.createWearhouse)
router.get('/wearhouse/all', wearhouseController.getAllWearhouse)
router.get('/wearhouse/find/:id', wearhouseController.getWearhouse)
router.delete('/wearhouse/delete/:id', wearhouseController.deleteWearhouse)

module.exports = router