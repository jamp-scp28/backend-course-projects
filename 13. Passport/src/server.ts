import express from "express";
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

import bcrypt from "bcrypt";
import passport from "passport"
import passportlocal from "passport-local";
import localstrategy from "passport-strategy";

import { usersDaoMongo } from "./daos/users/userDaoMongo";
import { mongo } from "mongoose";
import validatePass from "./utils/validatePass";
import encryptPass from "./utils/encryptPass";
import { UserInterface } from "./interfaces/userI";

declare global {
    namespace Express {
      interface User {
        username: string;
        _id?: number;
      }
    }
}

const PORT = 3000;
const LocalStrategy = passportlocal.Strategy;

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

    const models: any = await mongoConn();

    const productDB = new productDaoMongo(await mongoConn());
    const messageDB = new messageDaoMongo(await mongoConn());
    const usersDB = new usersDaoMongo(await mongoConn());

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
    }));

    // Set up login and register for passport

      

    passport.use('login', new LocalStrategy(
        (username: string, password: string, callback: Function) => {
            models!.models.users.findOne({ username: username }, (err: any, user: any) => {
                if (err) {
                    return callback(err)
                }
    
                if (!user) {
                    console.log('User not found...');
                    return callback(null, false)
                }
    
                if(!validatePass(user, password)) {
                    console.log('Wrong password...');
                    return callback(null, false)
                }
    
                return callback(null, user)
            })
        }
    ))

    passport.use('signup', new LocalStrategy(
        {passReqToCallback: true}, (req, username, password, callback) => {
            models!.models.users.findOne({ username: username }, (err: any, user: any) => {
                if (err) {
                    console.log('Hay un error al registrarse');
                    return callback(err)
                }
    
                if (user) {
                    console.log('El usuario ya existe');
                    return callback(null, false)
                }
    
                console.log(req.body);
    
                const newUser = {
                    email: req.body.email,
                    username: req.body.username,
                    password: encryptPass(req.body.password)
                }
    
                console.log(newUser);
    
                models!.models.users.create(newUser, (err: any, userWithId: any) => {
                    if (err) {
                        console.log('There is a problem creating the new user...');
                        return callback(err)
                    }
    
                    console.log(userWithId);
                    console.log('User created sucessfully...');
    
                    return callback(null, userWithId)
                })
            })
        }
    ))

    passport.serializeUser((user, callback) => {
        callback(null, user!._id);
    })
    
    passport.deserializeUser((_id, callback) => {
        models!.models.users.findById(_id, callback)
    })
    //

    router.use(passport.session());

    router.get('/', (req:any, res:any)=>{
        res.send(req.session)
    })

    router.post('/login', passport.authenticate('login', { failureRedirect: '/login' }), jsonParser, (req: any, res: any) =>{
        
        if (req.isAuthenticated()) {
            res.redirect('/profile')
        } else {
            res.send('there was an error...')
        }
    })

    router.post('/signup', passport.authenticate('signup', {failureRedirect: '/login'}), jsonParser, (req: any, res: any) =>{
        if (req.isAuthenticated()) {
            res.redirect("/profile")
        } else {
            res.res("there was an error...")        }
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