import mongoose, { mongo } from "mongoose";

const carsColletion = "cars";

const carsSchema = new mongoose.Schema({
    timestamp: {type: Date,required: true, max: 100},
    id: {type: String,required: true, max: 100},
    product: {type: String,required: true, max: 10000},
});

export const cars = mongoose.model(carsColletion, carsSchema);