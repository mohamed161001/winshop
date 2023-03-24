const Order = require('../models/orderModel')
const mongoose = require('mongoose')
const Product = require('../models/productModel')


// get all orders 
const getOrders = async (req,res)=>{
    const orders = await Order.find({}).sort({createdAt : -1}).populate('products.product','name')
    try {
        res.status(200).json(orders)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

// get one order 
const getOrder = async (req,res)=>{
    const { id }= req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'commande inexistante'})
    }
    const order = await Order.findById(id)
    if(!order){
        return res.status(404).json({error : 'commande inexistante'})
    }
    res.status(200).json(order)
}

// create an order
const createOrder = async (req , res)=>{
   
    const newOrder = {
        fullName: req.body.fullName,
        phone: req.body.phone, 
        email: req.body.email,
        address: req.body.address,
        products: req.body.products,
        total: req.body.total,
        status: req.body.status,
    }

    const productIds = newOrder.products.map((product)=>product.product)
    try {
        const productsExist = await Product.find({_id: {$in: productIds}})
    
        if (productsExist.length !== newOrder.products.length) {
          return res.status(400).json({error: 'quelques produits sont inexistants'})
        }
      } catch (error) {
        res.status(400).json({error: error.message})
      }

    try {
        const order = await Order.create(newOrder)
        res.status(200).json(order)

      } catch (error) {
        res.status(400).json({ error: error.message })
      }
}

// delete an order
const deleteOrder = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'commande inexistante'})
    }
    const order = await Order.findOneAndDelete({_id : id})
    if(!order){
        return res.status(404).json({error : 'commande inexistante'})
    }
    res.status(200).json(order)
}

//update an order
const updateOrder = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'commande inexistante' })
    }
    const order = await Order.findOneAndUpdate({_id : id} , {...req.body})
    if(!order){
        return res.status(404).json({error : 'commande inexistante'})
    }
    res.status(200).json(order) 
}


module.exports = {
    getOrders,
    getOrder,
    createOrder,
    deleteOrder,
    updateOrder
}