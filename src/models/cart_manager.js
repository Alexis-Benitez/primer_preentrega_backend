const fs = require('fs/promises');

class CartManager {
constructor(filePath) {
    this.filePath = filePath;
}

async createCart() {
    const data = JSON.parse(await fs.readFile(this.filePath, 'utf-8'));
    const newCart = { id: data.length + 1, products: [] };
    data.push(newCart);
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
    return newCart;
}

async getCartById(id) {
    const data = JSON.parse(await fs.readFile(this.filePath, 'utf-8'));
    return data.find((cart) => cart.id === id);
}

async addProductToCart(cartId, productId) {
    const data = JSON.parse(await fs.readFile(this.filePath, 'utf-8'));
    const cart = data.find((cart) => cart.id === cartId);
    if (!cart) return null;

    const productIndex = cart.products.findIndex((p) => p.product === productId);
    if (productIndex !== -1) {
    cart.products[productIndex].quantity += 1;
    } else {
    cart.products.push({ product: productId, quantity: 1 });
    }

    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
    return cart;
}
}

module.exports = CartManager;