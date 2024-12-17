const express = require('express');
const router = express.Router();
const { getProducts, getProductById, addProduct, updateProduct, deleteProduct } = require('../controllers/products_controller');

router.get('/', getProducts); // Listar productos
router.get('/:pid', getProductById); // Obtener producto por ID
router.post('/', addProduct); // Crear nuevo producto
router.put('/:pid', updateProduct); // Actualizar producto por ID
router.delete('/:pid', deleteProduct); // Eliminar producto por ID

module.exports = router;