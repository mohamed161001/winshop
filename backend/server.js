require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const productRoutes = require('./routes/products')
const categoryRoutes = require ('./routes/categories')
const orderRoutes = require('./routes/orders')
const storeRoutes = require ('./routes/stores')
const themeRoutes = require ('./routes/themes')
const userRoutes = require ('./routes/user')
// express app
const app = express ()

app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})



//routes
app.use('/api/user',userRoutes)
app.use('/api/stores',storeRoutes)
app.use('/api/themes', themeRoutes)
app.use('/api/products' ,productRoutes)
app.use('/api/categories' ,categoryRoutes)
app.use('/api/orders',orderRoutes)

//connect to database
mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
    // listen for requests 
app.listen(process.env.PORT,()=>{
    console.log('listening for requests on port 4000!')
})
  })
  .catch((error)=>{console.log(error)})



