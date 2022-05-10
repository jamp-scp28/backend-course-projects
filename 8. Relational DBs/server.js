//Socket
const {Server: HttpServer} = require('http');
const {Server: IOServer } = require('socket.io')
//Others
const express = require('express')
const { Router } = require('express')
const handlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const { knexMysql } = require('./db/options/mariaDB');
const { knexSqLite } = require('./db/options/sqlite');
//PRODUCTS API
const dataBase = require('./db/crud');
const { brotliDecompress } = require('zlib');
const db = new dataBase();


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


let products = []
let messages = []

const getProducts = (data) => {
    products = data;
}

const getMessages = (data) => {
    messages = data;
}

db.getChats(knexMysql,getMessages);
db.getProducts(knexMysql,getProducts);

/* GET api/ */
app.get('/', function(req, res){
    res.render('pages/index',{products: products, chats: messages});
});


io.on('connection', (socket) =>{
    console.log('connected',products,messages);

    socket.emit('messages', messages);
    socket.emit('products', products);

    socket.on('new-message', data => {
        db.insertChat(knexMysql,data);
        db.getMessages(knexMysql,getMessages);
        io.sockets.emit('messages',messages);
    });

    socket.on('new-product',product => {
        db.insertProduct(knexMysql,product);
        db.getProducts(knexMysql,getProducts);
        io.sockets.emit('products',products);
    });
});

httpServer.listen(PORT, () => {
    console.log('SERVER ON en http://localhost:3000');
});
