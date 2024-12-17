const express = require('express');
const router = express.Router();
const { createCart, getCartById, addProductToCart } = require('../controllers/carts_controller');

router.post('/', createCart); // Crear nuevo carrito
router.get('/:cid', getCartById); // Listar productos en un carrito
router.post('/:cid/product/:pid', addProductToCart); // Agregar producto a un carrito

module.exports = router;