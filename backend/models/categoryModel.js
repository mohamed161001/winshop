const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required : true,
    },
    productCount:{
        type : Number,
        default : 0 ,
    }
} , {timestamps: true})

module.exports = mongoose.model('Category', categorySchema)