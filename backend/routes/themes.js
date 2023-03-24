const express = require ('express')
const router = express.Router()
const {getThemes , getTheme , updateTheme , deleteTheme} = require('../controllers/themeController')

router.get('/',getThemes)
router.get('/:id',getTheme)
router.patch('/:id',updateTheme)
router.delete('/:id',deleteTheme)

module.exports = router
