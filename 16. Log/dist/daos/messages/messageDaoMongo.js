"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageDaoMongo = void 0;
const mongoCRUD_1 = require("../../containers/mongoCRUD");
class messageDaoMongo extends mongoCRUD_1.mongoCRUD {
    constructor(conn) {
        super(conn.models.messages);
    }
}
exports.messageDaoMongo = messageDaoMongo;
