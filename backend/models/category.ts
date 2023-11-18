import e from 'express';
import { Schema, model } from 'mongoose';

const schema = new Schema({
    _id : {type:String},
    name: {type:String, required:true, unique:true},
    tags: {type: [String]},
    color: {type:String},
    user: {type:String, required:true},
});

interface CategoryType {
    _id : string,
    name: string,
    tags: string[],
    color?: string,
    user: string,
}

const Category = model('Category', schema);

export default Category;
export type {CategoryType};