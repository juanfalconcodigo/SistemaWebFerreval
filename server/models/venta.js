const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ventaSchema = new Schema({
    total: {
        type: Number,
        required: [true, 'El total es requerido']
    },
    date: {
        type: Date,
        required: false,
        default: Date.now
    },
    productos: [{
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
    }],
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    }
});

module.exports = mongoose.model('Venta', ventaSchema);