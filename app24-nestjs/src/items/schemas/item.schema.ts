import * as mongoose from 'mongoose';

//get schema class 
const Schema =  mongoose.Schema;

// create a blog schema
// schema is nothing but the structure of the documents in the collection i.e the structure of blog collection in this case
export const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {timestamps: true});

