const express = require('express')
const {Router, json} = require('express')
const router = Router()
const PORT = 5000
const app = express()
const baseClass = require('./classes/baseClass')
const productsDB = './database/products.json'
const productsClass = new baseClass(productsDB)
const cartDB = './database/cart.json'
const cartClass = new baseClass(cartDB)
const path = require("path");

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.static("public"));

app.use('/api', router)

/* GETALL api/products/ */
router.get("/products",(req, res)=>{
    res.json(productsClass.getAll())
})

/* GET api/products/:id */
router.get('/products/:id', function(req, res){
    const id = req.params.id;
    object = productsClass.getById(id);
    res.send(object);
});

/* POST api/products/ */
router.post('/products', jsonParser, (req, res)=>{
    let object = req.body;
    const idAssigned = productsClass.objectId;
    object.id = idAssigned;
    productsClass.save(object);
    res.send({"Object saved sucessfully...":"ok"})
})

/* PUT api/products/:id */
router.post('/products/:id', jsonParser, (req, res)=>{
    const id = req.params.id;
    productsClass.update(id,req.body);
    res.send({"Object updated sucessfully...":"ok"})
})

router.get('/cart',(req, res) => {
    const objects = cartClass.getAll()
    res.send(objects)
})

router.post('/cart',(req, res) => {
    const timestamp = new Date()
    const newCart = {"timestamp":"","id":0,"products":[]}
    const newId = cartClass.objectId

    newCart.timestamp = timestamp
    newCart.id = newId
    cartClass.save(newCart)

    res.send({"Cart created with id: ":newId})
})

router.get('/cart/:id/products',(req, res) => {
    const id = req.params.id
    const object = cartClass.getById(id)
    res.send(object)
})

router.post('/cart/:id/products', jsonParser, (req, res) => {
    const newProduct = req.body
    const id = req.params.id
    const cartObject = cartClass.getById(id)

    cartObject.products.push(newProduct)
    
    cartClass.update(id,cartObject)
    

    res.send({"Product added...":"ok"})
})

router.delete('/cart/:id', jsonParser, (req, res) => {
    const id = req.params.id
    cartClass.deleteById(id)    

    res.send({"Cart deleted...":"ok"})
})

router.delete('/cart/:id/products/:proid', jsonParser, (req, res) => {
    const id = req.params.id
    const proId = req.params.proid

    cartClass.deleteByProductId(id, proId)    

    res.send({"Product deleted...":"ok"})
})

app.listen(PORT,()=>{console.log('app running on port',PORT)})