const express = require('express');
const app = express();
app.use(require('./usuario'));
app.use(require('./login'));
app.use(require('./cliente'));
app.use(require('./producto'));
app.use(require('./venta'));

module.exports = app;