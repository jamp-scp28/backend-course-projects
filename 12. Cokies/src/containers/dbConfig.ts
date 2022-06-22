import {Schema, model, connect} from "mongoose";
import {productSchema} from "./models/product";
import { messageSchema } from "./models/messages";

export async function mongoConn(){
    //connect to DB
    try {
        const URL = "mongodb://localhost:27017/ecommerce";
        let rta = await connect(URL);
        
        rta.model("products",productSchema);
        rta.model("messages",messageSchema);

        console.log("Database connected.");
        return rta;
        
    } catch(err){
        console.log(err);
        return err;
    }
}
