"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.productSchema = new mongoose_1.default.Schema({
    timestamp: { type: Date, required: true },
    name: { type: String, required: true, max: 200 },
    description: { type: String, required: true, max: 500 },
    code: { type: String, required: true, max: 100 },
    stock: { type: Number, required: true, max: 10000 },
    price: { type: Number, required: true, max: 10000 },
    photo: { type: String, required: true, max: 10000 },
});
