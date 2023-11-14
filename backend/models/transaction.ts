import { Schema, model } from 'mongoose';

const schema = new Schema({
    _id : {type:String},
    category: {type:String, required:true},
    wallet: {type:String, required:true},
    type: {type:String, required:true},
    money: {type: Number, required:true},
    description: {type: String},
    user: {type:String, required:true},
});

interface TransactionType {
    _id : string,
    category: string,
    wallet: string,
    type: string,
    money: number,
    description?: string,
    user: string,
}

const Transaction = model('Transaction', schema);

export default Transaction;
export type { TransactionType };