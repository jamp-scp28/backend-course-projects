import mongoose, { mongo } from "mongoose";

export const userSchema = new mongoose.Schema({
    created: {type: Date},
    username: {type: String},
    email: {type: String},
    password: {type: String}
});