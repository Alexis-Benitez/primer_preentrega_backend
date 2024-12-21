const express = require('express');
const productsRouter = require('./routes/productsRouter');
const cartsRouter = require('./routes/cartsRouter');

const app = express();
const PORT = 8080;

// Middleware para manejar JSON
app.use(express.json());

// Rutas principales
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Ruta raíz para indicar que el servidor está funcionando
app.get('/', (req, res) => {
    res.send('Bienvenido al servidor de e-commerce. Usa /api/products o /api/carts.');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});