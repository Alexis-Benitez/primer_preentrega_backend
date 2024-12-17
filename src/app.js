const express = require('express');
const app = express();
const productsRouter = require('./routes/products_router');
const cartsRouter = require('./routes/carts_router');

app.use(express.json());

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});