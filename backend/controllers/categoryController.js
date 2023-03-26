const Category = require ('../models/categoryModel')
const mongoose = require ('mongoose')
const Product = require('../models/productModel')
const singleImageUpload = require('../middlewares/multerMiddleware/singleImageUpload')

//get all categories
const getCategories = async (req,res) => {

    try {
    const categories = await Category.find({}).sort({createdAt : -1})
    res.status(200).json(categories)
    } catch (error){
        res.status(400).json({ error: error.message });
    }
   
}

//get one category
const getCategory = async (req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'catégorie inexistante'})
    }

    const category = await Category.findById(id)
    if (!category){
       return res.status(404).json({error : 'catégorie inexistante'})
    }
    res.status(200).json(category)
}

//create a category 
const createCategory = async (req , res)=>{
 
    singleImageUpload(req, res, async function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'une image est obligatoire' });
        }

        const { name, description } = req.body;
        const image = req.file.filename;

        try {
            const category = await Category.create({ name, description, image });
            res.status(200).json(category);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
}

// delete a category
const deleteCategory = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Catégorie inexistante' });
    }
  
    try {
      const category = await Category.findByIdAndDelete(id);
  
      if (!category) {
        return res.status(404).json({ error: 'Catégorie inexistante' });
      }
  
      await Product.updateMany({ category: id }, { category: null });
  
      res.status(200).json(category);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  

// update a category
const updateCategory = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Catégorie inexistante' });
    }
  
    singleImageUpload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
  
      const { name, description } = req.body;
      let image = req.body.image;
      if(req.body.image == ''){
        return res.status(400).json({error : 'une image est obligatoire'})
      }
  
      // If a new image is uploaded, update the 'image' field
      if (req.file) {
        image = req.file.filename;
      }
  
      try {
        const updatedCategory = await Category.findByIdAndUpdate(
          id,
          { name, description, image },
          { new: true }
        );
  
        if (!updatedCategory) {
          return res.status(404).json({ error: 'Catégorie inexistante' });
        }
  
        res.status(200).json(updatedCategory);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });
  };
  


module.exports = {
    getCategories,
    getCategory,
    createCategory,
    deleteCategory, 
    updateCategory
}