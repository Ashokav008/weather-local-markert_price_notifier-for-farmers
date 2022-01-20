const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    mono: {
        type: String
    },
    address: {
        type: String
    },
    pincode: {
        type: Number
    },
    commodity: {
        type: String
    },
    weather: {
        type: String
    }

});

mongoose.model('User', userSchema); // (name of schema, schema Object)