const ProductManager = require('../models/product_manager');
const productManager = new ProductManager('./src/data/products.json');

const getProducts = async (req, res) => {
const { limit } = req.query;
const products = await productManager.getProducts(limit);
res.json(products);
};

const getProductById = async (req, res) => {
const { pid } = req.params;
const product = await productManager.getProductById(pid);
product ? res.json(product) : res.status(404).send('Producto no encontrado');
};

const addProduct = async (req, res) => {
const newProduct = req.body;
const product = await productManager.addProduct(newProduct);
res.status(201).json(product);
};

const updateProduct = async (req, res) => {
const { pid } = req.params;
const updatedFields = req.body;
const updatedProduct = await productManager.updateProduct(pid, updatedFields);
updatedProduct ? res.json(updatedProduct) : res.status(404).send('Producto no encontrado');
};

const deleteProduct = async (req, res) => {
const { pid } = req.params;
const result = await productManager.deleteProduct(pid);
result ? res.status(204).send() : res.status(404).send('Producto no encontrado');
};

module.exports = { getProducts, getProductById, addProduct, updateProduct, deleteProduct };