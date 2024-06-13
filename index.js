const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const routes = require('./routes/routes');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
