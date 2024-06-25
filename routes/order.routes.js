const Router = require('express')
const router = new Router()
const orderController = require('../controllers/order.controller')

router.post('/order/create', orderController.createOrder)
router.get('/order/find', orderController.getOrder)
router.get('/order/find/current/:id', orderController.getOneOrder)
router.delete('/order/delete/:id', orderController.deleteOrder)

module.exports = router