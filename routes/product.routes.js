const Router = require('express')
const router = new Router()
const productController = require('../controllers/product.comtroller')

router.post('/product/create', productController.createProduct)
router.put('/product/update', productController.updateProduct)

router.get('/product/find/:id', productController.getProduct)
router.delete('/product/delete/:id', productController.deleteProduct)

module.exports = router