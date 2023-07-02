require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const productRoutes = require('./routes/products')
const categoryRoutes = require ('./routes/categories')
const orderRoutes = require('./routes/orders')
const storeRoutes = require ('./routes/stores')
const themeRoutes = require ('./routes/themes')
<<<<<<< Updated upstream
=======
const userRoutes = require ('./routes/user')
const pageRoutes = require ('./routes/pages')

>>>>>>> Stashed changes
// express app
const app = express ()


app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})


app.use(cors());
app.use('/uploads', express.static(__dirname+'/uploads'));



//routes
app.use('/api/stores',storeRoutes)
app.use('/api/themes', themeRoutes)
app.use('/api/products' ,productRoutes)
app.use('/api/categories' ,categoryRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/pages',pageRoutes)

//connect to database
mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
    // listen for requests 
app.listen(process.env.PORT,()=>{
    console.log('listening for requests on port 4000!')
})
  })
  .catch((error)=>{console.log(error)})



