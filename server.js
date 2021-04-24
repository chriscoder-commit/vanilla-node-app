const http = require("http");

const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('./controllers/productController') //uses destructuring to just get getProducts function so don't need to do variable like productController.getProducts


// brings in json file (simulating db) which contains an array of objects
const products = require('./data/products.json')

const server = http.createServer((req, res) => {
    // res.statusCode = 200
    // res.setHeader('Content-Type', 'text/html') //weird because it's kinda treating the content type like the key of the value text/html but it's not an object
    // res.write('<h1>Hello World</h1>')
    // res.end()

    // shorter version of above^

    if (req.url === "/api/products" && req.method === 'GET') {
        getProducts(req, res)

    } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "GET") {
        const id = req.url.split('/')[3]
        // console.log(id)
        getProduct(req, res, id)
    } else if (req.url === '/api/products' && req.method === 'POST') {
        createProduct(req, res)
    } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "PUT") {
        const id = req.url.split('/')[3] //need id so you can choose which one to update remember
        updateProduct(req, res, id)
    } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "DELETE") {
        const id = req.url.split('/')[3] 
        deleteProduct(req, res, id)
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json'})
        res.end(JSON.stringify({ message: 'Route not found!'}))
    }
});

const PORT = process.env.PORT || 3000

server.listen(PORT, () => console.log(`server running on port ${PORT}`));
