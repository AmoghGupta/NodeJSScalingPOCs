const mongoose= require('mongoose');
//get schema class 
const Schema =  mongoose.Schema;

// create a user schema
// schema is nothing but the structure of the documents in the collection i.e the structure of blog collection in this case
const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
}, {timestamps: true});

// create a model
// model is the thing that surrounds the schema and provides the interface to communicate with the database collection

// The first argument is the singular name of the collection your model is for. 
// Mongoose automatically looks for the plural, lowercased version of your model name. 
const User = mongoose.model('User',userSchema);

//export it so that we can use it anywhere
module.exports = User;
