const express = require ('express')
const {getOrders , getOrder , createOrder , deleteOrder , updateOrder } = require('../controllers/orderController')
const router = express.Router()

// get all orders
router.get('/', getOrders)
// get one order
router.get('/:id',getOrder)
// post an order
router.post('/',createOrder)
// delete an order
router.delete('/:id',deleteOrder)
// update an order
router.patch('/:id',updateOrder)


module.exports = router