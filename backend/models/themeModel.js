const mongoose = require('mongoose')
const Schema = mongoose.Schema

const themeSchema = new Schema ({
    logo: {
        type: String,
        required: true
    },
      favicon: {
        type: String,
        required: true
    },
      navbarColor: {
        type: String,
        required: true
    },
      bodyColor: {
        type: String,
        required: true
    },
      footerColor: {
        type: String,
        required: true
    },
      heroImage: {
        type: String,
        required: true
    },
      heroText: {
        type: String,
        required: true
    },

},{ timestamps: true })

module.exports = mongoose.model('Theme' , themeSchema)