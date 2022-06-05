import admin from "firebase-admin";
import mongoose from "mongoose";
import productSchema from "./models/product.js";
import carsSchema from "./models/cars.js";

import serviceAccount from "./secret/backendcourse-9bfcf-firebase-adminsdk-qmnkb-3e839f2ebd.json" assert {type: "json"};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log('Connected to database...');

async function firebaseConnect(){
    const db = admin.firestore();
    const query = db.collection("ecommerce");
}


async function mongoConnect(){
    //connect to DB
    try {
        const URL = "mongodb://localhost:27017/ecommerce";
        let rta = await mongoose.connect(URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        
        rta.model("products",productSchema);
        rta.model("cars",carsSchema);

        console.log("Database connected.");
        return rta;
        
    } catch(err){
        console.log(err);
        return err;
    }
}

export default {mongoConnect, firebaseConnect}