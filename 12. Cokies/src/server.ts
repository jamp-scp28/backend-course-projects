import express, { json } from "express";
import { Router } from "express";
import { faker } from '@faker-js/faker';

import {normalize, denormalize, schema} from "normalizr";
import { productSchema } from "./containers/models/product";
import { messageSchema } from "./containers/models/messages";
import { mongoConn } from "./containers/dbConfig";
import * as bodyParser from 'body-parser';
import bParser from "body-parser";
import { productDaoMongo } from "./daos/products/productDaoMongo";
import { messageDaoMongo } from "./daos/messages/messageDaoMongo";
import util from 'util';
import session from "express-session";
import mongoStore from "connect-mongo";
const PORT = 3000;

const app = express();
const router = Router();
//Interface definition
const jsonParser = bParser();

interface Product{
    name?: string,
    price?: number,
    photo?: string
}

const create_products = (qnt: number) => {
    
    let products: Array<Product> = [];

    for (let i: number = 0; i < qnt;i++){
            let obj:Product = {
                name: faker.commerce.product(),
            price: parseInt(faker.commerce.price()),
            photo: faker.image.business()
        }
        products.push(obj);        
    }
    return products
}

const normalize_data = (data: any) => {
    
    const author_schema = new schema.Entity('authors',{},{idAttribute:'email'});
    
    const messages_schema = new schema.Entity('messages',{
        author: author_schema
    });
 
    const normalize_messages = normalize(data,[messages_schema]);
 
    return normalize_messages;
}

//Server Endpoints
async function main(){

    const productDB = new productDaoMongo(await mongoConn())
    const messageDB = new messageDaoMongo(await mongoConn())
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        next();
    });
    
    app.use(express.static("public"));

    app.use("/api",router)
    router.use(bodyParser.json())
    router.use(express.urlencoded({extended:true}));
    router.use(session({
        store: mongoStore.create({mongoUrl: 'mongodb://localhost/sessions'}),
        secret: 'EcommerceSite',
        resave: true,
        saveUninitialized: false,
        cookie: {
            path: '/',
            httpOnly: false,
            maxAge: 60000 * 10
        }
    }))

    router.get('/', (req:any, res:any)=>{
        res.send(req.session)
    })

    router.get('/login',(req:any, res:any)=>{
        res.send('Please send a post request with your credentials...')
    })

    router.post('/login',jsonParser, (req: any, res: any) =>{
        
        const {username, password} = req.query

        console.log(username, password);
        
        if (username === "jorge" && password === '123'){
            req!.session!.user = username
            req!.session!.logged = true
        } else {
            return res.send("Wrong credentials...")
        }
        
        return res.send(`welcome ${req.session.user}`)
    })

    function checkLogged(req:any, res:any, next:any){
        if(req.session.logged === true){
            next()
        } else{
            return res.redirect('/api/login')
        }
    }    

    router.get('/welcome',checkLogged,(req: any, res: any)=>{
        if(req.session!){
            req.session.expires += 5*60000
        }
        res.send('Welcome: '+req.session.user)
    })

    router.get('/logout', (req, res) => {
        req.session.destroy( error => {
            if (error) {
                res.send({status: 'Logout Error', body: error})
            }
        })
    
        res.send('User logged out')
    })

    //Messages

    router.get("/products-test", (req, res)=>{
        let products: Array<Product> = create_products(5);    
        res.send(JSON.stringify(products));
    })
    
    router.get("/messages",(req, res)=> {
        messageDB.getData(function(result:any){

            let data = normalize_data(result);

            res.json(data);
        })
    })

    router.post("/messages", jsonParser, async function(req:any, res:any){
        let data = req.body;
        console.log(req.body);
        data.timestamp = new Date();
        await messageDB.insertRecord(data);
        res.send("Ok...")
    })

    app.listen(PORT,()=>{console.log("App up and running.");
    })
}

main();