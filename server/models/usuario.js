const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;




let valoresValidos = {
    values: ['USER_ROLE', 'USER_ADMIN'],
    message: '{VALUE} no es valor permitido'
}
let usuarioSchema = new Schema({
    first_name: {
        type: String,
        required: [true, "El nombre es necesario"]
    },
    last_name: {
        type: String,
        required: [true, "El apellido es necesario"]

    },
    email: {
        type: String,
        unique: true,
        required: [true, "El correo es necesario"]

    },
    password: {
        type: String,
        required: [true, "La contraseña es necesaria"]


    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: valoresValidos,
        required: false
    },
    status: {
        type: Boolean,
        default: true,
        required: false
    },
    photo: {
        type: String,
        default: 'https://mygoaltv.com/images/no-image.png',
        required: false
    }


});

usuarioSchema.methods.toJSON = function() {
    let userObject = this.toObject();
    delete userObject.password;
    return userObject;
}
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Usuario', usuarioSchema);