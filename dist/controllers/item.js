"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.deleteProduct = exports.addProduct = exports.getProductById = exports.getProducts = void 0;
let products = [];
let currentId = 1;
//get
const getProducts = () => {
    return products;
};
exports.getProducts = getProducts;
//get
const getProductById = (id) => {
    const product = products.find((product) => product.id === id);
    return product;
};
exports.getProductById = getProductById;
//post
const addProduct = (name, size) => {
    const newProduct = {
        id: currentId++,
        name,
        size
    };
    products.push(newProduct);
    return newProduct;
};
exports.addProduct = addProduct;
//delete
const deleteProduct = (id) => {
    const index = products.findIndex(product => product.id === id);
    if (index !== -1) {
        products.splice(index, 1);
        return true;
    }
    return false;
};
exports.deleteProduct = deleteProduct;
//patch
const updateProduct = (id, size) => {
    const index = products.findIndex(product => product.id === id);
    if (index !== -1) {
        products[index].size = size;
        return true;
    }
    return false;
};
exports.updateProduct = updateProduct;
