const mongoose = require('mongoose')
const Theme = require('../models/themeModel')
const Schema = mongoose.Schema

const storeSchema = new Schema ({
    name : {
        type : String,
        required : true,
        unique : true 
    },
    theme : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Theme'
    }

},{timestamps : true})

module.exports = mongoose.model('Store',storeSchema)