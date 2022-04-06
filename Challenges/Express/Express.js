const container = require('./Container');
var productFile = "productos.txt";
var express = require('express');

const app = express()
const port = 8080
const data = new container('products.json');

function getRandomId(min,max){
    return Math.random() * (max - min) + min;
}

app.get('/productos', (req, res) => {
    res.send(data.getAll());
});

app.get('/productoRandom', (req, res) => {

    dataLen = data.getAll().length;
    idGetProductRandom = Math.round(getRandomId(1,dataLen));

    console.log(data.getById(idGetProductRandom));
    res.send(data.getById(idGetProductRandom));

});

app.listen(port, ()=>{
    console.log(`Application is running on port: ${port}`);
});