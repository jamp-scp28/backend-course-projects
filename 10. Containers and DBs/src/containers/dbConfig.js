var admin = require("firebase-admin");
import mongoose from "mongoose";

var serviceAccount = require("./secret/backendcourse-9bfcf-firebase-adminsdk-qmnkb-3e839f2ebd.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log('Connected to database...');

firebaseConnect();

async function firebaseConnect(){
    const db = admin.firestore();
    const query = db.collection("ecommerce");
}

mongoConnect();

async function mongoConnect(){
    //connect to DB
    try {
        const URL = "mongodb://localhost:27017/ecommerce";
        let rta = await mongoose.connect(URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Database connected.");
    } catch(err){
        console.log(err);
    }
}