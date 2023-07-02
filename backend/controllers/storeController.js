const mongoose= require ('mongoose')
const Store = require ('../models/storeModel')
const Theme = require ('../models/themeModel')
const fs = require('fs');
const path = require('path');



// get all stores 
const getStores = async (req,res)=>{
  const stores = await Store.find({})
  if(!stores){
    return res.status(404).json({error : 'there is no stores'})
  }
  res.status(200).json(stores)

}

// get a store data 
const getStore =async (req,res) =>{
    const {id}= req.params 
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'boutique inexistante'})
    }
    const store = await Store.findById(id)
    if(!store){
        return res.status(404).json({error : 'boutique inexistante'})
    }
    res.status(200).json(store)
}

// create a store 
const createStore = async (req, res) => {
    const { name } = req.body;
  
    try {
      
      const logoPath = path.join(__dirname, '../uploads/default', 'logo.png');
      const logoFilename = path.basename(logoPath);

      const faviconPath = path.join(__dirname, '../uploads/default', 'favicon.png');
       const faviconFilename = path.basename(faviconPath);

      const heroImagePath = path.join(__dirname, '../uploads/default','hero-image.png');
      const heroImageFilename = path.basename(heroImagePath);
      
    
      // Create a new theme with the uploaded default images
      const theme = await Theme.create({
        logo: "",
        favicon: "",
        navbarColor: '#ffffff',
        bodyColor: '#f0f0f0',
        footerColor: '#000000',
        heroImage: "",
        heroText: 'Welcome to our store!',
      });
  
      // Create a new store with the newly created theme
      const store = await Store.create({ name, theme: theme._id });
      res.status(200).json(store);
    } catch (error) {
      res.status(400).json(error.message);
    }
  };

  // delete a store 
  const deleteStore = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({error : 'boutique inexistante'})
    }
    const store = await Store.findOneAndDelete({_id : id})
    if(!store){
      return res.status(404).json({error : 'boutique inexistante'})
    }
    await Theme.findByIdAndDelete(store.theme)
    res.status(200).json(store)

  }
  


module.exports = {
    getStores,
    getStore,
    createStore,
    deleteStore
}

