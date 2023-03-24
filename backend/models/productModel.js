const mongoose = require('mongoose')
const Category = require('../models/categoryModel');

const Schema = mongoose.Schema

const productSchema = new Schema ({
    
    name : {
        type : String ,
        required : true
    },

    description : {
        type : String,
        required : true
    },

    price : {
        type : Number,
        required : true 
    },

    images : [{
        type : String ,
        required : true
    }],

    category : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: false
    },

    quantity : {
        type : Number ,
        required : false 
    }

} , {timestamps : true})

module.exports = mongoose.model('Product' , productSchema)