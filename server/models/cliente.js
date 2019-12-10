const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
let clienteSchema = new Schema({
    first_name: {
        type: String,
        required: [true, "El nombre es requerido"]
    },
    last_name: {
        type: String,
        required: [true, "El apellido es requerido"]
    },
    document: {
        type: String,
        required: [true, "El documento es requerido"]
    },
    email: {
        type: String,
        required: [true, "El email es requerido"],
        unique: true
    },
    photo: {
        type: String,
        default: 'https://mygoaltv.com/images/no-image.png',
        required: false
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

});
clienteSchema.plugin(uniqueValidator, { message: '{PATH} es un valor único' })

module.exports = mongoose.model('Cliente', clienteSchema);