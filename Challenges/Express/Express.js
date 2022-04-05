var productFile = "productos.txt";
import Container from '../fileManager/JorgeMolano-C2.js';
 
var express = require('express')

const app = express()

const port = 8080


app.get('/productos', (req, res) => {

});

app.listen(port, ()=>{
    console.log('Application is running on port...',port);
})