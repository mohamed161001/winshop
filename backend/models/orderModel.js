const mongoose = require ('mongoose')
const Schema = mongoose.Schema
const Product = require ('../models/productModel')

const orderSchema = new Schema ({

    fullName : {
        type : String,
        required : true
    },

    phone : {
        type : String,
        required : true 
    },

    email : {
        type : String
    },

    address : {
        type : String,
        required : true
    },

    products : [{
        product : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Product',
            required : true 
        },
        quantity : {
            type : Number ,
            required : true
        }
    }],

    total : {
        type : Number ,
        required : true ,
    },

    status : {
        type : String ,
        enum : ['En attente','Confirmé' , 'Annulé' , 'Livré'],
        default : 'En attente'
    },

   

},{timestamps : true})

module.exports = mongoose.model('Order' , orderSchema)