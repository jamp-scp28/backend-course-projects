import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
    timestamp: {type: Date, required: true},
    name: {type: String, required: true, max: 200},
    description: {type: String, required: true, max: 500},
    code: {type: String, required: true, max: 100},
    stock: {type: Number, required: true, max: 10000},
    price: {type: Number, required: true, max: 10000},
    photo: {type: String, required: true, max: 10000},
})