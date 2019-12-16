const expres = require('express');
const Cliente = require('../models/cliente');
const { verificaToken, verificaRole } = require('../middlewares/authentication');
const app = expres();

app.post('/cliente', verificaToken, (req, res) => {
    let { first_name, last_name, document, email } = req.body;
    let cliente = new Cliente({
        first_name,
        last_name,
        document,
        email,
        usuario: req.usuario._id
    });
    cliente.save((err, clienteDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(201).json({
            ok: true,
            cliente: clienteDB
        });
    });
});


app.get('/cliente', verificaToken, (req, res) => {
    Cliente.find({}).sort('first_name').populate('usuario', 'first_name email').exec((err, clientes) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        Cliente.countDocuments({}, (err, total) => {
            res.status(200).json({
                ok: true,
                clientes,
                total
            });
        });

    });

});


app.get('/cliente/:id', verificaToken, (req, res) => {
    let { id } = req.params;
    Cliente.findById(id).populate('usuario', 'first_name email').exec((err, clienteDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!clienteDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: `No existe un cliente con el id: ${id}`
                }
            });
        }
        res.status(200).json({
            ok: true,
            cliente: clienteDB
        });
    });
});


app.put('/cliente/:id', verificaToken, (req, res) => {
    let { id } = req.params;
    let body = req.body;

    Cliente.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, clienteDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!clienteDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: `No existe un cliente con el id: ${id}`
                }
            });
        }
        res.status(202).json({
            ok: true,
            cliente: clienteDB
        });
    });
});

app.delete('/cliente/:id', verificaToken, (req, res) => {
    let { id } = req.params;
    Cliente.findByIdAndRemove(id, (err, clienteDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!clienteDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: `No existe un cliete con el id : ${id}`
                }
            });
        }
        res.status(202).json({
            ok: true,
            cliente: clienteDB
        });
    });
});



app.get('/cliente/buscar/:termino', verificaToken, (req, res) => {
    let { termino } = req.params;
    let regex = new RegExp(termino, 'gi');
    Cliente.find({ first_name: regex }).populate('usuario', 'first_name email').exec((err, clientes) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(202).json({
            ok: true,
            clientes
        });
    });
});



module.exports = app;