const mongoose = require ('mongoose')
const bcrypt = require ('bcrypt')
const validator = require ('validator')

const Schema = mongoose.Schema

const userSchema = new Schema ({

    email : {
        type : String ,
        required : true ,
        unique : true 
    },

    password : {
        type : String ,
        required : true 
    },

    phoneNumber : {
        type : Number ,
        unique : true
    }

})


//static sign up method
userSchema.statics.signup = async function (email,password,phoneNumber){

    // validate the email and password
    if(!email){
        throw Error('le champ email est obligatoire')
    }
    if(!password){
        throw Error('le champ mot de passe est obligatoire')
    }
    if(!phoneNumber){
        throw Error ('le champ numéro de téléphone est obligatoire')
    }
    if(!validator.isEmail(email)){
        throw Error("L'adresse e-mail saisie est invalide")
    }
    if(!validator.isStrongPassword(password)){
        throw Error ('Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.')
    }
    if(phoneNumber.length!==8){
        throw Error('le numéro de téléphone est invalide')
    }

    const emailExists = await this.findOne({email})
    if(emailExists){
        throw Error ('Email existe déjà')
    }

    const phoneNumberExists = await this.findOne({phoneNumber})
    if(phoneNumberExists){
        throw Error ('Numéro de téléphone existe déjà')
    }

    const salt = await  bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    const user = await this.create({email , password : hash , phoneNumber})

    return user 
}

// static login method 
userSchema.statics.login = async function (email,password){
    if(!email){
        throw Error('le champ email est obligatoire')
    }
    if(!password){
        throw Error('le champ mot de passe est obligatoire')
    }

    const user = await this.findOne({email})
    if(!user){
        throw Error('email incorrecte')
    }

    const match = await bcrypt.compare(password,user.password)

    if(!match){
        throw Error('mot de passe incorrecte')
    }

    return user 


}


module.exports = mongoose.model('User',userSchema)