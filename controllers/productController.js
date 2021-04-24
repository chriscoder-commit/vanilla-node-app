const Product = require('../models/productModel');
const { getPostData } = require('../utils')

// get all products
async function getProducts(req, res) {
    try {
        const products = await Product.findAll()

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(products));
    } catch (error) {
        console.log(error);
    }
};

// get individual product
async function getProduct(req, res, id) {
    try {
        const product = await Product.findById(id) //note use of findbyid method here

        if (!product) { //if product doesn't exist then do - 
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: "product with that id not found" }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(product));
        }
    } catch (error) {
        console.log(error);
    }
};

// create product:
async function createProduct(req, res) {
    try {

        const body = await getPostData(req)

        const { title, description, price } = JSON.parse(body)

        const product = {
            title,
            description,
            price
        }

        const newProduct = await Product.create(product)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newProduct))

    } catch (error) {
        console.log(error);
    }
};


// update product:
async function updateProduct(req, res, id) {
    try {

        const product = await Product.findById(id)

        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'product not found' }))
        } else {
            const body = await getPostData(req)

            const { title, description, price } = JSON.parse(body)

            const productData = {
                title: title || product.title, 
                description: description || product.description,
                price: price || product.price
            }

            const updatedProduct = await Product.update(id, productData)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(updatedProduct))
        }

    } catch (error) {
        console.log(error);
    }
};

// delete individual product:
async function deleteProduct(req, res, id) {
    try {
        const product = await Product.findById(id) //note use of findbyid method here

        if (!product) { //if product doesn't exist then do - 
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: "product with that id not found" }))
        } else {
            await Product.remove(id)

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({message: `product ${id} has been removed`}));
        }
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}