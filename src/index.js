const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json())
app.use(rotas)

app.listen(3000)

