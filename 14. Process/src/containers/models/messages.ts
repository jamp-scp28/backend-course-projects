import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    email: {type: String},
    first_name: {type: String},
    last_name: {type: String},
    age: {type: Number},
    alias: {type: String},
    avatar: {type: String}
})

export const messageSchema = new mongoose.Schema({
    timestamp: {type: Date},
    author: authorSchema,
    text: {type: String}
})