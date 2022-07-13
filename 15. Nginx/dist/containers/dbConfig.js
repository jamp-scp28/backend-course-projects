"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoConn = void 0;
const mongoose_1 = require("mongoose");
const product_1 = require("./models/product");
const messages_1 = require("./models/messages");
const users_1 = require("./models/users");
async function mongoConn() {
    //connect to DB
    try {
        const URL = process.env.MONGO_URL_SESSION;
        let rta = await (0, mongoose_1.connect)(URL);
        rta.model("products", product_1.productSchema);
        rta.model("messages", messages_1.messageSchema);
        rta.model("users", users_1.userSchema);
        console.log("Database connected.");
        return rta;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}
exports.mongoConn = mongoConn;
