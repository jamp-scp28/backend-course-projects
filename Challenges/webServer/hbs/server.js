const express = require('express')
const { Router } = require('express')
const handlebars = require('express-handlebars');
const PORT = 3000;
const app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
//API
const Container = require('./Container')
const productsFile = 'products.json'
const dataBase = new Container(productsFile);

//Parsers
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Definitions
app.engine(
    "hbs", 
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials/"
    })
);

app.set('view engine', 'hbs');
app.set('views', './views');
app.set('pages','./views/pages')

app.use(express.static("public"));

app.get('/', function (req, res) {
    res.render('productsForm', {})
})

/* GET api/productos */
app.get('/products', function(req, res){
    const products = dataBase.getAll();
    res.render('products',{products: dataBase.getAll()});
});

/* POST api/products */
app.post('/products', jsonParser, function(req, res){
    const object = req.body;
    console.log(object);
    const idAssigned = dataBase.objectId;
    const products = dataBase.save(object);
    res.render('productsForm',{})
});

const server = app.listen(PORT, err => {
    if(err) throw new Error(`Server Error ${err}`);
    console.log("Application running on port " + server.address().port);
});