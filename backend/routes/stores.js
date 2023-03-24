const express = require ('express')
const router = express.Router()
const {getStores ,getStore , createStore, deleteStore} = require('../controllers/storeController')

router.get('/',getStores)
router.get('/:id',getStore)
router.post('/',createStore)
router.delete('/:id',deleteStore)


module.exports = router