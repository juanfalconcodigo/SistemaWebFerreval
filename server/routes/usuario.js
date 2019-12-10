const express = require('express');
const bcrypt = require('bcrypt');
const { verificaToken, verificaRole } = require('../middlewares/authentication');
const app = express();

const Usuario = require('../models/usuario');

app.get('/usuario', (req, res) => {
    Usuario.find({}).sort('first_name').exec((err, usuarios) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        Usuario.countDocuments({}, (err, total) => {
            res.status(200).json({
                ok: true,
                usuarios,
                total
            });
        })

    });
});

app.post('/usuario', (req, res) => {
    let { first_name, last_name, email, password, role, photo } = req.body;
    let usuario = new Usuario({
        first_name,
        last_name,
        email,
        password: bcrypt.hashSync(password, 10),
        role,
        photo
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            usuario: usuarioDB
        });

    });


});

app.put('/usuario/:id', (req, res) => {
    let { id } = req.params;
    let { first_name, last_name, email, password, photo } = req.body;
    let data = {
        first_name,
        last_name,
        email,
        password: bcrypt.hashSync(password, 10),
        photo
    }
    Usuario.findByIdAndUpdate(id, data, { new: true, runValidators: true, context: 'query' }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: `No existe un usuario con el id : ${id}`
                }
            });
        }
        res.status(202).json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.delete('/usuario/:id', (req, res) => {

    let { id } = req.params;

    Usuario.findByIdAndRemove(id, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: `No existe un usuario con el id : ${id}`
                }

            });
        }

        return res.status(202).json({
            ok: true,
            usuario: usuarioDB
        });

    });



});



//para ver usuario único

app.get('/usuario/:id', (req, res) => {
    let { id } = req.params;

    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(200).json({
            ok: true,
            usuario
        });
    });
});



module.exports = app;