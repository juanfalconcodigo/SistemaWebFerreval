const express = require('express');
const Producto = require('../models/producto');
const { verificaToken, verificaRole } = require('../middlewares/authentication')
const app = express();

app.post('/producto', verificaToken, (req, res) => {
    let { name, brand, price, stock, description, photo } = req.body;
    let producto = new Producto({
        name,
        brand,
        price,
        stock,
        description,
        photo,
        usuario: req.usuario._id
    });
    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        return res.status(201).json({
            ok: true,
            producto: productoDB
        });
    });
});

app.get('/producto', verificaToken, (req, res) => {
    Producto.find({}).sort('name').populate('usuario', 'first_name email').exec((err, productos) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        Producto.countDocuments({}, (err, total) => {
            res.status(200).json({
                ok: true,
                productos,
                total
            });
        });
    });
});

app.get('/producto/:id', verificaToken, (req, res) => {
    let { id } = req.params;

    Producto.findById(id).populate('usuario', 'first_name email').exec((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: `No existe un producto con el id : ${id}`
                }
            });
        }
        res.status(200).json({
            ok: true,
            producto: productoDB
        });
    });
});

app.put('/producto/:id', verificaToken, (req, res) => {
    let { id } = req.params;
    let body = req.body;
    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: `No existe un producto con el id : ${id}`
                }
            });
        }
        res.status(202).json({
            ok: true,
            producto: productoDB
        });
    });
});

app.delete('/producto/:id', verificaToken, (req, res) => {
    let { id } = req.params;
    Producto.findByIdAndRemove(id, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: `No existe un producto con el id : ${id}`
                }
            });
        }
        res.status(202).json({
            ok: true,
            producto: productoDB
        });
    });
});





module.exports = app;