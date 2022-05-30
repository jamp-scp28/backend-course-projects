import mongoose, { mongo } from "mongoose";

const productsCollection = "products";

const productSchema = new mongoose.Schema({
    timestamp: {type: Date, required: true, max: 100},
    id: {type: String, required: true, max: 100},
    name: {type: String, required: true, max: 200},
    description: {type: String, required: true, max: 500},
    code: {type: String, required: true, max: 100},
    stock: {type: Number, required: true, max: 100},
    price: {type: Number, required: true, max: 100},
    photo: {type: String, required: true, max: 1000},
})

export const products = mongoose.model(productsCollection,productSchema);

