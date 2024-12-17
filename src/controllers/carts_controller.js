const CartManager = require('../models/cart_manager');
const cartManager = new CartManager('./src/data/carts.json');

const createCart = async (req, res) => {
const cart = await cartManager.createCart();
res.status(201).json(cart);
};

const getCartById = async (req, res) => {
const { cid } = req.params;
const cart = await cartManager.getCartById(cid);
cart ? res.json(cart) : res.status(404).send('Carrito no encontrado');
};

const addProductToCart = async (req, res) => {
const { cid, pid } = req.params;
const result = await cartManager.addProductToCart(cid, pid);
result ? res.json(result) : res.status(404).send('Carrito o producto no encontrado');
};

module.exports = { createCart, getCartById, addProductToCart };