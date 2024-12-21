const express = require('express');
const fs = require('fs');
const router = express.Router();

const CARTS_FILE = './data/carts.json';

const readCarts = () => JSON.parse(fs.readFileSync(CARTS_FILE, 'utf-8') || '[]');
const writeCarts = (data) => fs.writeFileSync(CARTS_FILE, JSON.stringify(data, null, 2));

// Crear carrito
router.post('/', (req, res) => {
    const carts = readCarts();
    const newCart = { id: `${Date.now()}`, products: [] };
    carts.push(newCart);
    writeCarts(carts);
    res.status(201).json(newCart);
});

// Obtener productos de un carrito
router.get('/:cid', (req, res) => {
    const carts = readCarts();
    const cart = carts.find(c => c.id === req.params.cid);
    cart ? res.json(cart.products) : res.status(404).send('Carrito no encontrado');
});

// Agregar producto a un carrito
router.post('/:cid/product/:pid', (req, res) => {
    const carts = readCarts();
    const cart = carts.find(c => c.id === req.params.cid);
    if (!cart) return res.status(404).send('Carrito no encontrado');

    const productIndex = cart.products.findIndex(p => p.product === req.params.pid);
    if (productIndex !== -1) {
        cart.products[productIndex].quantity += 1;
    } else {
        cart.products.push({ product: req.params.pid, quantity: 1 });
    }

    writeCarts(carts);
    res.json(cart);
});

module.exports = router;