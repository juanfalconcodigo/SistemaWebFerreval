const express = require('express');
const colors = require('colors/safe');
const mongoose = require('mongoose');
const app = express();
//Acceso a la configuración
require("./config.js");

//Conexión a la base de datos
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then((db) => {
    console.log(colors.yellow('DB is connected'));
}).catch(console.err);




//Configurando middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require('./routes/index'));






//Esta escuchando el puerto
app.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log(colors.yellow(`Se esta corriendo correctamente en el puerto : ${process.env.PORT}`));
});