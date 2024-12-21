const express = require('express');
const fs = require('fs');
const router = express.Router();

const PRODUCTS_FILE = './data/products.json';

// Leer productos
const readProducts = () => JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8') || '[]');

// Escribir productos
const writeProducts = (data) => fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(data, null, 2));

// Obtener todos los productos
router.get('/', (req, res) => {
    const products = readProducts();
    const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
    res.json(products.slice(0, limit));
});

// Obtener producto por ID
router.get('/:pid', (req, res) => {
    const products = readProducts();
    const product = products.find(p => p.id === req.params.pid);
    product ? res.json(product) : res.status(404).send('Producto no encontrado');
});

// Crear nuevo producto
router.post('/', (req, res) => {
    const products = readProducts();
    const newProduct = {
        id: `${Date.now()}`,
        ...req.body,
        status: true,
        thumbnails: req.body.thumbnails || []
    };

    if (!newProduct.title || !newProduct.description || !newProduct.code || !newProduct.price || !newProduct.stock || !newProduct.category) {
        return res.status(400).send('Todos los campos son obligatorios excepto thumbnails');
    }

    products.push(newProduct);
    writeProducts(products);
    res.status(201).json(newProduct);
});

// Actualizar producto
router.put('/:pid', (req, res) => {
    const products = readProducts();
    const index = products.findIndex(p => p.id === req.params.pid);
    if (index === -1) return res.status(404).send('Producto no encontrado');

    const updatedProduct = { ...products[index], ...req.body };
    products[index] = updatedProduct;
    writeProducts(products);
    res.json(updatedProduct);
});

// Eliminar producto
router.delete('/:pid', (req, res) => {
    const products = readProducts();
    const updatedProducts = products.filter(p => p.id !== req.params.pid);
    if (products.length === updatedProducts.length) return res.status(404).send('Producto no encontrado');

    writeProducts(updatedProducts);
    res.send('Producto eliminado');
});

module.exports = router;