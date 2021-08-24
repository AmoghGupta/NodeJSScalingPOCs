const mongoose= require('mongoose');
//get schema class 
const Schema =  mongoose.Schema;

// create a blog schema
// schema is nothing but the structure of the documents in the collection i.e the structure of blog collection in this case
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true});

// create a model
// model is the thing that surrounds the schema and provides the interface to communicate with the database collection

// The first argument is the singular name of the collection your model is for. 
// Mongoose automatically looks for the plural, lowercased version of your model name. 
// Thus, for the example above, the model Blog is for the blogs collection in the database.
const Blog = mongoose.model('Blog',blogSchema);

//export it so that we can use it anywhere
module.exports = Blog;
