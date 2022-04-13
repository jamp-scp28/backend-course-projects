const express = require('express');
const fs = require('fs');
const Container = require('./Container')
var bodyParser = require('body-parser')


app = express();
const port = 8080;
const endpoint = '/api';
const dataBase = new Container('products.json');
var jsonParser = bodyParser.json()

/* GET api/productos */
app.get(`${endpoint}/productos`, function(req, res){
    res.send(dataBase.getAll());
});

/* GET api/productos/:id */
app.get(`${endpoint}/productos/:id`, function(req, res){
    const id = req.params.id;
    object = dataBase.getById(id);
    res.send(object);
});

/* POST api/productos */
app.post(`${endpoint}/productos`, jsonParser, function(req, res){
    const object = req.body;
    const idAssigned = dataBase.objectId;
    const obj = dataBase.save(object);

    res.send(obj);
});

/* PUT api/productos/:id */
app.put(`${endpoint}/productos/:id`, jsonParser, function(req, res){
    const id = req.params.id;
    const data = req.body;
    dataBase.update(id, data);
    res.send('Object Updated...')
});

// /* DELETE api/productos/:id */
app.delete(`${endpoint}/productos/:id`, function(req, res){
    id = req.params.id;
    dataBase.deleteById(id);
    res.send("Objet deleted...");
});

/* START Server */

app.listen(port,() => {
    console.log('Application up and running on port: ' + port);
})