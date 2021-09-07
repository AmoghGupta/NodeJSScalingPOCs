const mongoose = require('mongoose');

require('dotenv').config();

/**
 * -------------- DATABASE ----------------
 */

/**
 * Connect to MongoDB Server using the connection string in the `.env` file.  To implement this, place the following
 * string into the `.env` file
 * 
 * DB_STRING=mongodb://<user>:<password>@localhost:27017/database_name
 * DB_STRING_PROD=<your production database string>
 */ 
const devConnection = `mongodb+srv://${process.env.username}:${process.env.password}@nodejsmongo.ffvjq.mongodb.net/${process.env.database}?retryWrites=true&w=majority`;
const prodConnection = `mongodb+srv://${process.env.username}:${process.env.password}@nodejsmongo.ffvjq.mongodb.net/${process.env.database}?retryWrites=true&w=majority`;

// Connect to the correct environment database
if (process.env.NODE_ENV === 'production') {
    mongoose.connect(prodConnection, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    mongoose.connection.on('connected', () => {
        console.log('Database connected');
    });
} else {
    mongoose.connect(devConnection, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    mongoose.connection.on('connected', () => {
        console.log('Database connected');
    });
}

