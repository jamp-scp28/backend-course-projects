import express from "express";
import {Router} from "express";
import bodyParser from "body-parser";
import {productDaoMongo} from "./daos/products/productDaoMongo";
import {carDaoMongo} from "./daos/cars/carsDaoMongo";
import {mongoConn} from "./containers/dbConfig";

//config
const router = Router();
const PORT = 5000;
const app = express();

//parsers
const jsonParser = bodyParser();

//Database SetUp


async function main(){

    const productDB = new productDaoMongo(await mongoConn());
    const carDB = new carDaoMongo(await mongoConn());
    
    //API
    app.use((req, res, next)=> {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        //res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });
    
    //app.use(express.static("public"));
    
    app.use("/api", router);
    
    //GET Products and Carts
    
    router.get("/products", async function(req,res){
        productDB.getData(function(result:any){
           res.json(result);
        });
    })
    
    router.get("/cars", async function(req,res){
        await carDB.getData(function(result:any){
            res.json(result);
        })
    })
    
    //POST Product and Carts
    
    router.post("/products",jsonParser, async function(req,res){
        let data = req.body;
        data.timestamp = new Date();
        await productDB.insertRecord(data);
        res.send("Ok...");
    });
    
    router.post("/cars", jsonParser, async function(req, res){
        let data = req.body;
        data.timestamp = new Date();
        await carDB.insertRecord(data);
        res.send("Ok...");
    })
    
    //UPDATE Products and cars
    router.put("/products/:id",jsonParser,async function(req,res){
        let id = parseInt(req.params.id);
        await productDB.updateRecord(id,req.body);
        res.send("ok...");
    })
    
    router.put("/cars/:id",jsonParser,async function(req,res){
        let id = parseInt(req.params.id);
        await carDB.updateRecord(id,req.body);
        res.send("ok...");
    })
    
    //DELETE Products and Cars
    
    router.delete("/products/:id",async function(req, res){
        let id = parseInt(req.params.id);
        await productDB.deleteRecord(id);
        res.send("ok...");
    })
    
    router.delete("/cars/:id",async function(req,res){
        let id = parseInt(req.params.id);
        await carDB.deleteRecord(id);
        res.send("ok...");
    })
    
    app.listen(PORT,()=>{console.log(`app up and running on port: ${PORT}`);
    })
}


main();