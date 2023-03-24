const mongoose = require ('mongoose')
const Theme = require('../models/themeModel')
const logoUpload = require('../middlewares/multerMiddleware/logoUpload')
const faviconUpload = require('../middlewares/multerMiddleware/faviconUpload')
const heroImageUpload = require('../middlewares/multerMiddleware/heroImageUpload')


// get Themes 
const getThemes = async (req,res)=>{
    const themes = await Theme.find({})
    if(!themes){
        return res.status(404).json({error : 'there is no themes'})
    }
    res.status(200).json(themes)
}

// get the theme
const getTheme = async (req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'théme inexistant'})
    }
    const theme = await Theme.findById(id)
    if(!theme){
        return res.status(404).json({error : 'théme inexistant'})
    }
    res.status(200).json(theme)
}

// update the default theme // hedha eli we7el fih // bech testa3mel logoUpload , heroImageUpload w faviconUpload eli 7atithom mel fou9
const updateTheme = async (req,res)=>{}


  


//delete a theme
const deleteTheme = async (req,res)=>{
    const {id}= req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'théme inexistante'})
    }
    const theme = await Theme.findOneAndDelete({_id : id})
    if(!theme){
        return res.status(404).json({error : 'théme inexistante'})
    }
    res.status(200).json(theme)
}


module.exports = {
    getThemes,
    getTheme,
    updateTheme,
    deleteTheme
}