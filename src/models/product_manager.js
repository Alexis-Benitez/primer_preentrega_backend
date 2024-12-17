const fs = require('fs/promises');

class ProductManager {
constructor(filePath) {
    this.filePath = filePath;
}

async getProducts(limit) {
    const data = JSON.parse(await fs.readFile(this.filePath, 'utf-8'));
    return limit ? data.slice(0, limit) : data;
}

async getProductById(id) {
    const data = JSON.parse(await fs.readFile(this.filePath, 'utf-8'));
    return data.find((product) => product.id === id);
}

async addProduct(product) {
    const data = JSON.parse(await fs.readFile(this.filePath, 'utf-8'));
    const newProduct = { id: data.length + 1, ...product, status: true };
    data.push(newProduct);
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
    return newProduct;
}

async updateProduct(id, updatedFields) {
    const data = JSON.parse(await fs.readFile(this.filePath, 'utf-8'));
    const index = data.findIndex((product) => product.id === id);
    if (index === -1) return null;
    data[index] = { ...data[index], ...updatedFields };
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
    return data[index];
}

async deleteProduct(id) {
    const data = JSON.parse(await fs.readFile(this.filePath, 'utf-8'));
    const index = data.findIndex((product) => product.id === id);
    if (index === -1) return null;
    data.splice(index, 1);
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
    return true;
}
}

module.exports = ProductManager;