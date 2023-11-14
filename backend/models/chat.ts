import { Schema, model } from 'mongoose';

const schema = new Schema({
    _id : {type:String},
    user: {type:String, required:true},
    categories: {type: [String], required:true},
    date: {type: Date, required:true},
    messages: {type: [String], required:true},
});

interface ChatType {
    _id : string,
    user: string,
    categories: string[],
    date: Date,
    messages: string[],
}

const Chat = model('Chat', schema);

export default Chat;

export { ChatType };