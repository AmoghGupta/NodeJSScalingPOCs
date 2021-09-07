const mongoose= require('mongoose');
//get schema class 
const Schema =  mongoose.Schema;

// create a blog schema
// schema is nothing but the structure of the documents in the collection i.e the structure of blog collection in this case
const chatSchema = new Schema({
    body: {
        type: String,
        required: true
    }
}, {timestamps: true});


const Chat = mongoose.model('Chat',chatSchema);

//export it so that we can use it anywhere
module.exports = Chat;
