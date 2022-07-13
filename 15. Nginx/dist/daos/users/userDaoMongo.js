"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersDaoMongo = void 0;
const mongoCRUD_1 = require("../../containers/mongoCRUD");
class usersDaoMongo extends mongoCRUD_1.mongoCRUD {
    constructor(conn) {
        super(conn.models.users);
    }
}
exports.usersDaoMongo = usersDaoMongo;
