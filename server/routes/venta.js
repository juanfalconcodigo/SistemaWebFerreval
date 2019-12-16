const express = require('express');
const Venta = require('../models/venta');
const app = express();
const { verificaToken, verificaRole } = require('../middlewares/authentication');
app.post('/venta', verificaToken, (req, res) => {
    let { total, productos, cliente } = req.body;
    let venta = new Venta({
        total,
        productos,
        cliente,
        usuario: req.usuario._id
    });
    venta.save((err, ventaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(201).json({
            ok: true,
            venta: ventaDB
        });
    });
});
app.get('/venta', verificaToken, (req, res) => {
    Venta.find({}).populate('usuario', 'first_name email').populate('productos', 'name brand').populate('cliente', 'first_name email').exec((err, ventas) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        Venta.countDocuments({}, (err, total) => {
            res.status(200).json({
                ok: true,
                ventas,
                total
            });
        });
    });
});


app.post('/venta/bydate', verificaToken, (req, res) => {
    //ojo es necesario colocar el dateSearch si no habra error papus :(
    const initialDate = req.body.dateSearch; // ejemplo: '2019/03/26'
    const finalDate = initialDate.substring(0, 8).concat(Number(initialDate.substring(8)) + 1);

    Venta.find({ $and: [{ date: { $gte: new Date(initialDate) } }, { date: { $lt: new Date(finalDate) } }] }).populate('usuario', 'first_name email').populate('cliente', 'first_name email').populate('productos', 'name brand price photo').exec((err, ventas) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!ventas) { // si no se consiguen documentos
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No se han encontrado ventas en la fecha dada.'
                }
            });
        }
        Venta.countDocuments({ $and: [{ date: { $gte: new Date(initialDate) } }, { date: { $lt: new Date(finalDate) } }] }, (err, total) => {
            res.status(202).json({
                ok: true,
                ventas,
                total
            });
        });
    });
});


module.exports = app;