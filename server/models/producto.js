const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

let productoSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'El nombre es necesario']
    },
    brand: {
        type: String,
        required: [true, 'La marca es necesaria']
    },
    price: {
        type: Number,
        required: [true, 'El precio es necesario']
    },
    stock: {
        type: Number,
        required: [true, 'El stock es necesario']
    },
    description: {
        type: String,
        required: [true, 'La descripción es necesaria']
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


productoSchema.plugin(uniqueValidator, { message: '{PATH} es un valor único' });

module.exports = mongoose.model('Producto', productoSchema);