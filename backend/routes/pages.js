const express = require ('express')
const {
    getPages,
    getAboutUsPage,
    getReturnsPage,
    updateAboutUsPage,
    updateReturnsPage,
    createAboutUsPage,
    createReturnsPage
} = require('../controllers/pageController')
const router = express.Router()

// get all pages
router.get('/', getPages)

// get about us page
router.get('/about-us', getAboutUsPage)

// get returns page
router.get('/returns', getReturnsPage)

// update about us page
router.patch('/about-us', updateAboutUsPage)

// update returns page 
router.patch('/returns', updateReturnsPage)

// create about us page
router.post('/about-us', createAboutUsPage)

// create returns page
router.post('/returns', createReturnsPage)




module.exports = router