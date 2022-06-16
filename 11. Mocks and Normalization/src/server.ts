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

interface Author{
    _id?:string,
    email?: string,
    first_name?: string,
    last_name?: string,
    age?: number,
    alias?: string,
    avatar?: string
}

interface Message{
    _id?: string,
    timestamp?: Date,
    author?: Author,
    text?: string
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

    app.use("/api",router)
    app.use(bodyParser.json())
    
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