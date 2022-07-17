"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productDaoMongo = void 0;
const mongoCRUD_1 = require("../../containers/mongoCRUD");
class productDaoMongo extends mongoCRUD_1.mongoCRUD {
    constructor(conn) {
        console.log(conn);
        super(conn.models.products);
    }
}
exports.productDaoMongo = productDaoMongo;
