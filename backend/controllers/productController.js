const Product = require ('../models/productModel')
const mongoose = require ('mongoose')
const Category = require('../models/categoryModel')
const multipleImageUpload = require('../middlewares/multerMiddleware/multipleImageUpload')

//* get all products
const getProducts = async (req, res) => {
    try {
      // Fetch all products from the database, sorted by creation date in descending order,
      // populate the associated category data with only the 'name' field included
      const products = await Product.find({})
        .sort({ createdAt: -1 })
        .populate('category', 'name');
  
      // Modify the response for each product object to include the name of the category
      const modifiedProducts = products.map(product => {
        // Check if the 'category' property of the product is not null before accessing its 'name' property
        if (product.category) {
          return {
            _id: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            images: product.images,
            category: product.category.name,
            quantity: product.quantity,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
          };
        } else {
          // If the 'category' property is null, set the 'category' field to null in the response object
          return {
            _id: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            images: product.images,
            category: null,
            quantity: product.quantity,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
          };
        }
      });
      // Return the modified product objects as a JSON response with a 200 status code
      res.status(200).json(modifiedProducts);
    } catch (error) {
      // If an error occurs during the database operation, return a 400 error response with the error message as the response body
      res.status(400).json({ error: error.message });
    }
  };
  
  

// *get one product
const getProduct = async (req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'produit inexistant'})
    }
    try {

    const product = await Product.findById(id).populate('category','name')

    if (!product){
       return res.status(404).json({error : 'produit inexistant'})
    }
        // check if the category property is not null before accessing its name property
       const categoryName = product.category ? product.category.name : null ;

       const modifiedProduct = {
        _id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        images: product.images,
        category: categoryName,
        quantity: product.quantity,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
       }


    res.status(200).json(modifiedProduct)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

// *create a product 
const createProduct = async (req, res) => {
  multipleImageUpload(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const newProduct = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      images: req.files.map(file => file.filename), // get filenames of all uploaded images
      category: null, // set the category to null
      quantity: req.body.quantity,
    };

    try {
      // check if a category ID was provided
      if (req.body.category) {
        const category = await Category.findById(req.body.category);
        // check if the category exists
        if (!category) {
          return res.status(404).json({ error: 'catégorie inexistante' });
        }
        newProduct.category = req.body.category; // set the category to the provided ID
        // update the category product count
        await Category.findByIdAndUpdate(req.body.category, { $inc: { productCount: 1 } });
      }
      // store the product in the db
      const product = await Product.create(newProduct);

      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
};

  
//* delete a product 
const deleteProduct = async(req,res)=>{
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'produit inexistant'})
    }
    const product = await Product.findOneAndDelete({_id: id})
    if (!product){
       return res.status(404).json({error : 'produit inexistant'})
    }
    const categoryId = product.category
    await Category.findByIdAndUpdate(categoryId ,{$inc : {productCount : -1}})
    res.status(200).json(product)
}

//* update a product 
const updateProduct = async (req, res) => {
  const { id } = req.params;
  //check if the id is valid (form)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'produit inexistant' });
  }

  try {
    const product = await Product.findById(id);
    // check if the product exists
    if (!product) {
      return res.status(404).json({ error: 'produit inexistant' });
    }

    // Handle image uploads
    await multipleImageUpload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const { category } = req.body;
      if (category) {
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
          return res.status(404).json({ error: 'catégorie inexistante' });
        }
        await Category.findByIdAndUpdate(category, {$inc: { productCount: 1 }})
      }

      const updatedProduct = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        quantity: req.body.quantity,
      };

      // If new images were uploaded, update the 'images' field
      if (req.files.length > 0) {
        updatedProduct.images = req.files.map(file => file.filename);
      } else {
        updatedProduct.images = product.images;
      }

      const updatedProductObj = await Product.findByIdAndUpdate(id, updatedProduct, {
        new: true,
      });

      res.status(200).json(updatedProductObj);
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

  


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct, 
    updateProduct
}