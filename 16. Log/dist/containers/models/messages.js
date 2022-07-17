"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const authorSchema = new mongoose_1.default.Schema({
    email: { type: String },
    first_name: { type: String },
    last_name: { type: String },
    age: { type: Number },
    alias: { type: String },
    avatar: { type: String }
});
exports.messageSchema = new mongoose_1.default.Schema({
    timestamp: { type: Date },
    author: authorSchema,
    text: { type: String }
});
