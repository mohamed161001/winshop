const jwt = require('jsonwebtoken')
const User = require('../../models/userModel')

const requireAuth = async(req,res,res)=>{

    // verify if the user is logged in
    const {authorization} = req.headers
    if(!authorization){
        res.status(401).json({error : "Authentification nécessaire"})
    }

    const token = authorization.split(' ')[1]

    try{
        const {_id} = jwt.verify(token,process.env.SECRET)
        req.user = await User.findOne({_id}).select('_id')
        next()

    }catch(error){
        res.status(401).json({error : 'Accès non autorisé'})
    }

}


module.exports = requireAuth