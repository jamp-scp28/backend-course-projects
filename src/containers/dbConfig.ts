import {Schema, model, connect} from "mongoose";
import {productSchema} from "./models/product";
import { messageSchema } from "./models/messages";
import { userSchema } from "./models/users";

export async function mongoConn(){
    //connect to DB
    try {
        const URL = process.env.MONGO_URL_SESSION!;
        let rta = await connect(URL);
        
        rta.model("products",productSchema);
        rta.model("messages",messageSchema);
        rta.model("users",userSchema);

        console.log("Database connected.");
        return rta;
        
    } catch(err){
        console.log(err);
        return err;
    }
}
