import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({

    email:String,
    id:Number,
    name:String,
    quantity:Number,
    image:String,
    cost:Number

})

export const Products = mongoose.model('products',ProductSchema)