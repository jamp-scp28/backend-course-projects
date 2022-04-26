//Socket
const {Server: HttpServer} = require('http');
const {Server: IOServer } = require('socket.io')
//Others
const express = require('express')
const { Router } = require('express')
const handlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
//PRODUCTS API
const Container = require('./productClass');
const productsFile = 'products.json';
const productsDataBase = new Container(productsFile);
//CHAT API
const chatClass = require('./chatClass');
const chatFile = 'chatData.json'
const chatDataBase = new chatClass(chatFile);


const PORT = 3000;
const app = express();

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//Parsers
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Definitions
app.set('view engine', 'ejs');
app.use(express.static("public"));


/* GET api/ */
app.get('/', function(req, res){
    const products = productsDataBase.getAll();
    res.render('pages/index',{products: productsDataBase.getAll(), chats: chatDataBase.getAll()});
});

/* POST api/products */
app.post('/', jsonParser, function(req, res){
    const object = req.body;
    console.log(object);
    const idAssigned = productsDataBase.objectId;
    const products = productsDataBase.save(object);
    res.render('pages/index',{products: productsDataBase.getAll()})
});

let messages = chatDataBase.getAll();
let products = productsDataBase.getAll();

io.on('connection', (socket) =>{
    console.log('connected');

    socket.emit('messages', messages);
    socket.emit('products', products);

    socket.on('new-message', data => {
        console.log(data);
        chatDataBase.save(data);
        messages = chatDataBase.getAll();
        io.sockets.emit('messages',messages);
    });

    socket.on('new-product',product => {
        productsDataBase.save(product);
        products = productsDataBase.getAll();
        io.sockets.emit('products',products);
    });
});

httpServer.listen(PORT, () => {
    console.log('SERVER ON en http://localhost:3000');
});
