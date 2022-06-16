import admin from "firebase-admin";
import {Schema, model, connect} from "mongoose";
import {productSchema} from "./models/product";
import {carsSchema} from "./models/cars";

import serviceAccount from "./secret/backendcourse-9bfcf-firebase-adminsdk-qmnkb-3e839f2ebd.json";

//admin.initializeApp({
 // credential: admin.credential.cert(serviceAccount.toString())
//});

//console.log('Connected to database...');

//export async function firebaseConnect(){
//    const db = admin.firestore();
//    const query = db.collection("ecommerce");
//}


export async function mongoConn(){
    //connect to DB
    try {
        const URL = "mongodb://localhost:27017/ecommerce";
        let rta = await connect(URL);
        
        rta.model("products",productSchema);
        rta.model("cars",carsSchema);

        console.log("Database connected.");
        return rta;
        
    } catch(err){
        console.log(err);
        return err;
    }
}
